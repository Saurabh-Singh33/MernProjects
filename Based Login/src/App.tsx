import { useState } from "react";
import { Profile, UserDashboard, AdminDashboard } from "./components";
import type { User, DashboardItem } from "./types/user";
import "./App.css";

// Sample user data
const sampleUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://via.placeholder.com/100",
  role: {
    name: "Admin",
    permissions: ["read", "write", "delete", "admin"],
  },
  preferences: {
    theme: "dark",
    notifications: true,
    language: "en",
  },
  createdAt: new Date("2023-01-01"),
  lastLogin: new Date(),
};

// Sample dashboard items for normal user
const userDashboardItems: DashboardItem[] = [
  {
    id: "1",
    title: "My Activity",
    description: "Quick personal activity summary",
    type: "list",
    data: {
      items: ["Viewed dashboard", "Updated profile", "Opened settings"],
    },
  },
  {
    id: "2",
    title: "Support Tickets",
    description: "Unresolved support requests",
    type: "metric",
    data: { value: 3 },
  },
];

// Sample dashboard items for admin
const adminDashboardItems: DashboardItem[] = [
  {
    id: "a1",
    title: "Total Users",
    description: "Number of registered users",
    type: "metric",
    data: { value: 1234 },
  },
  {
    id: "a2",
    title: "Revenue Overview",
    description: "Revenue for the current month",
    type: "chart",
    data: { chartType: "line" },
  },
  {
    id: "a3",
    title: "Recent Admin Actions",
    description: "Latest configured system actions",
    type: "list",
    data: {
      items: ["Updated roles", "Changed permissions", "Purged logs"],
    },
  },
  {
    id: "a4",
    title: "System Status",
    description: "Current system health",
    type: "card",
    data: { content: "All systems operational" },
  },
];

function App() {
  const [user, setUser] = useState<User>(sampleUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleItemClick = (item: DashboardItem) => {
    console.log("Clicked item:", item);
    alert(`Clicked: ${item.title}`);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Type-Safe React Module Demo</h1>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>
      </header>

      <main className="app-main">
        <section className="profile-section">
          <Profile
            user={user}
            onUpdate={handleUserUpdate}
            isEditing={isEditing}
          />
        </section>

        <section className="dashboard-section">
          {user.role.name.toLowerCase() === "admin" ? (
            <AdminDashboard
              title="Admin Dashboard"
              items={adminDashboardItems}
              onItemClick={handleItemClick}
              layout="grid"
            />
          ) : (
            <UserDashboard
              title="User Dashboard"
              items={userDashboardItems}
              onItemClick={handleItemClick}
              layout="grid"
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
