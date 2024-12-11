import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LivestockOverview from '../components/livestock/LivestockOverview';
import LivestockFeeding from '../components/livestock/LivestockFeeding';
import LivestockHealth from '../components/livestock/LivestockHealth';

const LivestockPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Livestock Management</h1>
        <p className="text-gray-600">Monitor and manage your farm animals</p>
      </div>

      <Routes>
        <Route index element={<LivestockOverview />} />
        <Route path="feeding" element={<LivestockFeeding />} />
        <Route path="health" element={<LivestockHealth />} />
      </Routes>
    </div>
  );
};

export default LivestockPage;