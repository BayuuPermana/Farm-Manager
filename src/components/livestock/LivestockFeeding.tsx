import React from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

const LivestockFeeding = () => {
  const feedingSchedule = [
    {
      id: 1,
      type: 'Cattle',
      area: 'North Pasture',
      time: new Date('2024-03-20T08:00:00'),
      feed: 'Hay Mix',
      quantity: '250kg',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Sheep',
      area: 'East Field',
      time: new Date('2024-03-20T09:30:00'),
      feed: 'Grain Mix',
      quantity: '180kg',
      status: 'pending'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Feeding Schedule</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Add Schedule
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Area</th>
                <th className="text-left py-3 px-4">Time</th>
                <th className="text-left py-3 px-4">Feed</th>
                <th className="text-left py-3 px-4">Quantity</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedingSchedule.map((schedule) => (
                <tr key={schedule.id} className="border-b">
                  <td className="py-3 px-4">{schedule.type}</td>
                  <td className="py-3 px-4">{schedule.area}</td>
                  <td className="py-3 px-4">{format(schedule.time, 'HH:mm')}</td>
                  <td className="py-3 px-4">{schedule.feed}</td>
                  <td className="py-3 px-4">{schedule.quantity}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      schedule.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LivestockFeeding;