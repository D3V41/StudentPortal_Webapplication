import React from "react";
import { Route, Redirect } from "react-router-dom";

const StudentPrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return (
    <Route
      {...rest}
      render={(props) =>
        user !== null && role === "ROLE_STUDENT" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/forbidden" />
        )
      }
    />
  );
};

export default StudentPrivateRoute;
