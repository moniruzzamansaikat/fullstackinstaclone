import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivatePage({ children, ...rest }) {
  const { user } = useSelector((state) => state.auth);

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
