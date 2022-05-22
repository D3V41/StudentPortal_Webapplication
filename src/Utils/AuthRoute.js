import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  function checkAuthentication() {
    if (role === "ROLE_ADMIN") {
      return <Redirect to="/admin" />;
    }
    if (role === "ROLE_TEACHER") {
      return <Redirect to="/teacher" />;
    }
    if (role === "ROLE_STUDENT") {
      return <Redirect to="/student" />;
    } else {
      return <Redirect to="/login" />;
    }
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user === null && role === null ? (
          <Component {...props} />
        ) : (
          checkAuthentication()
        )
      }
    />
  );
};

export default AuthRoute;
