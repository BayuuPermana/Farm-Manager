import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import type { WorkSchedule } from '../../types';
import { format } from 'date-fns';

interface StaffScheduleProps {
  schedule: WorkSchedule[];
}

const StaffSchedule: React.FC<StaffScheduleProps> = ({ schedule }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Work Schedule</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Add Shift
          </button>
        </div>

        <div className="space-y-4">
          {schedule.map((shift) => (
            <div key={shift.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  shift.status === 'completed' ? 'bg-green-100' : 
                  shift.status === 'absent' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <Clock className={`w-5 h-5 ${
                    shift.status === 'completed' ? 'text-green-600' :
                    shift.status === 'absent' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <p className="font-medium">{format(shift.date, 'EEEE, MMMM d')}</p>
                  <p className="text-sm text-gray-600">
                    {shift.shift.charAt(0).toUpperCase() + shift.shift.slice(1)} Shift - {shift.area}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                shift.status === 'completed' ? 'bg-green-100 text-green-800' :
                shift.status === 'absent' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffSchedule;