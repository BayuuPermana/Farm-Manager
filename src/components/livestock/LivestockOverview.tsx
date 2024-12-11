import React, { useState } from 'react';
import LivestockTable from './LivestockTable';
import LivestockStats from './LivestockStats';
import AddLivestockModal from './AddLivestockModal';
import { useApp } from '../../context/AppContext';
import type { Livestock } from '../../types';

const LivestockOverview = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { state, dispatch } = useApp();

  const handleAddLivestock = (data: Partial<Livestock>) => {
    const newLivestock: Livestock = {
      id: `l${Date.now()}`,
      species: data.species || '',
      tagNumber: data.tagNumber || `TAG-${Date.now()}`,
      birthDate: data.birthDate || new Date(),
      weight: data.weight || 0,
      healthStatus: data.healthStatus || 'healthy',
      breedingStatus: data.breedingStatus || 'not-breeding',
      assignedStaff: data.assignedStaff || [],
      notes: data.notes,
      location: data.location || 'default',
      lastCheckup: data.lastCheckup || new Date(),
      updatedAt: new Date(),
      cost: data.cost || 0,
      createdAt: new Date()
    };

    dispatch({ type: 'ADD_LIVESTOCK', payload: newLivestock });
    setShowAddModal(false);
  };

  const handleEditLivestock = (id: string) => {
    console.log('Edit livestock:', id);
  };

  const handleDeleteLivestock = (id: string) => {
    if (window.confirm('Are you sure you want to delete this livestock?')) {
      dispatch({ type: 'DELETE_LIVESTOCK', payload: id });
    }
  };

  return (
    <div className="space-y-6">
      <LivestockStats />
      
      <LivestockTable
        livestock={state.livestock || []}
        onEdit={handleEditLivestock}
        onDelete={handleDeleteLivestock}
        onAdd={() => setShowAddModal(true)}
      />

      {showAddModal && (
        <AddLivestockModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddLivestock}
          staff={state.staff}
        />
      )}
    </div>
  );
};

export default LivestockOverview;