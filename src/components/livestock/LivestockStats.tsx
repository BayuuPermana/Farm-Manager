import React from 'react';
import { CircleDollarSign, Scale, Beef, Warehouse } from 'lucide-react';

const LivestockStats = () => {
  const stats = [
    {
      title: 'Total Livestock',
      value: '2,667',
      change: '+196',
      icon: Beef,
      color: 'bg-blue-500',
    },
    {
      title: 'Feed Stock',
      value: '12.5 tons',
      change: '-8%',
      icon: Warehouse,
      color: 'bg-green-500',
    },
    {
      title: 'Average Weight',
      value: '380kg',
      change: '+2.5%',
      icon: Scale,
      color: 'bg-purple-500',
    },
    {
      title: 'Monthly Cost',
      value: '$12,450',
      change: '+5.2%',
      icon: CircleDollarSign,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
              <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </p>
            </div>
            <div className={`${stat.color} p-3 rounded-full`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LivestockStats;