import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, useAuth } from './AuthProvider';
import App from './App.tsx';
import Login from './Login.tsx';
import Register from './Register.tsx';
import './index.css';

function AppWrapper() {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-400 text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Simple hash-based routing
  const currentHash = window.location.hash;
  
  if (isAuthenticated) {
    return <App />;
  }
  
  if (currentHash === '#register') {
    return <Register />;
  }
  
  return <Login />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  </StrictMode>
);
