export type Permission = {
  id: string;
  name: string;
  description: string;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleId: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
};