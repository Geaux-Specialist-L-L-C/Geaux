// src/components/ErrorBoundary.tsx
import React from 'react';
import { logError } from '../utils/errorLogging';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorInfo: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorInfo: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-700">
          <h2>Something went wrong.</h2>
          <details className="mt-2">
            <summary>Error details</summary>
            {this.state.errorInfo}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;