import React, { useState, useEffect } from 'react';
import { Download, Filter, X } from 'lucide-react';
import StatCard from '../components/StatCard';
import TicketsTable from '../components/TicketsTable';
import AssignEngineerModal from '../components/AssignEngineerModal';
import TicketDetailsModal from '../components/TicketDetailsModal';
import { Ticket, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { getTickets, exportTickets } from '../services/ticketService';

export default function AgentDashboard() {
  const [allTickets, setAllTickets] = useState([]);
  const [displayTickets, setDisplayTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [view, setView] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationFilter, setLocationFilter] = useState('');
  const [availableLocations, setAvailableLocations] = useState([]);
  const [stats, setStats] = useState({
    totalAssigned: 0,
    unassigned: 0,
    slaBreached: 0,
    totalTickets: 0,
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [view, locationFilter, allTickets]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const tickets = await getTickets();
      
      // Transform tickets to match the display format
      const transformedTickets = tickets.map(ticket => ({
        id: `#${ticket.ticketId}`,
        ticketId: ticket.ticketId,
        customerName: ticket.createdBy?.name || 'N/A',
        customerEmail: ticket.createdBy?.email || 'N/A',
        issueCategory: ticket.issueCategory?.categoryName || 'N/A',
        issueCategoryId: ticket.issueCategory?.categoryId,
        issueDescription: ticket.issueDescription,
        location: ticket.createdBy?.location || 'N/A',
        priority: ticket.priority,
        severity: ticket.severity,
        slaTimer: calculateSLATimer(ticket),
        slaStatus: getSLAStatus(ticket),
        status: ticket.status,
        assignedTo: ticket.assignedTo?.userId || null,
        assignedToName: ticket.assignedTo?.name || null,
        assignedToEmail: ticket.assignedTo?.email || null,
        createdBy: ticket.createdBy?.userId,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        sla: ticket.sla,
        // Keep full objects for modal use
        createdByFull: ticket.createdBy,
        assignedToFull: ticket.assignedTo,
        issueCategoryFull: ticket.issueCategory,
      }));

      setAllTickets(transformedTickets);
      setDisplayTickets(transformedTickets);
      
      // Extract unique locations for filter
      const locations = [...new Set(transformedTickets.map(t => t.location).filter(l => l && l !== 'N/A'))];
      setAvailableLocations(locations.sort());
      
      // Calculate and set stats
      calculateStats(transformedTickets);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tickets. Please try again.');
      console.error('Error:', err);
      setLoading(false);
    }
  };

  const calculateStats = (tickets) => {
    const totalTickets = tickets.length;
    const totalAssigned = tickets.filter(t => t.assignedTo).length;
    const unassigned = totalTickets - totalAssigned;
    const slaBreached = tickets.filter(t => t.slaStatus === 'breached').length;

    setStats({
      totalTickets,
      totalAssigned,
      unassigned,
      slaBreached,
    });
  };

  const calculateSLATimer = (ticket) => {
    if (ticket.createdAt) {
      const created = new Date(ticket.createdAt);
      const now = new Date();
      const diff = now - created;
      const hoursElapsed = Math.floor(diff / (1000 * 60 * 60));
      
      // Adjust SLA hours based on priority if needed
      let slaHours = 24; // Default 24 hours
      if (ticket.priority === 'HIGH') {
        slaHours = 8;
      } else if (ticket.priority === 'MEDIUM') {
        slaHours = 16;
      }
      
      const hoursRemaining = slaHours - hoursElapsed;
      
      if (hoursRemaining > 0) {
        if (hoursRemaining < 1) {
          const minutesRemaining = Math.floor((hoursRemaining * 60));
          return `${minutesRemaining}m left`;
        }
        return `${hoursRemaining}h left`;
      } else {
        const hoursOverdue = Math.abs(hoursRemaining);
        return `${hoursOverdue}h overdue`;
      }
    }
    return 'N/A';
  };

  const getSLAStatus = (ticket) => {
    const timer = calculateSLATimer(ticket);
    if (timer.includes('overdue')) return 'breached';
    if (timer.includes('left')) {
      const value = parseInt(timer);
      if (timer.includes('m') || value <= 2) return 'warning';
      return 'normal';
    }
    return 'normal';
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const applyFilters = () => {
    let filtered = [...allTickets];

    // Apply view filter
    if (view === 'assigned') {
      filtered = filtered.filter(t => t.assignedTo);
    }

    // Apply location filter
    if (locationFilter) {
      filtered = filtered.filter(t => t.location === locationFilter);
    }

    setDisplayTickets(filtered);
  };

  const handleAssignClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsAssignModalOpen(true);
  };

  const handleDetailsClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsDetailsModalOpen(true);
  };

  const handleAssignSuccess = () => {
    // Refresh tickets after successful assignment
    fetchTickets();
    setIsAssignModalOpen(false);
  };

  const clearLocationFilter = () => {
    setLocationFilter('');
  };

  const handleExport = async (format) => {
    try {
      const blob = await exportTickets(format);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `tickets_export.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export tickets. Please try again.');
    }
  };

  const columns = [
    { key: 'id', label: 'Ticket ID' },
    { key: 'customerName', label: 'Customer Name' },
    { key: 'issueCategory', label: 'Issue Category' },
    { key: 'location', label: 'Location' },
    { key: 'slaTimer', label: 'SLA Timer' },
    { key: 'status', label: 'Status' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <div className="text-xl">Loading tickets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-400 mb-4">{error}</div>
          <button 
            onClick={fetchTickets}
            className="px-4 py-2 bg-cyan-400 text-gray-900 rounded-lg hover:bg-cyan-500"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Agent Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage and assign support tickets</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleExport('csv')} 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
          <button 
            onClick={() => handleExport('pdf')} 
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Assigned" value={stats.totalAssigned} icon={CheckCircle} color="green" />
        <StatCard title="Unassigned" value={stats.unassigned} icon={Ticket} color="cyan" />
        <StatCard title="SLA Breached" value={stats.slaBreached} icon={AlertCircle} color="red" />
        <StatCard title="Total Tickets" value={stats.totalTickets} icon={TrendingUp} color="purple" />
      </div>

      {/* Tabs and Filters */}
      <div className="flex flex-wrap gap-4 mb-8 items-center">
        <div className="flex gap-4">
          <button
            onClick={() => handleViewChange('all')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              view === 'all' ? 'bg-cyan-400 text-gray-900' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All Tickets ({allTickets.length})
          </button>
          <button
            onClick={() => handleViewChange('assigned')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              view === 'assigned' ? 'bg-cyan-400 text-gray-900' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Assigned Tasks ({stats.totalAssigned})
          </button>
        </div>

        {/* Location Filter */}
        <div className="flex items-center gap-2 ml-auto">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-cyan-400"
          >
            <option value="">All Locations</option>
            {availableLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          {locationFilter && (
            <button
              onClick={clearLocationFilter}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              title="Clear filter"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <TicketsTable
        tickets={displayTickets}
        columns={columns}
        actions={[
          {
            label: (ticket) => ticket.assignedTo ? 'Details' : 'Assign',
            onClick: (ticket) => ticket.assignedTo ? handleDetailsClick(ticket) : handleAssignClick(ticket),
            className: (ticket) => ticket.assignedTo 
              ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }
        ]}
      />

      {/* Assign Modal */}
      <AssignEngineerModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        ticket={selectedTicket}
        onSuccess={handleAssignSuccess}
      />

      {/* Details Modal */}
      <TicketDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        ticket={selectedTicket}
      />
    </div>
  );
}