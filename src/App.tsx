import React, { useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { validateEnvConfig } from './utils/config';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Assessment from './components/assessment/Assessment';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [isConfigValid, setIsConfigValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      validateEnvConfig();
      setIsConfigValid(true);
    } catch (error) {
      console.error('Configuration error:', error);
      setIsConfigValid(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isConfigValid) {
    return (
      <div className="min-h-screen bg-red-50 p-4">
        <h1 className="text-red-600">Configuration Error</h1>
        <p>Please check your environment variables and try again.</p>
      </div>
    );
  }

  return (
    <AuthProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="pt-16">
            {showAssessment ? (
              <Assessment />
            ) : (
              <Hero />
            )}
          </div>
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;