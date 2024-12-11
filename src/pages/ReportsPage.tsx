import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FeedingReport from '../components/reports/FeedingReport';

const ReportsPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-600">View and analyze farm data</p>
      </div>

      <Routes>
        <Route index element={<FeedingReport />} />
      </Routes>
    </div>
  );
};

export default ReportsPage;