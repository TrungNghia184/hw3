import React, { useState, useEffect } from "react";

export default function UserInfo(userData) {
  return (
    <div className="user">
      <img
        className="user__avatar"
        src={userData?.userData?.avatar_url}
        alt="Avatar"
      />
      <div className="user__info">
        <p>Name: {userData?.userData?.login}</p>
        <hr />
        <p>Roll: {userData?.userData?.type}</p>
        <hr />
        <p>
          Email:{" "}
          {userData?.userData?.email !== null
            ? `${userData?.userData?.email}`
            : "none"}
        </p>
        <hr />
        <p>
          Company:{" "}
          {userData?.userData?.company !== null
            ? `${userData?.userData?.company}`
            : "none"}
        </p>
        <hr />
        <p>Number of follower: {userData?.userData?.followers}</p>
      </div>
    </div>
  );
}

