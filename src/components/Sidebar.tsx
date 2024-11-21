import React from 'react';
import { Users, Shield, Key, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Shield, label: 'Roles', path: '/roles' },
  { icon: Key, label: 'Permissions', path: '/permissions' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Shield className="w-8 h-8 text-indigo-400" />
        <h1 className="text-xl font-bold">RBAC Admin</h1>
      </div>
      <nav>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}