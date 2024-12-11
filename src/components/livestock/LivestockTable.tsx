import React, { useState } from 'react';
import { format, isValid } from 'date-fns';
import { Edit2, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import type { Livestock, LivestockSortField } from '../../types/livestock';
import { usePagination } from '../../hooks/usePagination';
import Pagination from '../common/Pagination';
import { useConfirmDialog } from '../../hooks/useConfirmDialog';
import ConfirmDialog from '../common/ConfirmDialog';

interface LivestockTableProps {
  livestock: Livestock[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const LivestockTable: React.FC<LivestockTableProps> = ({
  livestock,
  onEdit,
  onDelete
}) => {
  const [sortField, setSortField] = useState<LivestockSortField>('species');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [pageSize, setPageSize] = useState(10);

  const {
    currentPage,
    paginate,
    totalPages,
    goToPage
  } = usePagination({ pageSize });

  const {
    dialog,
    showConfirmDialog,
    closeDialog,
    handleConfirm
  } = useConfirmDialog();

  const handleSort = (field: LivestockSortField) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    const dateObj = date instanceof Date ? date : new Date(date);
    return isValid(dateObj) ? format(dateObj, 'MMM d, yyyy') : 'Invalid Date';
  };

  const formatCurrency = (value: number | undefined) => {
    if (typeof value !== 'number') return '$0.00';
    return `$${value.toFixed(2)}`;
  };

  const sortedLivestock = [...livestock].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * direction;
    }
    
    if (aValue instanceof Date && bValue instanceof Date) {
      return (aValue.getTime() - bValue.getTime()) * direction;
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * direction;
    }
    
    return 0;
  });

  const paginatedLivestock = paginate(sortedLivestock);

  const handleDelete = (animal: Livestock) => {
    if (!animal.id) return;
    showConfirmDialog(
      'Delete Animal',
      `Are you sure you want to delete ${animal.species} with tag number ${animal.tagNumber}?`,
      () => onDelete(animal.id!)
    );
  };

  const renderSortIcon = (field: LivestockSortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="rounded-md border-gray-300 text-sm"
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={30}>30 per page</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {(['species', 'tagNumber', 'birthDate', 'weight', 'healthStatus', 'breedingStatus', 'cost'] as const).map((field) => (
                <th
                  key={field}
                  onClick={() => handleSort(field)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                >
                  <div className="flex items-center space-x-1">
                    <span>{field.replace(/([A-Z])/g, ' $1').trim()}</span>
                    {renderSortIcon(field)}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedLivestock.map((animal) => (
              <tr key={animal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{animal.species}</td>
                <td className="px-6 py-4 whitespace-nowrap">{animal.tagNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(animal.birthDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {typeof animal.weight === 'number' ? `${animal.weight} kg` : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${animal.healthStatus === 'healthy' ? 'bg-green-100 text-green-800' :
                      animal.healthStatus === 'sick' ? 'bg-red-100 text-red-800' :
                      animal.healthStatus === 'quarantined' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'}`}>
                    {animal.healthStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${animal.breedingStatus === 'breeding' ? 'bg-purple-100 text-purple-800' :
                      animal.breedingStatus === 'pregnant' ? 'bg-pink-100 text-pink-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {animal.breedingStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatCurrency(animal.cost)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => animal.id && onEdit(animal.id)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(animal)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages(livestock.length)}
        onPageChange={(page) => goToPage(page, livestock.length)}
      />

      <ConfirmDialog
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        onConfirm={handleConfirm}
        onCancel={closeDialog}
      />
    </div>
  );
};

export default LivestockTable;