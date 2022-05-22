import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./color.css";
import { useHistory } from "react-router-dom";
import emailjs from "emailjs-com";

toast.configure();
const AddStudent = () => {
  let history = useHistory();
  const [student, setStudent] = useState({
    studentId: "",
    studentName: "",
    studentEmail: "",
    studentGender: "",
    studentDob: "",
    studentPhone: "",
    studentAddress: "",
    studentNumber: "",
    studentClass: "",
    studentBranch: "CE",
  });

  const {
    studentId,
    studentName,
    studentEmail,
    studentGender,
    studentDob,
    studentPhone,
    studentAddress,
    studentNumber,
    studentClass,
    studentBranch,
  } = student;
  const onInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadStudentID();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  function notify() {
    toast.success("Successfully added " + student.studentId, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 4000,
    });
    history.push("/admin/students");
  }

  const loadStudentID = async () => {
    const result = await axios.get(
      `http://localhost:8080/admin/student/generateId`,
      config
    );

    setStudent({ ...student, studentId: result.data });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/admin/student", student, config);
    console.log(student);

    emailjs
      .sendForm(
        "service_xfocrr4",
        "template_x9xdds9",
        e.target,
        "user_CrnRVdqzhS1yw1fuIApMy"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    notify();
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Student</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="color">
            <div class="row">
              <div className="form-group" class="col-lg-6">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="StudentId"
                  name="studentId"
                  disabled
                  value={studentId}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-6">
                <div class="border form-check form-check-inline form-control form-control-lg col-lg-3 pl-2">
                  Branch
                </div>
                <div class="form-check form-check-inline col-lg-3">
                  <select
                    className="custom-select ml-4"
                    name="studentBranch"
                    style={{ width: 75 }}
                    value={studentBranch}
                    onChange={(e) => onInputChange(e)}
                  >
                    <option name="CE" value="CE">
                      {" "}
                      CE
                    </option>
                    <option name="IT" value="IT">
                      IT
                    </option>
                    <option name="EC" value="EC">
                      {" "}
                      EC
                    </option>
                    <option name="MH" value="MH">
                      MH
                    </option>
                    <option name="IC" value="IC">
                      IC
                    </option>
                    <option name="CH" value="CH">
                      CH
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <div className="form-group" class="col-lg-6">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="StudentName"
                  name="studentName"
                  value={studentName}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-6">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="E-mail Address"
                  name="studentEmail"
                  value={studentEmail}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>

            <div class="row">
              <div className="form-group" class="col-lg-6">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  placeholder="Select DOB"
                  name="studentDob"
                  value={studentDob}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-6">
                <div class="border form-check form-check-inline form-control form-control-lg col-lg-2 pl-2">
                  Gender
                </div>
                <label class="ml-4">
                  <input
                    class="mr-2"
                    type="radio"
                    name="studentGender"
                    value="Male"
                    onChange={(e) => onInputChange(e)}
                  />
                  Male
                </label>
                <label class="ml-3">
                  <input
                    class="mr-2"
                    type="radio"
                    name="studentGender"
                    value="Female"
                    onChange={(e) => onInputChange(e)}
                  />
                  Female
                </label>
              </div>
            </div>

            <div class="row">
              <div className="form-group" class="col-lg-6">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Contact No."
                  name="studentPhone"
                  value={studentPhone}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-3">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Roll No"
                  name="studentNumber"
                  value={studentNumber}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-3">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Class Name"
                  name="studentClass"
                  value={studentClass}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div class="row">
              <div className="form-group" class="col-lg-12">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Address"
                  name="studentAddress"
                  value={studentAddress}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-block mt-5">
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
