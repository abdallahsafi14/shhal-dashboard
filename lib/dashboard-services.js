import api from "./axios";

export const dashboardService = {
  // Accounts / Users
  getUsers: async (params) => {
    const response = await api.get("/admin/users", { params });
    return response.data;
  },
  createUser: async (userData) => {
    const response = await api.post("/admin/users", userData);
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
    const response = await api.get("/admin/ads", { params });
    return response.data;
  },
  createAd: async (adData) => {
    const response = await api.post("/admin/ads", adData);
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
    const response = await api.get("/categories", { params });
    return response.data;
  },
  getCategoryStats: async (params) => {
    const response = await api.get("/categories/statistics", { params });
    return response.data;
  },
  createCategory: async (categoryData) => {
    const response = await api.post("/categories", categoryData);
    return response.data;
  },
  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/admin/categories/${id}`, categoryData);
    return response.data;
  },
  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },

  // Sub-Categories
  getSubCategories: async (params) => {
    const response = await api.get("/sub-categories", { params });
    return response.data;
  },
  getSubCategoriesByCategory: async (categoryId) => {
    const response = await api.get(`/sub-categories/category/${categoryId}`);
    return response.data;
  },
  createSubCategory: async (subCategoryData) => {
    const response = await api.post("/sub-categories", subCategoryData);
    return response.data;
  },
  updateSubCategory: async (id, subCategoryData) => {
    const response = await api.put(`/sub-categories/${id}`, subCategoryData);
    return response.data;
  },
  deleteSubCategory: async (id) => {
    const response = await api.delete(`/sub-categories/${id}`);
    return response.data;
  },

  // Products
  getProducts: async (params) => {
    const response = await api.get("/products", { params });
    return response.data;
  },
  getProductStats: async (params) => {
    const response = await api.get("/products/statistics", { params });
    return response.data;
  },
  createProduct: async (productData) => {
    const response = await api.post("/products", productData);
    return response.data;
  },
  updateProduct: async (id, productData) => {
    const response = await api.put(`/admin/products/${id}`, productData);
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Orders
  getOrders: async (params) => {
    const response = await api.get("/admin/orders", { params });
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
    const response = await api.get("/admin/points", { params });
    return response.data;
  },
  updatePointsPolicy: async (policyData) => {
    const response = await api.put("/admin/points/policy", policyData);
    return response.data;
  },

  // Settings
  getSettings: async () => {
    const response = await api.get("/admin/settings");
    return response.data;
  },
  updateSettings: async (settingsData) => {
    const response = await api.put("/admin/settings", settingsData);
    return response.data;
  },

  // Dashboard Stats
  getStats: async () => {
    const response = await api.get("/admin/stats");
    return response.data;
  },

  // Admin Profile
  getAdminProfile: async () => {
    const response = await api.get("/admin/me");
    return response.data;
  },
  updateAdminProfile: async (profileData) => {
    const response = await api.put("/admin/me", profileData);
    return response.data;
  },
  logout: async () => {
    const response = await api.post("/admin/logout");
    return response.data;
  },

  // Stores
  getStores: async (params) => {
    const response = await api.get("/stores", { params });
    return response.data;
  },
  createStore: async (storeData) => {
    const response = await api.post("/stores", storeData);
    return response.data;
  },
  updateStore: async (id, storeData) => {
    const response = await api.put(`/stores/${id}`, storeData);
    return response.data;
  },
  deleteStore: async (id) => {
    const response = await api.delete(`/stores/${id}`);
    return response.data;
  },

  // Branches
  getBranches: async (params) => {
    const response = await api.get("/branches", { params });
    return response.data;
  },
  getBranchesByStore: async (storeId) => {
    const response = await api.get(`/branches/store/${storeId}`);
    return response.data;
  },
  createBranch: async (branchData) => {
    const response = await api.post("/branches", branchData);
    return response.data;
  },
  updateBranch: async (id, branchData) => {
    const response = await api.put(`/branches/${id}`, branchData);
    return response.data;
  },
  deleteBranch: async (id) => {
    const response = await api.delete(`/branches/${id}`);
    return response.data;
  },
};
