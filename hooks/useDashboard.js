"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { dashboardService } from "@/lib/dashboard-services";
import { handleApiError } from "@/lib/service-helpers";
import { USE_MOCK } from "@/lib/config";
import * as MOCK from "@/lib/mock-data";
import { toast } from "sonner";
import { deleteCookie } from "@/lib/cookie-utils";

// Helper to handle mutations in mock mode
const useMockMutation = (mutationFn, successMessage, queryKeyToInvalidate) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: USE_MOCK ? async (data) => data : mutationFn,
    onSuccess: () => {
      if (queryKeyToInvalidate) {
        const keys = Array.isArray(queryKeyToInvalidate) ? queryKeyToInvalidate : [queryKeyToInvalidate];
        keys.forEach((key) => queryClient.invalidateQueries([key]));
      }
      toast.success(successMessage);
    },
    onError: (error) => handleApiError(error, "فشل تنفيذ العملية"),
  });
};

// --- Users Hooks ---
export const useUsers = (params) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve(MOCK.MOCK_USERS)
        : dashboardService.getUsers(params),
  });
};

export const useUserById = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({ data: null })
        : dashboardService.getUserById(id),
    enabled: !!id,
  });
};

export const useUsersStatistics = () => {
  return useQuery({
    queryKey: ["usersStatistics"],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({
            data: {
              total_users: 0,
              active_users: 0,
              suspended_users: 0,
              new_users: 0,
            },
          })
        : dashboardService.getUsersStatistics(),
  });
};

export const useUserActions = () => {
  const createMutation = useMockMutation(
    dashboardService.createUser,
    "تم إضافة المستخدم بنجاح",
    ["users", "usersStatistics"]
  );
  const updateMutation = useMockMutation(
    ({ id, data }) => dashboardService.updateUser(id, data),
    "تم تحديث المستخدم بنجاح",
    ["users", "usersStatistics"]
  );
  const deleteMutation = useMockMutation(
    dashboardService.deleteUser,
    "تم حذف المستخدم بنجاح",
    ["users", "usersStatistics"]
  );

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
    queryKey: ["ads", params],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve(MOCK.MOCK_ADS)
        : dashboardService.getAds(params),
  });
};

export const useAdDetails = (id) => {
  return useQuery({
    queryKey: ["ad", id],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({ data: MOCK.MOCK_ADS.data[0] })
        : dashboardService.getAdById(id),
    enabled: !!id,
  });
};

export const useAdStats = () => {
  return useQuery({
    queryKey: ["adStats"],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({
            data: {
              total_advertisements: 50,
              active_advertisements: 5,
              suspended_advertisements: 15,
              new_advertisements: 30,
            },
          })
        : dashboardService.getAdStats(),
  });
};

export const useAdActions = () => {
  const createMutation = useMockMutation(
    dashboardService.createAd,
    "تم إضافة الإعلان بنجاح",
    "ads"
  );
  const updateMutation = useMockMutation(
    ({ id, data }) => dashboardService.updateAd(id, data),
    "تم تحديث الإعلان بنجاح",
    "ads"
  );
  const deleteMutation = useMockMutation(
    dashboardService.deleteAd,
    "تم حذف الإعلان بنجاح",
    "ads"
  );

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
    queryKey: ["categories", params],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve(MOCK.MOCK_CATEGORIES)
        : dashboardService.getCategories(params),
  });
};

export const useCategoryActions = () => {
  const createMutation = useMockMutation(
    dashboardService.createCategory,
    "تم إضافة القسم بنجاح",
    "categories"
  );
  const updateMutation = useMockMutation(
    ({ id, data }) => dashboardService.updateCategory(id, data),
    "تم تحديث القسم بنجاح",
    "categories"
  );
  const deleteMutation = useMockMutation(
    dashboardService.deleteCategory,
    "تم حذف القسم بنجاح",
    "categories"
  );

  return {
    createCategory: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateCategory: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteCategory: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};

// --- Category Stats Hook ---
export const useCategoryStats = (params) => {
  return useQuery({
    queryKey: ["categoryStats", params],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({ data: MOCK.MOCK_CATEGORY_STATS })
        : dashboardService.getCategoryStats(params),
  });
};

// --- Sub-Categories Hooks ---
export const useSubCategories = (params) => {
  return useQuery({
    queryKey: ["subCategories", params],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({ data: [] })
        : dashboardService.getSubCategories(params),
  });
};

export const useSubCategoriesByCategory = (categoryId) => {
  return useQuery({
    queryKey: ["subCategoriesByCategory", categoryId],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({ data: [] })
        : dashboardService.getSubCategoriesByCategory(categoryId),
    enabled: !!categoryId,
  });
};

export const useSubCategoryActions = () => {
  const createMutation = useMockMutation(
    dashboardService.createSubCategory,
    "تم إضافة الفئة الفرعية بنجاح",
    "subCategories"
  );
  const updateMutation = useMockMutation(
    ({ id, data }) => dashboardService.updateSubCategory(id, data),
    "تم تحديث الفئة الفرعية بنجاح",
    "subCategories"
  );
  const deleteMutation = useMockMutation(
    dashboardService.deleteSubCategory,
    "تم حذف الفئة الفرعية بنجاح",
    "subCategories"
  );

  return {
    createSubCategory: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateSubCategory: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteSubCategory: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};

// --- Product Stats Hook ---
export const useProductStats = (params) => {
  return useQuery({
    queryKey: ["productStats", params],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({ data: MOCK.MOCK_PRODUCT_STATS })
        : dashboardService.getProductStats(params),
  });
};

// --- Products Hooks ---
export const useProducts = (params) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({ data: MOCK.MOCK_PRODUCTS.data })
        : dashboardService.getProducts(params),
  });
};

