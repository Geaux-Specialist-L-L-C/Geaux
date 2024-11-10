// src/utils/errorLogging.ts
type ErrorInfo = {
  componentStack: string;
};

export const logError = (error: Error, errorInfo?: ErrorInfo): void => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error);
    if (errorInfo) {
      console.error('Error Info:', errorInfo);
    }
  }
  
  // Here you could add production error logging service
  // Example: Sentry, LogRocket, etc.
};