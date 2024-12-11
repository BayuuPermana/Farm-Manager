import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  Calendar,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Beef,
} from 'lucide-react';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  subItems?: { label: string; path: string }[];
}

const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: Beef,
      label: 'Livestock',
      subItems: [
        { label: 'Overview', path: '/livestock' },
        { label: 'Feeding Schedule', path: '/livestock/feeding' },
        { label: 'Health Records', path: '/livestock/health' }
      ]
    },
    {
      icon: Users,
      label: 'Staff',
      path: '/staff',
      subItems: [
        { label: 'Directory', path: '/staff' },
        { label: 'Schedules', path: '/staff/schedules' },
        { label: 'Performance', path: '/staff/performance' }
      ]
    },
    {
      icon: Package,
      label: 'Inventory',
      path: '/inventory',
      subItems: [
        { label: 'Feed Stock', path: '/inventory/feed' },
        { label: 'Equipment', path: '/inventory/equipment' },
        { label: 'Suppliers', path: '/inventory/suppliers' }
      ]
    },
    {
      icon: Calendar,
      label: 'Schedule',
      path: '/schedule'
    }
  ];

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-white h-screen w-64 fixed left-0 top-0 border-r flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-blue-600">Farm Manager</h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <p className="text-xs font-medium text-gray-500 mb-3 px-6">MAIN NAVIGATION</p>
        {menuItems.map((item) => (
          <div key={item.label}>
            {item.path ? (
              <Link
                to={item.path}
                className={`w-full flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                  isActive(item.path) ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </div>
                {item.subItems && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExpand(item.label);
                    }}
                  >
                    {expandedItems.includes(item.label) 
                      ? <ChevronDown className="w-4 h-4" />
                      : <ChevronRight className="w-4 h-4" />
                    }
                  </button>
                )}
              </Link>
            ) : (
              <button
                onClick={() => toggleExpand(item.label)}
                className="w-full flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </div>
                {expandedItems.includes(item.label) 
                  ? <ChevronDown className="w-4 h-4" />
                  : <ChevronRight className="w-4 h-4" />
                }
              </button>
            )}
            {item.subItems && expandedItems.includes(item.label) && (
              <div className="bg-gray-50 py-2">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.label}
                    to={subItem.path}
                    className={`flex items-center pl-14 pr-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-100 ${
                      isActive(subItem.path) ? 'text-blue-600 bg-blue-50' : ''
                    }`}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="border-t p-4">
        <Link
          to="/settings"
          className={`w-full flex items-center px-2 py-2 text-gray-700 hover:bg-gray-50 rounded-lg mb-2 ${
            isActive('/settings') ? 'bg-blue-50 text-blue-600' : ''
          }`}
        >
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </Link>
        <button className="w-full flex items-center px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;