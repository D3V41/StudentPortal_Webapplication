import React from "react";
import { Route, Redirect } from "react-router-dom";

const TeacherPrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return (
    <Route
      {...rest}
      render={(props) =>
        user !== null && role === "ROLE_TEACHER" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/forbidden" />
        )
      }
    />
  );
};

export default TeacherPrivateRoute;
