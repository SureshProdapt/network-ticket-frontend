import api from './api';

export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response;
  } catch (error) {
    throw error;
  }
};

export const createTicket = async (ticketData) => {
  try {
    const response = await api.post('/tickets', ticketData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTickets = async () => {
  try {
    const response = await api.get('/tickets');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTicketById = async (ticketId) => {
  try {
    const response = await api.get(`/tickets/${ticketId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateTicket = async (ticketId, updateData) => {
  try {
    const response = await api.put(`/tickets/${ticketId}`, updateData);
    return response;
  } catch (error) {
    throw error;
  }
};