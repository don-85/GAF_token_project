import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { P2PTrading } from './pages/P2PTrading';
import { AdminPanel } from './pages/AdminPanel';
import { Converter } from './pages/Converter';
import { Chat } from './pages/Chat';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from './components/ui/Toaster';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/p2p" element={user ? <P2PTrading /> : <Navigate to="/" />} />
      <Route path="/admin" element={user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/dashboard" />} />
      <Route path="/converter" element={user ? <Converter /> : <Navigate to="/" />} />
      <Route path="/chat/:orderId?" element={user ? <Chat /> : <Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <AppRoutes />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;