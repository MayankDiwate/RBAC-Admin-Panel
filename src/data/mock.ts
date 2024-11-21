import { Permission, Role, User } from "../types";

export const permissions: Permission[] = [
  {
    id: "read_users",
    name: "Read Users",
    description: "View user information",
  },
  {
    id: "write_users",
    name: "Write Users",
    description: "Create and edit users",
  },
  {
    id: "delete_users",
    name: "Delete Users",
    description: "Remove users from the system",
  },
  {
    id: "manage_roles",
    name: "Manage Roles",
    description: "Create and modify roles",
  },
  {
    id: "view_analytics",
    name: "View Analytics",
    description: "Access system analytics",
  },
];

export const roles: Role[] = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access",
    permissions: permissions.map((p) => p.id),
  },
  {
    id: "manager",
    name: "Manager",
    description: "User management and analytics",
    permissions: ["read_users", "write_users", "view_analytics"],
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access",
    permissions: ["read_users", "view_analytics"],
  },
];

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    roleId: "admin",
    status: "Active",
    lastLogin: "2024-03-10T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    roleId: "manager",
    status: "Active",
    lastLogin: "2024-03-09T15:45:00Z",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    roleId: "viewer",
    status: "Inactive",
    lastLogin: "2024-03-01T08:20:00Z",
  },
];
