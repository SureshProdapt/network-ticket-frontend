import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function TicketsTable({ tickets, columns, actions, onRowClick }) {
  const getSLAColor = (slaStatus) => {
    if (slaStatus === 'breached') return 'bg-red-500/20';
    if (slaStatus === 'warning') return 'bg-yellow-500/20';
    return 'bg-green-500/20';
  };

  const getSLAIcon = (slaStatus) => {
    if (slaStatus === 'breached') return <AlertCircle className="w-4 h-4 text-red-400" />;
    if (slaStatus === 'warning') return <Clock className="w-4 h-4 text-yellow-400" />;
    return <CheckCircle className="w-4 h-4 text-green-400" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      'NEW': 'bg-red-500/20 text-red-400',
      'OPEN': 'bg-blue-500/20 text-blue-400',
      'IN_PROGRESS': 'bg-yellow-500/20 text-yellow-400',
      'ASSIGNED': 'bg-purple-500/20 text-purple-400',
      'RESOLVED': 'bg-green-500/20 text-green-400',
      'REOPENED': 'bg-orange-500/20 text-orange-400',
      'CLOSED': 'bg-gray-500/20 text-gray-400',
      'ON_HOLD': 'bg-gray-500/20 text-gray-400',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700/50 border-b border-gray-700">
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Action</th>}
            </tr>
          </thead>
          <tbody>
            {tickets?.length > 0 ? (
              tickets.map((ticket, idx) => (
                <tr
                  key={ticket.id || idx}
                  onClick={() => onRowClick?.(ticket)}
                  className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition cursor-pointer ${getSLAColor(ticket.slaStatus || 'normal')}`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-sm text-gray-300">
                      {col.key === 'slaTimer' ? (
                        <div className="flex items-center gap-2">
                          {getSLAIcon(ticket.slaStatus)}
                          <span>{ticket[col.key]}</span>
                        </div>
                      ) : col.key === 'status' ? (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket[col.key])}`}>
                          {ticket[col.key]}
                        </span>
                      ) : (
                        ticket[col.key]
                      )}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {actions.map((action, i) => {
                          // Support both static and dynamic labels
                          const label = typeof action.label === 'function' 
                            ? action.label(ticket) 
                            : action.label;
                          
                          // Support dynamic className
                          const className = typeof action.className === 'function'
                            ? action.className(ticket)
                            : action.className || 'bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30';

                          return (
                            <button
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                action.onClick(ticket);
                              }}
                              className={`px-3 py-1 rounded transition text-sm font-medium ${className}`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-8 text-center text-gray-400">
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}