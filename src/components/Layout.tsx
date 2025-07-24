import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isAdminPanel = location.pathname === '/admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />
      <main className={`py-8 px-4 sm:px-6 lg:px-8 ${isAdminPanel ? 'max-w-7xl' : 'max-w-6xl'} mx-auto`}>
        {children}
      </main>
    </div>
  );
}