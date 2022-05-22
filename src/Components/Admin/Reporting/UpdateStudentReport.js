import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const UpdateStudentReport = () => {
  let history = useHistory();
  const { id } = useParams();
  const [student, setStudent] = useState({
    studentId: "",
    externalId: "",
    internalId: "",
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

  useEffect(() => {
    loadStudent();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8080/admin/student/${id}`,
      student,
      config
    );
    history.push("/admin/students");
  };

  const loadStudent = async () => {
    const result = await axios.get(
      `http://localhost:8080/studentreport/${id}`,
      config
    );
    setStudent(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit User Detail</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter studentId"
              name="studentId"
              value={studentId}
              disabled
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter externalId"
              name="externalId"
              value={externalId}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter internalId"
              name="internalId"
              value={internalId}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter projectDefinition"
              name="projectDefinition"
              value={projectDefinition}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter workLanguage"
              name="workLanguage"
              value={workLanguage}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter studentPercentage"
              name="studentPercentage"
              value={studentPercentage}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter companyResources"
              name="companyResources"
              value={companyResources}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter joinDate"
              name="joinDate"
              value={joinDate}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter endDate"
              name="endDate"
              value={endDate}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <button className="btn btn-warning btn-block">
            Update User Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudentReport;
