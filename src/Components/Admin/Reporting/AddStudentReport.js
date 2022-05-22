import React, { useState } from "react";
import axios from "axios";
//import "./color.css";
import { useHistory } from "react-router-dom";
import emailjs from "emailjs-com";

const AddStudentReport = () => {
  let history = useHistory();
  const a = localStorage.getItem("student");
  const b = localStorage.getItem("teacher");
  const c = localStorage.getItem("external");
  const [student, setStudent] = useState({
    studentId: a,
    externalId: c,
    internalId: b,
    projectDefinition: "",
    workLanguage: "",
    studentPercentage: "",
    companyResources: "",
    joinDate: "",
    endDate: "",
  });

  const {
    studentId,
    externalId,
    internalId,
    projectDefinition,
    workLanguage,
    studentPercentage,
    companyResources,
    joinDate,
    endDate,
  } = student;
  const onInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/studentreport", student, config);
    console.log(student);

    history.push("/admin/listStudentReport");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add Other Details</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="color">
            <div class="row">
              <div className="form-group" class="col-lg-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="StudentId"
                  name="studentId"
                  value={localStorage.getItem("student")}
                  disabled
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="ExternalId"
                  name="externalId"
                  value={localStorage.getItem("external")}
                  disabled
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="TeacherId"
                  name="internalId"
                  value={localStorage.getItem("teacher")}
                  disabled
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>

            <div class="row">
              <div className="form-group" class="col-lg-6">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Project Definition"
                  name="projectDefinition"
                  value={projectDefinition}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-6">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Language Used"
                  name="workLanguage"
                  value={workLanguage}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>

            <div class="row">
              <div className="form-group" class="col-lg-6">
                <div class="pl-4">Joining Date</div>
                <div>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="joinDate"
                    value={joinDate}
                    required
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="form-group" class="col-lg-6">
                <div class="pl-4">Ending Date</div>
                <div>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="endDate"
                    value={endDate}
                    required
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div className="form-group" class="col-lg-6">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Student Percentage"
                  name="studentPercentage"
                  value={studentPercentage}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-6">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Company Resources"
                  name="companyResources"
                  value={companyResources}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-block mt-5">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentReport;
