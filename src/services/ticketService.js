import api from './api';

export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const createTicket = async (ticketData) => {
  try {
    const response = await api.post('/tickets', ticketData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const getTickets = async () => {
  try {
    const response = await api.get('/tickets');
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const getTicketById = async (ticketId) => {
  try {
    const response = await api.get(`/tickets/${ticketId}`);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const updateTicket = async (ticketId, updateData) => {
  try {
    const response = await api.put(`/tickets/${ticketId}`, updateData);
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const assignTicket = async (ticketId, engineerId) => {
  try {
    const response = await api.post(`/tickets/${ticketId}/assign`, {
      engineerId: engineerId,
    });
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const fetchEngineers = async () => {
  try {
    const response = await api.get('/engineers');
    return response.data || response;
  } catch (error) {
    throw error;
  }
};

export const exportTickets = async (format, filters = {}) => {
  try {
    const response = await api.post('/tickets/export', {
      format: format,
      filters: filters,
    }, {
      responseType: 'blob',
    });
    return response.data || response;
  } catch (error) {
    throw error;
  }
};