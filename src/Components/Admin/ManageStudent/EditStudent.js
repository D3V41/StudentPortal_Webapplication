import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditStudent = () => {
  let history = useHistory();
  const { id } = useParams();
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
    studentBranch: "",
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
      `http://localhost:8080/admin/student/${id}`,
      config
    );
    setStudent(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
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
              placeholder="Enter studentName"
              name="studentName"
              value={studentName}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter E-mail Address"
              name="studentEmail"
              value={studentEmail}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group" class="col-lg-6">
            <div class="form-check form-check-inline col-lg-2">Gender</div>
            <label>
              <input
                class="mr-2"
                type="radio"
                name="studentGender"
                value="Male"
                checked={studentGender === "Male"}
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
                checked={studentGender === "Female"}
                onChange={(e) => onInputChange(e)}
              />
              Female
            </label>
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter DOB"
              name="studentDob"
              value={studentDob}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Contact No."
              name="studentPhone"
              value={studentPhone}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Roll No"
              name="studentNumber"
              value={studentNumber}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Class Name"
              name="studentClass"
              value={studentClass}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Branch Name"
              name="studentBranch"
              value={studentBranch}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
