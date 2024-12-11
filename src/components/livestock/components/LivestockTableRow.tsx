import React from 'react';
import { Clock, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import type { Livestock } from '../../../types';

interface LivestockTableRowProps {
  item: Livestock;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const LivestockTableRow: React.FC<LivestockTableRowProps> = ({ item, onEdit, onDelete }) => {
  return (
    <tr className="border-b">
      <td className="py-3 px-4">{item.type}</td>
      <td className="py-3 px-4">{item.count}</td>
      <td className="py-3 px-4">{format(item.lastFed, 'HH:mm')}</td>
      <td className="py-3 px-4">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-gray-500" />
          {format(item.nextFeeding, 'HH:mm')}
        </div>
      </td>
      <td className="py-3 px-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          item.status === 'fed' 
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {item.status === 'unfed' && <AlertCircle className="w-3 h-3 mr-1" />}
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(item.id)}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-1 text-red-600 hover:text-red-800"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default LivestockTableRow;