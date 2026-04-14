// User-related type definitions
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  preferences: UserPreferences;
  createdAt: Date;
  lastLogin?: Date;
}

export interface UserRole {
  name: string;
  permissions: string[];
}

export interface UserPreferences {
  theme: "light" | "dark";
  notifications: boolean;
  language: string;
}

// Generic user profile props
export interface ProfileProps<T extends User> {
  user: T;
  onUpdate: (user: T) => void;
  isEditing?: boolean;
}

// Dashboard item types
export interface DashboardItem {
  id: string;
  title: string;
  description: string;
  type: "metric" | "chart" | "list" | "card";
  data: any;
}

export interface DashboardProps<T extends DashboardItem> {
  items: T[];
  onItemClick?: (item: T) => void;
  layout: "grid" | "list";
  title?: string;
}
