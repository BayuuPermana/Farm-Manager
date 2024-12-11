import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import LivestockPage from './pages/LivestockPage';
import StaffPage from './pages/StaffPage';
import InventoryPage from './pages/InventoryPage';
import SchedulePage from './pages/SchedulePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <main className="ml-64 p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/livestock/*" element={<LivestockPage />} />
            <Route path="/staff/*" element={<StaffPage />} />
            <Route path="/inventory/*" element={<InventoryPage />} />
            <Route path="/schedule/*" element={<SchedulePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;