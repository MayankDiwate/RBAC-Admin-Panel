import React, { useState } from 'react';
import { Key, Pencil, Trash2 } from 'lucide-react';
import { useRBAC } from '../context/RBACContext';
import { Permission } from '../types';
import ActionMenu from './ActionMenu';
import PermissionModal from './modals/PermissionModal';

export default function PermissionList() {
  const { state, dispatch } = useRBAC();
  const [selectedPermission, setSelectedPermission] = useState<Permission | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsModalOpen(true);
  };

  const handleDelete = (permissionId: string) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      dispatch({ type: 'DELETE_PERMISSION', payload: permissionId });
    }
  };

  const handleAddPermission = () => {
    setSelectedPermission(undefined);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Permissions</h2>
            <button
              onClick={handleAddPermission}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Key className="w-4 h-4" />
              Add Permission
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid gap-4">
            {state.permissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {permission.name}
                  </h3>
                  <p className="text-sm text-gray-500">{permission.description}</p>
                </div>
                <ActionMenu
                  items={[
                    {
                      label: 'Edit',
                      icon: Pencil,
                      onClick: () => handleEdit(permission),
                    },
                    {
                      label: 'Delete',
                      icon: Trash2,
                      onClick: () => handleDelete(permission.id),
                      className: 'text-red-600',
                    },
                  ]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <PermissionModal
        permission={selectedPermission}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPermission(undefined);
        }}
      />
    </>
  );
}