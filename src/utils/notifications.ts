import { useNotification } from '../context/NotificationContext';

export function useNotificationService() {
  const { showNotification } = useNotification();

  return {
    success: (message: string, duration?: number) => 
      showNotification('success', message, duration),
    error: (message: string, duration?: number) => 
      showNotification('error', message, duration),
    warning: (message: string, duration?: number) => 
      showNotification('warning', message, duration),
    info: (message: string, duration?: number) => 
      showNotification('info', message, duration)
  };
}