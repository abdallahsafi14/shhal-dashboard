"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/lib/auth-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { USE_MOCK } from "@/lib/config";
import { MOCK_PROFILE } from "@/lib/mock-data";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: USE_MOCK
      ? async () => ({ token: "mock-token" })
      : authService.login,
    onSuccess: (data) => {
      localStorage.setItem(
        "shhal_admin_token",
        data.data?.token || data.token || data.access_token
      );
      toast.success(data.message || "تم تسجيل الدخول بنجاح");
      router.push("/");
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        "فشل تسجيل الدخول. يرجى التحقق من بياناتك";
      toast.error(message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: USE_MOCK ? async () => ({}) : authService.register,
    onSuccess: () => {
      toast.success("تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول");
      router.push("/login");
    },
    onError: (error) => {
      const message =
        error.response?.data?.message ||
        "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى";
      toast.error(message);
    },
  });

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      USE_MOCK ? Promise.resolve(MOCK_PROFILE.data) : authService.getProfile(),
    enabled:
      USE_MOCK ||
      (typeof window !== "undefined" &&
        !!localStorage.getItem("shhal_admin_token")),
    retry: false,
    onError: () => {
      if (!USE_MOCK) localStorage.removeItem("shhal_admin_token");
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    profile,
    isProfileLoading,
    logout: () => {
      localStorage.removeItem("shhal_admin_token");
      router.push("/login");
    },
  };
};
