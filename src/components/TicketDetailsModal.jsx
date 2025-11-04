import React from 'react';
import { X, User, Mail, Phone, MapPin, Clock, Calendar } from 'lucide-react';

export default function TicketDetailsModal({ isOpen, onClose, ticket }) {
  if (!isOpen || !ticket) return null;

  const calculateTimeAssigned = (updatedAt) => {
    if (!updatedAt) return 'N/A';
    
    const updated = new Date(updatedAt);
    const now = new Date();
    const diff = now - updated;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      NEW: 'bg-blue-500',
      IN_PROGRESS: 'bg-yellow-500',
      ASSIGNED: 'bg-cyan-500',
      ON_HOLD: 'bg-orange-500',
      RESOLVED: 'bg-green-500',
      REOPENED: 'bg-purple-500',
      CLOSED: 'bg-gray-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Ticket Details</h2>
            <p className="text-gray-400 mt-1">{ticket.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Ticket Info */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Ticket Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-gray-400">Priority</p>
                <p className="text-white font-medium mt-1">{ticket.priority}</p>
              </div>
              <div>
                <p className="text-gray-400">Severity</p>
                <p className="text-white font-medium mt-1">{ticket.severity}</p>
              </div>
              <div>
                <p className="text-gray-400">Category</p>
                <p className="text-white font-medium mt-1">{ticket.issueCategory}</p>
              </div>
            </div>
          </div>

          {/* Issue Description */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Issue Description</h3>
            <p className="text-gray-300 text-sm">{ticket.issueDescription}</p>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Customer Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Name:</span>
                <span className="text-white font-medium">{ticket.customerName}</span>
              </div>
              {ticket.customerEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{ticket.customerEmail}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Location:</span>
                <span className="text-white">{ticket.location}</span>
              </div>
            </div>
          </div>

          {/* Assigned Engineer Info */}
          {ticket.assignedTo && (
            <div className="bg-gradient-to-r from-cyan-900 to-gray-700 rounded-lg p-4 border border-cyan-500">
              <h3 className="text-lg font-semibold text-white mb-3">Assigned Engineer</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Name:</span>
                  <span className="text-white font-semibold">{ticket.assignedToName}</span>
                </div>
                {ticket.assignedToEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">Email:</span>
                    <span className="text-white">{ticket.assignedToEmail}</span>
                  </div>
                )}
                {ticket.assignedToFull?.contactNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">Contact:</span>
                    <span className="text-white">{ticket.assignedToFull.contactNumber}</span>
                  </div>
                )}
                {ticket.assignedToFull?.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">Location:</span>
                    <span className="text-white">{ticket.assignedToFull.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 pt-2 border-t border-cyan-800">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Assigned:</span>
                  <span className="text-cyan-300 font-semibold">{calculateTimeAssigned(ticket.updatedAt)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">Timeline</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Created:</span>
                <span className="text-white">{formatDate(ticket.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Last Updated:</span>
                <span className="text-white">{formatDate(ticket.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* SLA Info */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3">SLA Status</h3>
            <div className="flex items-center gap-3">
              <Clock className={`w-5 h-5 ${
                ticket.slaStatus === 'breached' ? 'text-red-400' :
                ticket.slaStatus === 'warning' ? 'text-yellow-400' :
                'text-green-400'
              }`} />
              <span className={`text-lg font-semibold ${
                ticket.slaStatus === 'breached' ? 'text-red-400' :
                ticket.slaStatus === 'warning' ? 'text-yellow-400' :
                'text-green-400'
              }`}>
                {ticket.slaTimer}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}