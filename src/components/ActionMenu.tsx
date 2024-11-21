import React from 'react';
import { Menu } from '@headlessui/react';
import { MoreVertical } from 'lucide-react';

type ActionItem = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
  className?: string;
};

type Props = {
  items: ActionItem[];
};

export default function ActionMenu({ items }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center text-gray-400 hover:text-gray-600">
        <MoreVertical className="w-5 h-5" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="py-1">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } ${item.className || 'text-gray-700'} 
                    flex w-full items-center gap-2 px-4 py-2 text-sm`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            );
          })}
        </div>
      </Menu.Items>
    </Menu>
  );
}