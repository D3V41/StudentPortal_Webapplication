import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import Toast from "react-bootstrap/Toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function Login() {
  let history = useHistory();
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);
  const popupToast = () => {
    setToast(true);
    setTimeout(function () {
      setToast(false);
    }, 3000);
  };

  const cancleToast = () => setToast(false);
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:8080/api/auth/signin", data)
      .then((res) => {
        localStorage.setItem("token", res.data.jwttoken);
        localStorage.setItem("id", res.data.username);
        localStorage.setItem("role", res.data.role);
        // history.push(`/results/${result.studentId}`);
      })
      .catch((err) => {
        setMessage("Bad credentials");
        popupToast();
      });

    if (localStorage.getItem("role") == "ROLE_ADMIN") {
      history.push(`/admin`);
    } else if (
      localStorage.getItem("role") == "ROLE_TEACHER" &&
      localStorage.getItem("id").charAt(0) === "T"
    ) {
      history.push(`/teacher`);
    } else if (localStorage.getItem("role") == "ROLE_STUDENT") {
      history.push(`/student`);
    } else if (
      localStorage.getItem("role") == "ROLE_TEACHER" &&
      localStorage.getItem("id").charAt(0) === "E"
    ) {
      history.push(`/company`);
    }
    console.log(JSON.stringify(data, null, 4));
  };

  return (
    <div class="container">
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          top: "25vh",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "29vw",
            right: 0,
            alignItems: "center",
          }}
        >
          <Toast
            show={toast}
            style={{
              backgroundColor: "#FF9494",
            }}
            onClose={cancleToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="mr-auto">
                <MoodBadIcon />
                Unauthorized
              </strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </div>
      </div>
      <div className="m-3 w-50 mx-auto mt-5 shadow p-5">
        <div class="text-center">
          <img
            class="mb-5 "
            src={"mortarboard (1).png"}
            alt=""
            width="100"
            height="100"
          />
        </div>

        <h1 class="h3 mb-3 text-center font-weight-normal">Please Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
          <div className="form-row">
            <div className="form-group col">
              <input
                name="username"
                type="text"
                placeholder="User Id"
                ref={register}
                className={`form-control form-control-lg mb-2 ${
                  errors.username ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <input
                name="password"
                type="password"
                placeholder="Password"
                ref={register}
                className={`form-control form-control-lg mb-2 ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
          </div>

          <div className="form-group">
            <button class="btn btn-lg btn-primary btn-block" type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
