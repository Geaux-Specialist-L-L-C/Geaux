import { useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { validateEnvConfig } from './utils/config';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Assessment from './components/assessment/Assessment';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Dashboard from './components/dashboard/Dashboard';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuth();
  if (!session) return <Navigate to="/" />;
  return <>{children}</>;
};

function App() {
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
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-red-600 text-center">
          <h1 className="text-2xl font-bold">Configuration Error</h1>
          <p>Please check your environment variables.</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-16">
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route 
                  path="/assessment" 
                  element={
                    <ProtectedRoute>
                      <Assessment />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </div>
        </Router>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;