export const useProductActions = () => {
  const createMutation = useMockMutation(
    dashboardService.createProduct,
    "تم إضافة المنتج بنجاح",
    "products"
  );
  const updateMutation = useMockMutation(
    ({ id, data }) => dashboardService.updateProduct(id, data),
    "تم تحديث المنتج بنجاح",
    "products"
  );
  const deleteMutation = useMockMutation(
    dashboardService.deleteProduct,
    "تم حذف المنتج بنجاح",
    "products"
  );

  return {
    createProduct: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateProduct: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteProduct: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};

// --- Orders Hooks ---
export const useOrders = (params) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve(MOCK.MOCK_ORDERS)
        : dashboardService.getOrders(params),
  });
};

export const useOrderDetails = (id) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve(MOCK.MOCK_ORDER_DETAILS)
        : dashboardService.getOrderById(id),
    enabled: !!id,
  });
};

export const useProductSubmissionsStatistics = () => {
  return useQuery({
    queryKey: ["orderStatistics"],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({
            data: {
              update_count: 0,
              create_count: 0,
              pending_count: 0,
              approved_count: 0,
            },
          })
        : dashboardService.getProductSubmissionsStatistics(),
  });
};

export const useOrderActions = () => {
  const approveMutation = useMockMutation(
    (id) => dashboardService.approveOrder(id),
    "تم قبول الطلب بنجاح",
    ["orders", "orderStatistics"]
  );
  const rejectMutation = useMockMutation(
    ({ id, reason }) => dashboardService.rejectOrder(id, reason),
    "تم رفض الطلب بنجاح",
    ["orders", "orderStatistics"]
  );

  return {
    approveOrder: approveMutation.mutate,
    isApproving: approveMutation.isPending,
    rejectOrder: rejectMutation.mutate,
    isRejecting: rejectMutation.isPending,
  };
};

// --- Points Hooks ---
export const usePoints = (params) => {
  return useQuery({
    queryKey: ["points", params],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve(MOCK.MOCK_POINTS)
        : dashboardService.getPoints(params),
  });
};

export const usePointsRedemptionSettings = () => {
  return useQuery({
    queryKey: ["pointsRedemptionSettings"],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({
            data: {
              id: 1,
              field_value: 1,
              multiplier: "X1",
              is_enabled: true,
              point_value: 0.0025,
              min_points_to_redeem: 1000,
            },
          })
        : dashboardService.getPointsRedemptionSettings(),
  });
};

export const usePointsRedemptionSettingsActions = () => {
  const updateMutation = useMockMutation(
    dashboardService.updatePointsRedemptionSettings,
    "تم تحديث إعدادات صرف النقاط بنجاح",
    "pointsRedemptionSettings"
  );

  return {
    updateSettings: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};

export const usePointActions = () => {
  const updatePolicyMutation = useMockMutation(
    dashboardService.updatePointsPolicy,
    "تم تحديث سياسة النقاط بنجاح",
    "points"
  );

  return {
    updatePolicy: updatePolicyMutation.mutate,
    isUpdating: updatePolicyMutation.isPending,
  };
};

export const usePointsRedemptionActions = () => {
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: USE_MOCK
      ? async (payload) => payload
      : (payload) =>
          dashboardService.updateRedemptionStatus(payload.redemptionId, {
            status: payload.status,
            notes: payload.notes || undefined,
          }),
    onSuccess: () => {
      queryClient.invalidateQueries(["points"]);
      toast.success("تم تحديث حالة العملية بنجاح");
    },
    onError: (error) => handleApiError(error, "فشل تحديث حالة العملية"),
  });

  const deleteMutation = useMutation({
    mutationFn: USE_MOCK
      ? async (id) => id
      : (redemptionId) => dashboardService.deleteRedemption(redemptionId),
    onSuccess: () => {
      queryClient.invalidateQueries(["points"]);
      toast.success("تم حذف العملية بنجاح");
    },
    onError: (error) => handleApiError(error, "فشل حذف العملية"),
  });

  return {
    updateStatus: updateStatusMutation.mutate,
    isUpdatingStatus: updateStatusMutation.isPending,
    deleteRedemption: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};

