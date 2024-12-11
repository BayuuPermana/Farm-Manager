import React from 'react';
import { BarChart3, Users, Package, AlertTriangle } from 'lucide-react';

const DashboardMetrics = () => {
  const metrics = [
    {
      title: 'Total Livestock',
      value: '2,345',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Feed Stock',
      value: '12.5 tons',
      change: '-8%',
      icon: Package,
      color: 'bg-green-500',
    },
    {
      title: 'Active Staff',
      value: '48',
      change: '+3%',
      icon: BarChart3,
      color: 'bg-purple-500',
    },
    {
      title: 'Alerts',
      value: '5',
      change: '+2',
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.title} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{metric.title}</p>
              <h3 className="text-2xl font-semibold mt-1">{metric.value}</h3>
              <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} from last month
              </p>
            </div>
            <div className={`${metric.color} p-3 rounded-full`}>
              <metric.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;