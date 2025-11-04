
import React from 'react';
import { Outlet } from 'react-router-dom';
import AgentSidebar from '../components/AgentSidebar';

export default function AgentLayout() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <AgentSidebar />
      <main className="flex-1 lg:ml-64 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}