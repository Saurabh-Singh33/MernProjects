// Define user roles for clearer domain modeling
export type UserRole = "admin" | "user" | "moderator";

// Define the base interface for user data
export interface BaseUser {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: UserRole;
}

// Admin-specific extension (optional extras)
export interface AdminUser extends BaseUser {
  role: "admin";
  permissions: string[];
}

// Regular user extension
export interface RegularUser extends BaseUser {
  role: "user";
}

// Generic interface for profile data
export interface ProfileData<T extends BaseUser> {
  user: T;
  isLoading: boolean;
  error?: string;
}

// Generic props for components
export interface ProfileProps<T extends BaseUser> {
  data: ProfileData<T>;
  onUpdate?: (user: T) => void;
  onDelete?: (id: number) => void;
}
