import { useState } from "react";
import type { User, ProfileProps } from "../types/user";
import { KeyValueDisplay } from "./common/DataDisplay";

export function Profile<T extends User>({
  user,
  onUpdate,
  isEditing = false,
}: ProfileProps<T>) {
  const [editUser, setEditUser] = useState<T>(user);

  const handleSave = () => {
    onUpdate(editUser);
  };

  const handleCancel = () => {
    setEditUser(user);
  };

  const userFields = [
    { key: "name" as keyof T, label: "Name" },
    { key: "email" as keyof T, label: "Email" },
    {
      key: "createdAt" as keyof T,
      label: "Member Since",
      formatter: (value: any) => new Date(value).toLocaleDateString(),
    },
    {
      key: "lastLogin" as keyof T,
      label: "Last Login",
      formatter: (value: any) =>
        value ? new Date(value).toLocaleDateString() : "Never",
    },
  ];

  const preferenceFields = [
    { key: "theme" as const, label: "Theme" },
    {
      key: "notifications" as const,
      label: "Notifications",
      formatter: (value: any) => (value ? "Enabled" : "Disabled"),
    },
    { key: "language" as const, label: "Language" },
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>User Profile</h2>
        {user.avatar && (
          <img src={user.avatar} alt="Avatar" className="profile-avatar" />
        )}
      </div>

      <div className="profile-content">
        <section className="profile-section">
          <h3>Basic Information</h3>
          {isEditing ? (
            <div className="edit-form">
              <label>
                Name:
                <input
                  type="text"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                />
              </label>
              <div className="edit-actions">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <KeyValueDisplay data={user} fields={userFields} />
          )}
        </section>

        <section className="profile-section">
          <h3>Role & Permissions</h3>
          <div className="role-info">
            <strong>Role:</strong> {user.role.name}
            <div className="permissions">
              <strong>Permissions:</strong>
              <ul>
                {user.role.permissions.map((perm: string, index: number) => (
                  <li key={index}>{perm}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h3>Preferences</h3>
          <KeyValueDisplay data={user.preferences} fields={preferenceFields} />
        </section>
      </div>
    </div>
  );
}
