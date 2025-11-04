import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wifi, Ticket, Clock, CheckCircle, Plus, LogOut, User, Menu, X } from 'lucide-react';
import { logoutUser, getStoredUser, getDashboardData } from '../services/authService';
import CreateTicketModal from '../components/CreateTicketModal';
import StatCard from '../components/StatCard';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('User');
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [stats, setStats] = useState({
    activeTickets: 0,
    resolvedTickets: 0,
    avgResolutionTime: '0 hrs',
    totalTickets: 0,
  });

  useEffect(() => {
    // Get user and dashboard data from localStorage
    const user = getStoredUser();
    const dashboardData = getDashboardData();

    if (user) {
      const displayName = user.name || user.email || 'User';
      setUserName(displayName);
    }

    if (dashboardData) {
      setStats({
        activeTickets: dashboardData.activeTickets || 0,
        resolvedTickets: dashboardData.resolvedTickets || 0,
        avgResolutionTime: dashboardData.avgResolutionTime || '0 hrs',
        totalTickets: dashboardData.totalTickets || 0,
      });
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/', { replace: true });
  };

  const handleTicketCreated = () => {
    console.log('Ticket created successfully');
    // You can refresh data here later if needed
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-800 border-r border-gray-700 transition-all duration-300 fixed h-screen left-0 top-0 z-40`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-400/50">
                <Wifi className="w-5 h-5" />
              </div>
              <span className="font-bold">Support</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 transition hover:bg-cyan-500/20">
            <Ticket className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          <button
            onClick={() => setIsCreateTicketOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700/50 transition"
          >
            <Plus className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>New Ticket</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700/50 transition">
            <Clock className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>My Tickets</span>}
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700/50 transition">
            <User className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Profile</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 transition-all duration-300`}>
        {/* Top Bar */}
        <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Welcome back, {userName}!</h1>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Active Tickets" value={stats.activeTickets} icon={Ticket} color="cyan" />
            <StatCard title="Resolved Tickets" value={stats.resolvedTickets} icon={CheckCircle} color="green" />
            <StatCard title="Total Tickets" value={stats.totalTickets} icon={Ticket} color="purple" />
            <StatCard
              title="Avg Resolution Time"
              value={stats.avgResolutionTime}
              icon={Clock}
              color="blue"
            />
          </div>

          {/* Recent Tickets */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Recent Tickets</h2>
                <p className="text-gray-400 text-sm">Track and manage your support tickets</p>
              </div>
              <button
                onClick={() => setIsCreateTicketOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-gray-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                New Ticket
              </button>
            </div>

            {/* Empty State */}
            <div className="text-center py-12">
              <Ticket className="w-16 h-16 mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 mb-4">
                No tickets yet. Create your first ticket to get started.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isCreateTicketOpen}
        onClose={() => setIsCreateTicketOpen(false)}
        onSuccess={handleTicketCreated}
      />
    </div>
  );
}
