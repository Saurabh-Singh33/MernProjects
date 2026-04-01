import { type ProfileProps, type BaseUser } from "./types";

// Generic UserProfile component
const UserProfile = <T extends BaseUser>({
  data,
  onUpdate,
  onDelete,
}: ProfileProps<T>) => {
  const { user, isLoading, error } = data;

  if (isLoading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const roleClass =
    {
      admin: "role-badge role-admin",
      user: "role-badge role-user",
      moderator: "role-badge role-moderator",
    }[user.role] || "role-badge";

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {/* Conditionally render additional fields if they exist */}
        {user.avatar && <img src={user.avatar} alt={`${user.name}'s avatar`} />}
        {user.bio && (
          <p>
            <strong>Bio:</strong> {user.bio}
          </p>
        )}
        {user.role && (
          <p className="role-line">
            <span className={roleClass}>{user.role.toUpperCase()}</span>
            {user.role === "admin" && " (management access)"}
            {user.role === "user" && " (standard access)"}
          </p>
        )}
      </div>
      <div className="profile-actions">
        {onUpdate && <button onClick={() => onUpdate(user)}>Update</button>}
        {onDelete && <button onClick={() => onDelete(user.id)}>Delete</button>}
      </div>
    </div>
  );
};

export default UserProfile;
