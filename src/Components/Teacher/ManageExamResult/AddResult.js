import React, { useState } from "react";
import axios from "axios";
import "./color.css";
import { useHistory } from "react-router-dom";

const AddResult = () => {
  let history = useHistory();
  const [studentName, setStudentName] = useState("");
  const [result, setResult] = useState({
    studentId: "",
    subjectId: "",
    examType: "Nor",
    examDate: "",
    examInternalMark: "",
    examExternalMark: "",
    attendance: "",
  });

  const {
    studentId,
    subjectId,
    examType,
    examDate,
    examInternalMark,
    examExternalMark,
    attendance,
  } = result;
  const onInputChange = (e) => {
    setResult({ ...result, [e.target.name]: e.target.value });
  };

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const addname = async () => {
    const res = await axios.get(
      `http://localhost:8080/admin/student/${studentId}`,
      config
    );
    setStudentName(res.data.studentName);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/exam", result, config);
    console.log(result);
    history.push(`/teacher/results/${result.studentId}`);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Result</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="color">
            <div class="row">
              <div className="form-group" class="col-lg-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter StudentId"
                  name="studentId"
                  value={studentId}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-4">
                <input
                  type="text"
                  disabled
                  className="form-control form-control-lg"
                  placeholder="Student Name"
                  name="studentName"
                  value={studentName}
                />
              </div>
              <div className="form-group" class="col-lg-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter SubjectId"
                  name="subjectId"
                  value={subjectId}
                  required
                  onSelect={() => addname()}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>

            <div class="row">
              <div className="form-group" class="col-lg-6">
                <div class="border form-check form-check-inline form-control form-control-lg col-lg-3 pl-2">
                  ExamType
                </div>
                <div class="form-check form-check-inline col-lg-3">
                  <select
                    className="custom-select ml-4"
                    name="examType"
                    style={{ width: 100 }}
                    value={examType}
                    onChange={(e) => onInputChange(e)}
                  >
                    <option name="Normal" value="Nor">
                      {" "}
                      Normal
                    </option>
                    <option name="Rem" value="Rem">
                      Rem
                    </option>
                    <option name="Rerem" value="Rerem">
                      {" "}
                      Rerem
                    </option>
                  </select>
                </div>
              </div>
              <div className="form-group" class="col-lg-6">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="examDate"
                  value={examDate}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>

            <div class="row">
              <div className="form-group" class="col-lg-4">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="InternalExam Mark"
                  name="examInternalMark"
                  value={examInternalMark}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-4">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="ExternalExam Mark"
                  name="examExternalMark"
                  value={examExternalMark}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-4">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Attendance"
                  name="attendance"
                  value={attendance}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-block mt-5">Add Result</button>
        </form>
      </div>
    </div>
  );
};

export default AddResult;
