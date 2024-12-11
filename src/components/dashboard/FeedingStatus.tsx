import React from 'react';
import { Check, X, Clock } from 'lucide-react';

const FeedingStatus = () => {
  const livestock = [
    { id: 1, type: 'Cattle', area: 'North Pasture', status: 'fed', nextFeeding: '14:00' },
    { id: 2, type: 'Sheep', area: 'East Field', status: 'unfed', nextFeeding: '12:30' },
    { id: 3, type: 'Poultry', area: 'Coop A', status: 'pending', nextFeeding: '13:15' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'fed':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'unfed':
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Feeding Status</h2>
        <div className="space-y-4">
          {livestock.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">{item.type}</h3>
                <p className="text-sm text-gray-600">{item.area}</p>
              </div>
              <div className="flex items-center space-x-4">
                {getStatusIcon(item.status)}
                <span className="text-sm">Next: {item.nextFeeding}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedingStatus;