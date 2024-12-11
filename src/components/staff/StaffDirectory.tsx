import React, { useState } from 'react';
import { Mail, Phone, MapPin, Edit, Calendar, BarChart2 } from 'lucide-react';
import type { Staff } from '../../types';
import StaffEdit from './StaffEdit';
import StaffSchedule from './StaffSchedule';
import StaffPerformance from './StaffPerformance';

const StaffDirectory = () => {
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const staffMembers: Staff[] = [
    {
      id: '1',
      name: 'John Doe',
      role: 'manager',
      email: 'john@farm.com',
      phone: '(555) 123-4567',
      assignedAreas: ['North Pasture', 'Feed Storage'],
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      startDate: new Date('2023-01-15'),
      schedule: [
        {
          id: 's1',
          date: new Date('2024-03-20'),
          shift: 'morning',
          area: 'North Pasture',
          status: 'completed'
        },
        {
          id: 's2',
          date: new Date('2024-03-21'),
          shift: 'afternoon',
          area: 'Feed Storage',
          status: 'scheduled'
        }
      ],
      performance: [
        {
          id: 'p1',
          date: new Date('2024-03-19'),
          category: 'attendance',
          score: 9,
          notes: 'Excellent punctuality'
        },
        {
          id: 'p2',
          date: new Date('2024-03-18'),
          category: 'task_completion',
          score: 8,
          notes: 'Completed all assigned tasks efficiently'
        }
      ]
    },
    {
      id: '2',
      name: 'Sarah Smith',
      role: 'staff',
      email: 'sarah@farm.com',
      phone: '(555) 234-5678',
      assignedAreas: ['Poultry Coop', 'East Field'],
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      startDate: new Date('2023-03-01'),
      schedule: [
        {
          id: 's3',
          date: new Date('2024-03-20'),
          shift: 'morning',
          area: 'Poultry Coop',
          status: 'completed'
        }
      ],
      performance: [
        {
          id: 'p3',
          date: new Date('2024-03-19'),
          category: 'efficiency',
          score: 9,
          notes: 'Outstanding work efficiency'
        }
      ]
    }
  ];

  const handleSave = (updatedStaff: Staff) => {
    // Here you would typically update the staff member in your backend
    console.log('Saving staff member:', updatedStaff);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Staff Directory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staffMembers.map((staff) => (
              <div key={staff.id} className="flex space-x-4 p-4 border rounded-lg">
                <img
                  src={staff.imageUrl}
                  alt={staff.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{staff.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{staff.role}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedStaff(staff);
                          setIsEditing(true);
                        }}
                        className="p-2 text-gray-600 hover:text-blue-600"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {staff.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {staff.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {staff.assignedAreas.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedStaff && (
        <>
          <StaffSchedule schedule={selectedStaff.schedule} />
          <StaffPerformance performance={selectedStaff.performance} />
        </>
      )}

      {isEditing && selectedStaff && (
        <StaffEdit
          staff={selectedStaff}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default StaffDirectory;