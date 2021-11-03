import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivatePage({ children, ...rest }) {
  const { user, fetchingUser } = useSelector((state) => state.auth);

  console.log(fetchingUser);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivatePage;
