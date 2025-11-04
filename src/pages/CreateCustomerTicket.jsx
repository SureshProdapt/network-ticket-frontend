import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, User, Mail, MapPin, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories, createTicket } from '../services/ticketService';
import api from '../services/api';

export default function CreateCustomerTicket() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Select Customer, 2: Create Ticket
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customersLoading, setCustomersLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    issueCategory: '',
    issueDescription: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Fetch customers on mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter customers based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = customers.filter(
        customer =>
          customer.name.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          (customer.location && customer.location.toLowerCase().includes(query))
      );
      setFilteredCustomers(filtered);
    }
  }, [searchQuery, customers]);

  // Fetch categories when step 2 is reached
  useEffect(() => {
    if (step === 2 && categories.length === 0) {
      fetchCategoriesData();
    }
  }, [step]);

  const fetchCustomers = async () => {
    try {
      setCustomersLoading(true);
      const response = await api.get('/users?role=CUSTOMER');
      const customerList = Array.isArray(response.data) ? response.data : [];
      setCustomers(customerList);
      setFilteredCustomers(customerList);
    } catch (err) {
      setError('Failed to load customers. Please try again.');
      console.error('Error fetching customers:', err);
    } finally {
      setCustomersLoading(false);
    }
  };

  const fetchCategoriesData = async () => {
    try {
      setCategoriesLoading(true);
      const response = await fetchCategories();
      const categoryList = Array.isArray(response) ? response : (response.data || []);
      setCategories(categoryList);
    } catch (err) {
      setError('Failed to load categories. Please try again.');
      console.error('Error fetching categories:', err);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setStep(2);
    setError('');
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.issueCategory) {
      errors.issueCategory = 'Please select an issue category';
    }

    if (!formData.issueDescription.trim()) {
      errors.issueDescription = 'Please describe the issue';
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
        createdBy: {
          userId: selectedCustomer.userId,
        },
      };

      await createTicket(payload);

      setSuccess('Ticket created successfully for ' + selectedCustomer.name + '!');
      
      setTimeout(() => {
        navigate('/agent/dashboard');
      }, 2000);
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

  const handleBackToCustomers = () => {
    setStep(1);
    setSelectedCustomer(null);
    setFormData({
      issueCategory: '',
      issueDescription: '',
    });
    setValidationErrors({});
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/agent/dashboard')}
          className="p-2 hover:bg-gray-800 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-4xl font-bold">Create Ticket for Customer</h1>
          <p className="text-gray-400 mt-2">
            {step === 1 ? 'Select a customer to create a ticket for' : 'Fill in ticket details'}
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <span className="text-red-400">{error}</span>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span className="text-green-400">{success}</span>
        </div>
      )}

      {/* Step 1: Select Customer */}
      {step === 1 && (
        <div className="max-w-4xl">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          </div>

          {/* Customer List */}
          {customersLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-cyan-400" />
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No customers found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCustomers.map((customer) => (
                <button
                  key={customer.userId}
                  onClick={() => handleCustomerSelect(customer)}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-left hover:border-cyan-400 hover:bg-gray-700/50 transition group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-cyan-400/10 rounded-lg group-hover:bg-cyan-400/20 transition">
                      <User className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{customer.name}</h3>
                      <div className="space-y-1 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{customer.email}</span>
                        </div>
                        {customer.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{customer.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 2: Create Ticket Form */}
      {step === 2 && selectedCustomer && (
        <div className="max-w-2xl">
          {/* Selected Customer Info */}
          <div className="bg-gradient-to-r from-cyan-900 to-gray-800 border border-cyan-500 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-400 mb-2">Creating ticket for:</p>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-400/20 rounded-lg">
                <User className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{selectedCustomer.name}</h3>
                <p className="text-sm text-gray-400">{selectedCustomer.email}</p>
              </div>
            </div>
            <button
              onClick={handleBackToCustomers}
              className="mt-3 text-sm text-cyan-400 hover:text-cyan-300 transition"
            >
              Change customer
            </button>
          </div>

          {/* Ticket Form */}
          <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
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
                  {categories.map((cat) => (
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
              <label className="block text-sm font-semibold mb-2">Describe the Issue *</label>
              <textarea
                name="issueDescription"
                value={formData.issueDescription}
                onChange={handleInputChange}
                placeholder="Describe the customer's issue in detail..."
                rows={6}
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
                onClick={handleBackToCustomers}
                disabled={loading}
                className="flex-1 px-4 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-gray-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
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
      )}
    </div>
  );
}