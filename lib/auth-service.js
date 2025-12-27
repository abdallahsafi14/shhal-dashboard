import api from './axios';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/admin/login', credentials);
    return response.data;
  },
  register: async (data) => {
    const response = await api.post('/admin/register', data);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/admin/profile');
    return response.data;
  },
  logout: async () => {
    // Usually a local operation, but could be an API call
    localStorage.removeItem('shhal_admin_token');
    window.location.href = '/login';
  }
};
