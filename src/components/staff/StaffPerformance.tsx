import React from 'react';
import { BarChart2, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import type { PerformanceMetric } from '../../types';
import { format } from 'date-fns';

interface StaffPerformanceProps {
  performance: PerformanceMetric[];
}

const StaffPerformance: React.FC<StaffPerformanceProps> = ({ performance }) => {
  const getMetricIcon = (category: string) => {
    switch (category) {
      case 'attendance':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'task_completion':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'efficiency':
        return <TrendingUp className="w-5 h-5 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Performance Metrics</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
            <BarChart2 className="w-4 h-4 mr-2" />
            Add Metric
          </button>
        </div>

        <div className="space-y-4">
          {performance.map((metric) => (
            <div key={metric.id} className="border-b pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getMetricIcon(metric.category)}
                  <div>
                    <p className="font-medium capitalize">
                      {metric.category.replace('_', ' ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {format(metric.date, 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">
                    {metric.score}/10
                  </div>
                  <p className="text-sm text-gray-600">{metric.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffPerformance;