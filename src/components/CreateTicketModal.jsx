import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { fetchCategories, createTicket } from '../services/ticketService';

export default function CreateTicketModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    issueCategory: '',
    issueDescription: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch categories on mount
  useEffect(() => {
    if (isOpen) {
      fetchCategoriesData();
    }
  }, [isOpen]);

  const fetchCategoriesData = async () => {
    try {
      setCategoriesLoading(true);
      const response = await fetchCategories();
      // Handle both array and object responses
      const categoryList = Array.isArray(response) ? response : (response.data || []);
      setCategories(categoryList);
      setError('');
    } catch (err) {
      setError('Failed to load categories. Please try again.');
      console.error('Error fetching categories:', err);
      setCategories([]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.issueCategory) {
      errors.issueCategory = 'Please select an issue category';
    }

    if (!formData.issueDescription.trim()) {
      errors.issueDescription = 'Please describe your issue';
    } else if (formData.issueDescription.length < 20) {
      errors.issueDescription = 'Description must be at least 20 characters';
    } else if (formData.issueDescription.length > 1000) {
      errors.issueDescription = 'Description cannot exceed 1000 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        issueDescription: formData.issueDescription,
        issueCategory: {
          categoryId: parseInt(formData.issueCategory),
        },
      };

      await createTicket(payload);

      setSuccess('Ticket created successfully!');
      setFormData({
        issueCategory: '',
        issueDescription: '',
      });

      setTimeout(() => {
        onSuccess();
        onClose();
        setSuccess('');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to create ticket. Please try again.');
      console.error('Error creating ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-gray-800 border border-gray-700 rounded-2xl p-8 w-full max-w-md mx-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Create New Ticket</h2>
          <p className="text-gray-400 text-sm">Report your network issue</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-green-400 text-sm">{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Issue Category *</label>
            {categoriesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="w-5 h-5 animate-spin text-cyan-400" />
              </div>
            ) : (
              <select
                name="issueCategory"
                value={formData.issueCategory}
                onChange={handleInputChange}
                className={`w-full bg-gray-700 border rounded-lg px-4 py-3 text-white focus:outline-none transition ${
                  validationErrors.issueCategory ? 'border-red-500/50 focus:border-red-500' : 'border-gray-600 focus:border-cyan-400'
                }`}
              >
                <option value="">Select a category...</option>
                {Array.isArray(categories) && categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            )}
            {validationErrors.issueCategory && (
              <p className="mt-2 text-sm text-red-400">{validationErrors.issueCategory}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Describe Your Issue *</label>
            <textarea
              name="issueDescription"
              value={formData.issueDescription}
              onChange={handleInputChange}
              placeholder="Please describe the issue you're facing in detail..."
              rows={5}
              maxLength={1000}
              className={`w-full bg-gray-700 border rounded-lg px-4 py-3 text-white focus:outline-none transition resize-none ${
                validationErrors.issueDescription ? 'border-red-500/50 focus:border-red-500' : 'border-gray-600 focus:border-cyan-400'
              }`}
            />
            <div className="flex justify-between items-center mt-2">
              <div>
                {validationErrors.issueDescription && (
                  <p className="text-sm text-red-400">{validationErrors.issueDescription}</p>
                )}
              </div>
              <p className="text-xs text-gray-500">{formData.issueDescription.length}/1000</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-gray-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || categoriesLoading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-400 text-gray-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Ticket'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}