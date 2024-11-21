import { Key, Shield, UserCheck, Users } from "lucide-react";
import { permissions, roles, users } from "../data/mock";

const stats = [
  {
    icon: Users,
    label: "Total Users",
    value: users.length,
    color: "bg-blue-500",
  },
  {
    icon: Shield,
    label: "Roles",
    value: roles.length,
    color: "bg-indigo-500",
  },
  {
    icon: Key,
    label: "Permissions",
    value: permissions.length,
    color: "bg-purple-500",
  },
  {
    icon: UserCheck,
    label: "Active Users",
    value: users.filter((u) => u.status === "Active").length,
    color: "bg-green-500",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
          <div className="space-y-4">
            {users.slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Role Distribution</h3>
          <div className="space-y-4">
            {roles.map((role) => {
              const userCount = users.filter(
                (u) => u.roleId === role.id
              ).length;
              const percentage = (userCount / users.length) * 100;
              return (
                <div key={role.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{role.name}</span>
                    <span className="text-gray-500">{userCount} users</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
