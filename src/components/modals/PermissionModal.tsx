import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Permission } from '../../types';
import { useRBAC } from '../../context/RBACContext';

type Props = {
  permission?: Permission;
  isOpen: boolean;
  onClose: () => void;
};

export default function PermissionModal({ permission, isOpen, onClose }: Props) {
  const { dispatch } = useRBAC();
  const [formData, setFormData] = useState<Partial<Permission>>({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (permission) {
      setFormData(permission);
    } else {
      setFormData({
        name: '',
        description: '',
      });
    }
  }, [permission]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const permissionData: Permission = {
      id: permission?.id || crypto.randomUUID(),
      name: formData.name,
      description: formData.description || '',
    };

    dispatch({
      type: permission ? 'UPDATE_PERMISSION' : 'ADD_PERMISSION',
      payload: permissionData,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {permission ? 'Edit Permission' : 'Add Permission'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              {permission ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}