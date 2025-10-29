import api from './api';

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', {
      name: userData.fullName,
      email: userData.email,
      role: 'CUSTOMER', // Default role
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
    
    // Store JWT token if provided
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      
      // Store user data if available
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        // If no user object returned, create minimal user object
        localStorage.setItem('user', JSON.stringify({
          email: credentials.email,
          name: credentials.email.split('@')[0] // Use email prefix as name if not provided
        }));
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
    // Return null if user doesn't exist, don't try to parse undefined
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  } catch (error) {
    console.error('Error getting user:', error);
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
    localStorage.removeItem('loginTime');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${getStoredToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};