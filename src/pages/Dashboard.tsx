import React from 'react';
import DashboardMetrics from '../components/dashboard/DashboardMetrics';
import FeedingStatus from '../components/dashboard/FeedingStatus';
import LivestockOverview from '../components/livestock/LivestockOverview';
import FeedInventoryTable from '../components/inventory/FeedInventoryTable';

const Dashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Farm Manager</p>
      </div>
      
      <div className="space-y-8">
        <DashboardMetrics />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FeedingStatus />
        </div>
        
        <LivestockOverview />
        <FeedInventoryTable />
      </div>
    </div>
  );
};

export default Dashboard;