import React, { createContext, ReactNode, useContext, useReducer } from "react";
import {
  permissions as initialPermissions,
  roles as initialRoles,
  users as initialUsers,
} from "../data/mock";
import { Permission, Role, User } from "../types";

type State = {
  users: User[];
  roles: Role[];
  permissions: Permission[];
};

type Action =
  | { type: "ADD_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "DELETE_USER"; payload: string }
  | { type: "ADD_ROLE"; payload: Role }
  | { type: "UPDATE_ROLE"; payload: Role }
  | { type: "DELETE_ROLE"; payload: string }
  | { type: "ADD_PERMISSION"; payload: Permission }
  | { type: "UPDATE_PERMISSION"; payload: Permission }
  | { type: "DELETE_PERMISSION"; payload: string };

const initialState: State = {
  users: initialUsers,
  roles: initialRoles,
  permissions: initialPermissions,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case "ADD_ROLE":
      return { ...state, roles: [...state.roles, action.payload] };
    case "UPDATE_ROLE":
      return {
        ...state,
        roles: state.roles.map((role) =>
          role.id === action.payload.id ? action.payload : role
        ),
      };
    case "DELETE_ROLE":
      return {
        ...state,
        roles: state.roles.filter((role) => role.id !== action.payload),
      };
    case "ADD_PERMISSION":
      return { ...state, permissions: [...state.permissions, action.payload] };
    case "UPDATE_PERMISSION":
      return {
        ...state,
        permissions: state.permissions.map((permission) =>
          permission.id === action.payload.id ? action.payload : permission
        ),
      };
    case "DELETE_PERMISSION":
      return {
        ...state,
        permissions: state.permissions.filter(
          (permission) => permission.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

const RBACContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function RBACProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RBACContext.Provider value={{ state, dispatch }}>
      {children}
    </RBACContext.Provider>
  );
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error("useRBAC must be used within a RBACProvider");
  }
  return context;
}