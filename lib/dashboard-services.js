import api from './axios';

export const dashboardService = {
  // Accounts / Users
  getUsers: async (params) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },
  createUser: async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },
  updateUser: async (id, userData) => {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  // Ads
  getAds: async (params) => {
    const response = await api.get('/admin/ads', { params });
    return response.data;
  },
  createAd: async (adData) => {
    const response = await api.post('/admin/ads', adData);
    return response.data;
  },
  updateAd: async (id, adData) => {
    const response = await api.put(`/admin/ads/${id}`, adData);
    return response.data;
  },
  deleteAd: async (id) => {
    const response = await api.delete(`/admin/ads/${id}`);
    return response.data;
  },

  // Categories
  getCategories: async (params) => {
    const response = await api.get('/admin/categories', { params });
    return response.data;
  },
  createCategory: async (categoryData) => {
    const response = await api.post('/admin/categories', categoryData);
    return response.data;
  },
  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/admin/categories/${id}`, categoryData);
    return response.data;
  },
  deleteCategory: async (id) => {
    const response = await api.delete(`/admin/categories/${id}`);
    return response.data;
  },

  // Orders
  getOrders: async (params) => {
    const response = await api.get('/admin/orders', { params });
    return response.data;
  },
  getOrderById: async (id) => {
    const response = await api.get(`/admin/orders/${id}`);
    return response.data;
  },
  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/admin/orders/${id}/status`, { status });
    return response.data;
  },

  // Points
  getPoints: async (params) => {
    const response = await api.get('/admin/points', { params });
    return response.data;
  },
  updatePointsPolicy: async (policyData) => {
    const response = await api.put('/admin/points/policy', policyData);
    return response.data;
  },

  // Settings
  getSettings: async () => {
    const response = await api.get('/admin/settings');
    return response.data;
  },
  updateSettings: async (settingsData) => {
    const response = await api.put('/admin/settings', settingsData);
    return response.data;
  },

  // Dashboard Stats
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  }
};
