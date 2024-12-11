import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Staff } from '../../types';

interface AddLivestockModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
  staff: Staff[];
}

const AddLivestockModal: React.FC<AddLivestockModalProps> = ({ onClose, onSave, staff }) => {
  const [formData, setFormData] = useState({
    type: '',
    count: 0,
    assignedStaff: [] as string[],
    feedingSchedule: {
      morning: '',
      afternoon: '',
      evening: '',
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add New Livestock</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Livestock Type</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Cattle, Sheep, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Count</label>
              <input
                type="number"
                value={formData.count}
                onChange={(e) => setFormData({ ...formData, count: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Feeding Schedule</label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <label className="block text-xs text-gray-500">Morning</label>
                <input
                  type="time"
                  value={formData.feedingSchedule.morning}
                  onChange={(e) => setFormData({
                    ...formData,
                    feedingSchedule: { ...formData.feedingSchedule, morning: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500">Afternoon</label>
                <input
                  type="time"
                  value={formData.feedingSchedule.afternoon}
                  onChange={(e) => setFormData({
                    ...formData,
                    feedingSchedule: { ...formData.feedingSchedule, afternoon: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500">Evening</label>
                <input
                  type="time"
                  value={formData.feedingSchedule.evening}
                  onChange={(e) => setFormData({
                    ...formData,
                    feedingSchedule: { ...formData.feedingSchedule, evening: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign Staff</label>
            <div className="grid grid-cols-2 gap-2">
              {staff.map((member) => (
                <label key={member.id} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.assignedStaff.includes(member.id)}
                    onChange={(e) => {
                      const staffIds = e.target.checked
                        ? [...formData.assignedStaff, member.id]
                        : formData.assignedStaff.filter(id => id !== member.id);
                      setFormData({ ...formData, assignedStaff: staffIds });
                    }}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{member.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
            >
              Add Livestock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLivestockModal;