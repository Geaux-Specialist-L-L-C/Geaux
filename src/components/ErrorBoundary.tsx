// src/components/ErrorBoundary.tsx
import React from 'react';
import { logError } from '../utils/errorLogging';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logError(error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 rounded-lg">
          <h2 className="text-red-800 font-bold">Something went wrong</h2>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-2 text-sm text-red-600">
              {this.state.error?.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;