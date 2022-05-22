import React from "react";
import { Route, Redirect } from "react-router-dom";

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return (
    <Route
      {...rest}
      render={(props) =>
        user !== null && role === "ROLE_ADMIN" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/forbidden" />
        )
      }
    />
  );
};

export default AdminPrivateRoute;