// --- Settings Hooks ---
export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve(MOCK.MOCK_SETTINGS)
        : dashboardService.getSettings(),
  });
};

export const useSettingActions = () => {
  const updateSettingsMutation = useMockMutation(
    dashboardService.updateSettings,
    "تم تحديث الإعدادات بنجاح",
    "settings"
  );

  return {
    updateSettings: updateSettingsMutation.mutate,
    isUpdating: updateSettingsMutation.isPending,
  };
};

// --- Dashboard Stats Hooks ---
export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () =>
      USE_MOCK ? Promise.resolve(MOCK.MOCK_STATS) : dashboardService.getStats(),
  });
};

// --- Admin Profile Hooks ---
export const useAdminProfile = () => {
  return useQuery({
    queryKey: ["adminProfile"],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({
            data: {
              id: 1,
              first_name: "Admin",
              last_name: "User",
              email: "admin@shihal.test",
              role: "admin",
              status: "active",
              last_login: new Date().toISOString(),
            },
          })
        : dashboardService.getAdminProfile(),
  });
};

export const useAdminProfileActions = () => {
  const updateMutation = useMockMutation(
    dashboardService.updateAdminProfile,
    "تم تحديث الملف الشخصي بنجاح",
    "adminProfile"
  );

  return {
    updateProfile: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
};

// --- Logout Hook ---
export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: USE_MOCK
      ? async () => ({ success: true })
      : dashboardService.logout,
    onSuccess: () => {
      // Clear token from both localStorage and cookie, then redirect
      if (typeof window !== "undefined") {
        localStorage.removeItem("shhal_admin_token");
        deleteCookie("shhal_admin_token");
      }
      queryClient.clear();
      toast.success("تم تسجيل الخروج بنجاح");
      router.push("/login");
    },
    onError: (error) => {
      // Even if API call fails, clear local storage, cookie and redirect
      if (typeof window !== "undefined") {
        localStorage.removeItem("shhal_admin_token");
        deleteCookie("shhal_admin_token");
      }
      queryClient.clear();
      router.push("/login");
      handleApiError(error, "حدث خطأ أثناء تسجيل الخروج");
    },
  });
};

// --- Stores Hooks ---
export const useStores = (params) => {
  return useQuery({
    queryKey: ["stores", params],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({ data: [] })
        : dashboardService.getStores(params),
  });
};

export const useStoreActions = () => {
  const createMutation = useMockMutation(
    dashboardService.createStore,
    "تم إضافة المتجر بنجاح",
    "stores"
  );
  const updateMutation = useMockMutation(
    ({ id, data }) => dashboardService.updateStore(id, data),
    "تم تحديث المتجر بنجاح",
    "stores"
  );
  const deleteMutation = useMockMutation(
    dashboardService.deleteStore,
    "تم حذف المتجر بنجاح",
    "stores"
  );

  return {
    createStore: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateStore: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteStore: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};

// --- Branches Hooks ---
export const useBranches = (params) => {
  return useQuery({
    queryKey: ["branches", params],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({ data: [] })
        : dashboardService.getBranches(params),
  });
};

export const useBranchesByStore = (storeId) => {
  return useQuery({
    queryKey: ["branchesByStore", storeId],
    queryFn: () =>
      USE_MOCK
        ? Promise.resolve({ data: [] })
        : dashboardService.getBranchesByStore(storeId),
    enabled: !!storeId,
  });
};

export const useBranchActions = () => {
  const createMutation = useMockMutation(
    dashboardService.createBranch,
    "تم إضافة الفرع بنجاح",
    "branches"
  );
  const updateMutation = useMockMutation(
    ({ id, data }) => dashboardService.updateBranch(id, data),
    "تم تحديث الفرع بنجاح",
    "branches"
  );
  const deleteMutation = useMockMutation(
    dashboardService.deleteBranch,
    "تم حذف الفرع بنجاح",
    "branches"
  );

  return {
    createBranch: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateBranch: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteBranch: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
