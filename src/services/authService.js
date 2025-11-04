import api from './api';

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', {
      name: userData.fullName,
      email: userData.email,
      role: 'CUSTOMER',
      contactNumber: userData.contactNumber || '',
      location: userData.location || '',
      passwordHash: userData.password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', {
      email: credentials.email,
      password: credentials.password,
    });
    
    // Store JWT token, user data, and role
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      
      // Store user with role
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userRole', response.data.user.role);
      }
      
      // Store dashboard data if available
      if (response.data.dashboardData) {
        localStorage.setItem('dashboardData', JSON.stringify(response.data.dashboardData));
      }
      
      localStorage.setItem('loginTime', new Date().getTime().toString());
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getStoredToken = () => {
  try {
    return localStorage.getItem('authToken');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const getStoredUser = () => {
  try {
    const user = localStorage.getItem('user');
    if (!user) return null;
    return JSON.parse(user);
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const getUserRole = () => {
  try {
    return localStorage.getItem('userRole');
  } catch (error) {
    console.error('Error getting role:', error);
    return null;
  }
};

export const getDashboardData = () => {
  try {
    const data = localStorage.getItem('dashboardData');
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    return null;
  }
};

export const isUserLoggedIn = () => {
  try {
    const token = localStorage.getItem('authToken');
    return !!token;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

export const logoutUser = () => {
  try {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('dashboardData');
    localStorage.removeItem('loginTime');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data || response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};