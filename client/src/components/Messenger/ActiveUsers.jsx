import React from "react";
import MessageUserCard from "./MessageUserCard";
import { useSelector } from "react-redux";
import { CgSmileSad } from "react-icons/cg";
import "./style/ActiveUsers.css";

function ActiveUsers() {
  const { activeUsers } = useSelector((state) => state.users);

  return (
    <div className="box active_users">
      <header>
        <h4>Active({activeUsers?.length})</h4>
      </header>
      <div>
        {activeUsers?.length ? (
          activeUsers?.map((user) => (
            <MessageUserCard key={user?._id} user={user} activeUser />
          ))
        ) : (
          <div className="none_online">
            <p>
              None of your friend is online
              <CgSmileSad className="sad_icon" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActiveUsers;
