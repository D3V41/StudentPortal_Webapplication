import React from "react";
import { Route, Redirect } from "react-router-dom";

const CompanyPrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  return (
    <Route
      {...rest}
      render={(props) =>
        user !== null && role === "ROLE_TEACHER" && id.charAt(0) === "E" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/forbidden" />
        )
      }
    />
  );
};

export default CompanyPrivateRoute;
