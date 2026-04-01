import { useMemo, useState } from "react";
import { UserProfile } from "./modules/UserProfile";
import type {
  AdminUser,
  RegularUser,
  UserRole,
} from "./modules/UserProfile/types";
import "./App.css";

const users: (AdminUser | RegularUser)[] = [
  {
    id: 1,
    name: "Alice Admin",
    email: "alice.admin@domain.com",
    avatar: "https://i.pravatar.cc/100?img=12",
    bio: "System administrator with full access.",
    role: "admin",
    permissions: ["create", "update", "delete", "manage"],
  },
  {
    id: 2,
    name: "Sam User",
    email: "sam.user@domain.com",
    avatar: "https://i.pravatar.cc/100?img=17",
    bio: "Member of the user group.",
    role: "user",
  },
  {
    id: 3,
    name: "Ray User",
    email: "ray.user@domain.com",
    avatar: "https://i.pravatar.cc/100?img=19",
    bio: "Generally active user.",
    role: "user",
  },
  {
    id: 4,
    name: "Yuna User",
    email: "yuna.user@domain.com",
    avatar: "https://i.pravatar.cc/100?img=22",
    bio: "Power user and contributor.",
    role: "user",
  },
  {
    id: 5,
    name: "Maya User",
    email: "maya.user@domain.com",
    avatar: "https://i.pravatar.cc/100?img=30",
    bio: "Standard user account.",
    role: "user",
  },
];

function App() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [isDark, setIsDark] = useState(false);

  const filteredUsers = useMemo(
    () => users.filter((u) => u.role === selectedRole),
    [selectedRole],
  );

  const handleUpdate = (user: AdminUser | RegularUser) => {
    console.log("Update user:", user);
    alert(`Update requested for ${user.name}`);
  };

  const handleDelete = (id: number) => {
    console.log("Delete user:", id);
    alert(`Delete requested for user ID ${id}`);
  };

  return (
    <div className={`App ${isDark ? "dark" : "light"}`}>
      <button
        className="theme-toggle"
        onClick={() => setIsDark((prev) => !prev)}
        aria-label="Toggle light/dark mode"
      >
        {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <header className="App-header">
        <h1>Practicle 9</h1>
        <p>
          Toggle between Admin and User slices for role-based profile cards.
        </p>
      </header>

      <section className="role-filter">
        <button
          className={selectedRole === "admin" ? "active" : ""}
          onClick={() => setSelectedRole("admin")}
        >
          Admin view
        </button>
        <button
          className={selectedRole === "user" ? "active" : ""}
          onClick={() => setSelectedRole("user")}
        >
          User view
        </button>
      </section>

      <main className="profile-grid">
        {filteredUsers.length ? (
          filteredUsers.map((user) => (
            <UserProfile
              key={user.id}
              data={{ user, isLoading: false, error: undefined }}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No matching users found.</p>
        )}
      </main>
      <div className="footer-note">
        Crafted “by Saurabh ” style — friendly, playful, and easy to read.
      </div>
    </div>
  );
}

export default App;
