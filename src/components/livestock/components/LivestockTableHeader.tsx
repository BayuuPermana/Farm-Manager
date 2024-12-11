import React from 'react';
import { Filter, Download, Plus, Search } from 'lucide-react';

interface LivestockTableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAdd: () => void;
}

const LivestockTableHeader: React.FC<LivestockTableHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onAdd
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search livestock..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center text-gray-700 hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center text-gray-700 hover:bg-gray-50">
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Livestock
        </button>
      </div>
    </div>
  );
};

export default LivestockTableHeader;