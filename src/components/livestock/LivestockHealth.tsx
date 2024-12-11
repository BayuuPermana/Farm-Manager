import React from 'react';
import { Activity, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const LivestockHealth = () => {
  const healthRecords = [
    {
      id: 1,
      type: 'Cattle',
      tag: 'C-123',
      date: new Date('2024-03-15'),
      condition: 'Vaccination',
      notes: 'Regular vaccination schedule',
      vet: 'Dr. Smith',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Sheep',
      tag: 'S-456',
      date: new Date('2024-03-18'),
      condition: 'Health Check',
      notes: 'Routine health inspection',
      vet: 'Dr. Johnson',
      status: 'scheduled'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Health Records</h2>
            <div className="flex space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center text-gray-700">
                <Activity className="w-4 h-4 mr-2" />
                Add Record
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Check-up
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Tag</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Condition</th>
                  <th className="text-left py-3 px-4">Notes</th>
                  <th className="text-left py-3 px-4">Veterinarian</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {healthRecords.map((record) => (
                  <tr key={record.id} className="border-b">
                    <td className="py-3 px-4">{record.type}</td>
                    <td className="py-3 px-4">{record.tag}</td>
                    <td className="py-3 px-4">{format(record.date, 'MMM dd, yyyy')}</td>
                    <td className="py-3 px-4">{record.condition}</td>
                    <td className="py-3 px-4">{record.notes}</td>
                    <td className="py-3 px-4">{record.vet}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
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
    </div>
  );
};

export default LivestockHealth;