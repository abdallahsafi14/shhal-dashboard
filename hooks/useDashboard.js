'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardService } from '@/lib/dashboard-services';
import { handleApiError, handleApiSuccess } from '@/lib/service-helpers';
import { USE_MOCK } from '@/lib/config';
import * as MOCK from '@/lib/mock-data';

// Helper to handle mutations in mock mode
const useMockMutation = (mutationFn, successMessage, queryKeyToInvalidate) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: USE_MOCK ? async (data) => data : mutationFn,
    onSuccess: () => {
      if (queryKeyToInvalidate) queryClient.invalidateQueries([queryKeyToInvalidate]);
      handleApiSuccess(successMessage);
    },
    onError: (error) => handleApiError(error, 'فشل تنفيذ العملية'),
  });
};

// --- Users Hooks ---
export const useUsers = (params) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => USE_MOCK ? Promise.resolve(MOCK.MOCK_USERS) : dashboardService.getUsers(params),
  });
};

export const useUserActions = () => {
  const createMutation = useMockMutation(dashboardService.createUser, 'تم إضافة المستخدم بنجاح', 'users');
  const updateMutation = useMockMutation(({ id, data }) => dashboardService.updateUser(id, data), 'تم تحديث المستخدم بنجاح', 'users');
  const deleteMutation = useMockMutation(dashboardService.deleteUser, 'تم حذف المستخدم بنجاح', 'users');

  return {
    createUser: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateUser: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteUser: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};

// --- Ads Hooks ---
export const useAds = (params) => {
  return useQuery({
    queryKey: ['ads', params],
    queryFn: () => USE_MOCK ? Promise.resolve(MOCK.MOCK_ADS) : dashboardService.getAds(params),
  });
};

export const useAdActions = () => {
  const createMutation = useMockMutation(dashboardService.createAd, 'تم إضافة الإعلان بنجاح', 'ads');
  const updateMutation = useMockMutation(({ id, data }) => dashboardService.updateAd(id, data), 'تم تحديث الإعلان بنجاح', 'ads');
  const deleteMutation = useMockMutation(dashboardService.deleteAd, 'تم حذف الإعلان بنجاح', 'ads');

  return {
    createAd: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateAd: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteAd: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};

// --- Categories Hooks ---
export const useCategories = (params) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => USE_MOCK ? Promise.resolve(MOCK.MOCK_CATEGORIES) : dashboardService.getCategories(params),
  });
};

export const useCategoryActions = () => {
  const createMutation = useMockMutation(dashboardService.createCategory, 'تم إضافة القسم بنجاح', 'categories');
  const updateMutation = useMockMutation(({ id, data }) => dashboardService.updateCategory(id, data), 'تم تحديث القسم بنجاح', 'categories');
  const deleteMutation = useMockMutation(dashboardService.deleteCategory, 'تم حذف القسم بنجاح', 'categories');

  return {
    createCategory: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateCategory: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteCategory: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};

// --- Orders Hooks ---
export const useOrders = (params) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => USE_MOCK ? Promise.resolve(MOCK.MOCK_ORDERS) : dashboardService.getOrders(params),
  });
};

export const useOrderDetails = (id) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => USE_MOCK ? Promise.resolve(MOCK.MOCK_ORDER_DETAILS) : dashboardService.getOrderById(id),
    enabled: !!id,
  });
};

export const useOrderActions = () => {
  const updateStatusMutation = useMockMutation(({ id, status }) => dashboardService.updateOrderStatus(id, status), 'تم تحديث حالة الطلب بنجاح', 'orders');
  
  return {
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
};

// --- Points Hooks ---
export const usePoints = (params) => {
  return useQuery({
    queryKey: ['points', params],
    queryFn: () => USE_MOCK ? Promise.resolve(MOCK.MOCK_POINTS) : dashboardService.getPoints(params),
  });
};

export const usePointActions = () => {
  const updatePolicyMutation = useMockMutation(dashboardService.updatePointsPolicy, 'تم تحديث سياسة النقاط بنجاح', 'points');

  return {
    updatePolicy: updatePolicyMutation.mutate,
    isUpdating: updatePolicyMutation.isPending,
  };
};

// --- Settings Hooks ---
export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: () => USE_MOCK ? Promise.resolve(MOCK.MOCK_SETTINGS) : dashboardService.getSettings(),
  });
};

export const useSettingActions = () => {
  const updateSettingsMutation = useMockMutation(dashboardService.updateSettings, 'تم تحديث الإعدادات بنجاح', 'settings');

  return {
    updateSettings: updateSettingsMutation.mutate,
    isUpdating: updateSettingsMutation.isPending,
  };
};

// --- Dashboard Stats Hooks ---
export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: () => USE_MOCK ? Promise.resolve(MOCK.MOCK_STATS) : dashboardService.getStats(),
  });
};
