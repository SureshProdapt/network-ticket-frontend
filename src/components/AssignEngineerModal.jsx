import React, { useState, useEffect } from 'react';
import { X, Loader } from 'lucide-react';
import { fetchEngineers, assignTicket } from '../services/ticketService';

export default function AssignEngineerModal({ isOpen, onClose, ticket, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [engineersLoading, setEngineersLoading] = useState(true);
  const [engineers, setEngineers] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadEngineers();
    }
  }, [isOpen]);

  const loadEngineers = async () => {
    try {
      setEngineersLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetchEngineers();
      // setEngineers(response);
      
      // Dummy data for now
      setEngineers([
        { id: 1, name: 'John Engineer', activeTickets: 3 },
        { id: 2, name: 'Sarah Engineer', activeTickets: 2 },
        { id: 3, name: 'Mike Engineer', activeTickets: 5 },
      ]);
    } catch (err) {
      setError('Failed to load engineers');
    } finally {
      setEngineersLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedEngineer) {
      setError('Please select an engineer');
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // await assignTicket(ticket.id, selectedEngineer);
      console.log(`Assigned ticket ${ticket.id} to engineer ${selectedEngineer}`);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError('Failed to assign ticket');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-8 w-full max-w-md mx-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-2">Assign Engineer</h2>
        <p className="text-gray-400 text-sm mb-6">Ticket #{ticket?.id}</p>

        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">{error}</div>}

        {engineersLoading ? (
          <div className="flex justify-center py-8">
            <Loader className="w-5 h-5 animate-spin text-cyan-400" />
          </div>
        ) : (
          <div className="space-y-4">
            <select
              value={selectedEngineer}
              onChange={(e) => setSelectedEngineer(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="">Select an engineer...</option>
              {engineers.map((eng) => (
                <option key={eng.id} value={eng.id}>
                  {eng.name} ({eng.activeTickets} active)
                </option>
              ))}
            </select>

            <div className="flex gap-4 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-400 text-gray-900 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? 'Assigning...' : 'Assign'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}