// import React from 'react';
import React, { useEffect, useState } from "react";
import OrganizationTree from "./Orgtree";
import UserList from "./ListUsers";
import Header from "./Header";
// import SampleTree from "./Sample";

const Home = () => {
  const [user, setUser] = useState(null);

  // Callback function to update the user state in the Home component
  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div>
      <Header onUserUpdate={handleUserUpdate} />
      {/* Main Content */}
      <div>
        <div>
          {user ? (
            <>
              {/* <SampleTree/> */}
              <div className="text-center">
                <h3 className="p-2">Welcome to Helping Hands</h3>
                <h4>
                  <span style={{ color: "#ea5b3a" }} className="">
                    {user.name}
                  </span>
                </h4>
                <p className="">Join the movement: Do help, get help.</p>
              </div>

              <OrganizationTree />
              <div>
                {user.parentId == "root" ? (
                  <>
                    <UserList />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <p>No user logged in. Please login first.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
