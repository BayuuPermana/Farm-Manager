import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FeedInventoryTable from '../components/inventory/FeedInventoryTable';

const InventoryPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Inventory Management</h1>
        <p className="text-gray-600">Track and manage farm inventory</p>
      </div>

      <Routes>
        <Route index element={<FeedInventoryTable />} />
      </Routes>
    </div>
  );
};

export default InventoryPage;