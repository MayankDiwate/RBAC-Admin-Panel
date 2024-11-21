import React, { useState } from 'react';
import { Shield, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useRBAC } from '../context/RBACContext';
import { Role } from '../types';
import RoleModal from './modals/RoleModal';

export default function RoleList() {
  const { state, dispatch } = useRBAC();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();
  const [showActions, setShowActions] = useState<string | null>(null);

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
    setShowActions(null);
  };

  const handleDelete = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      dispatch({ type: 'DELETE_ROLE', payload: roleId });
    }
    setShowActions(null);
  };

  const handleAddRole = () => {
    setSelectedRole(undefined);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Roles</h2>
            <button
              onClick={handleAddRole}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Shield className="w-4 h-4" />
              Add Role
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid gap-6">
            {state.roles.map((role) => (
              <div
                key={role.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-indigo-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {role.name}
                    </h3>
                    <p className="text-sm text-gray-500">{role.description}</p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowActions(showActions === role.id ? null : role.id)
                      }
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {showActions === role.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <button
                            onClick={() => handleEdit(role)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(role.id)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permId) => {
                    const permission = state.permissions.find(
                      (p) => p.id === permId
                    );
                    return (
                      <span
                        key={permId}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                      >
                        {permission?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <RoleModal
        role={selectedRole}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRole(undefined);
        }}
      />
    </>
  );
}