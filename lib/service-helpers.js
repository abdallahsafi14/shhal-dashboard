import { toast } from 'sonner';

export const handleApiError = (error, customMessage) => {
  const message = error.response?.data?.message || customMessage || 'حدث خطأ ما. يرجى المحاولة مرة أخرى';
  toast.error(message);
  console.error('API Error:', error);
  return message;
};

export const handleApiSuccess = (message) => {
  toast.success(message || 'تمت العملية بنجاح');
};
