import React from 'react';
import { Package, AlertCircle } from 'lucide-react';
import type { FeedInventory } from '../../types';

const FeedInventoryTable = () => {
  const inventory: FeedInventory[] = [
    {
      id: '1',
      name: 'Hay',
      currentStock: 1500,
      unit: 'kg',
      minimumStock: 1000,
      expirationDate: new Date('2024-06-01'),
      costPerUnit: 2.5,
    },
    {
      id: '2',
      name: 'Grain Mix',
      currentStock: 800,
      unit: 'kg',
      minimumStock: 1200,
      expirationDate: new Date('2024-05-15'),
      costPerUnit: 3.75,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Feed Inventory</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
            <Package className="w-4 h-4 mr-2" />
            Add Feed
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Feed Type</th>
                <th className="text-left py-3 px-4">Current Stock</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Expires</th>
                <th className="text-left py-3 px-4">Cost/Unit</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">
                    {item.currentStock} {item.unit}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.currentStock < item.minimumStock
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {item.currentStock < item.minimumStock ? (
                        <>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Low Stock
                        </>
                      ) : (
                        'In Stock'
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {item.expirationDate.toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">${item.costPerUnit.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeedInventoryTable;