import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StaffDirectory from '../components/staff/StaffDirectory';

const StaffPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Staff Management</h1>
        <p className="text-gray-600">Manage your farm staff and assignments</p>
      </div>

      <Routes>
        <Route index element={<StaffDirectory />} />
      </Routes>
    </div>
  );
};

export default StaffPage;