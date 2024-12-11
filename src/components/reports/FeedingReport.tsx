import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Filter } from 'lucide-react';

const FeedingReport = () => {
  const data = [
    { name: 'Mon', cattle: 400, sheep: 240, poultry: 180 },
    { name: 'Tue', cattle: 380, sheep: 250, poultry: 190 },
    { name: 'Wed', cattle: 420, sheep: 230, poultry: 185 },
    { name: 'Thu', cattle: 390, sheep: 245, poultry: 175 },
    { name: 'Fri', cattle: 410, sheep: 235, poultry: 195 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Weekly Feeding Report</h2>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center text-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cattle" name="Cattle" fill="#3B82F6" />
              <Bar dataKey="sheep" name="Sheep" fill="#10B981" />
              <Bar dataKey="poultry" name="Poultry" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600">Total Feed (Cattle)</p>
            <p className="text-2xl font-semibold text-blue-700">2,000 kg</p>
            <p className="text-sm text-blue-600">+5% from last week</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600">Total Feed (Sheep)</p>
            <p className="text-2xl font-semibold text-green-700">1,200 kg</p>
            <p className="text-sm text-green-600">+2% from last week</p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-600">Total Feed (Poultry)</p>
            <p className="text-2xl font-semibold text-indigo-700">925 kg</p>
            <p className="text-sm text-indigo-600">-1% from last week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedingReport;