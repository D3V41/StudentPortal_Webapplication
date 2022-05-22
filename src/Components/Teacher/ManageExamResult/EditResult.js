import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditResult = () => {
  let history = useHistory();
  const { id } = useParams();
  const [result, setResult] = useState({
    studentId: "",
    subjectId: "",
    examType: "",
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

  useEffect(() => {
    loadResult();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult({ ...result, examId: { id } });
    console.log(result);
    await axios.put(`http://localhost:8080/exam`, result, config);
    history.push(`/teacher/results/${result.studentId}`);
  };

  const loadResult = async () => {
    const result = await axios.get(
      `http://localhost:8080/exam/result/${id}`,
      config
    );
    setResult(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A Result</h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter StudentId"
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
              placeholder="Enter SubjectId"
              name="subjectId"
              value={subjectId}
              disabled
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter examType"
              name="examType"
              value={examType}
              disabled
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              placeholder="Enter examType"
              name="examDate"
              value={examDate}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter InternalExam Mark"
              name="examInternalMark"
              value={examInternalMark}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter ExternalExam Mark"
              name="examExternalMark"
              value={examExternalMark}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter attendance"
              name="attendance"
              value={attendance}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update Result</button>
        </form>
      </div>
    </div>
  );
};

export default EditResult;
