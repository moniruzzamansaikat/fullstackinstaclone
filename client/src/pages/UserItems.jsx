import React from "react";
import MainLayout from "../components/Layouts/MainLayout";
import UserCard from "../components/Shared/UserCard";

function UserItems({ users }) {
  if (!users) return null;

  return (
    <MainLayout>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        {users.length ? (
          users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div style={{ padding: "10px", backgroundColor: "#fff" }}>
            <h2>No data to show</h2>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default UserItems;
