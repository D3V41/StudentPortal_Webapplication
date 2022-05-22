import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditSubject = () => {
  let history = useHistory();
  const { id } = useParams();
  const [subject, setSubject] = useState({
    subjectId: "",
    subjectName: "",
    subjectCredit: "",
    subjectBranch: "",
    subjectSemester: "",
  });

  const {
    subjectId,
    subjectName,
    subjectCredit,
    subjectBranch,
    subjectSemester,
  } = subject;

  const onInputChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadSubject();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8080/admin/subject/${id}`,
      subject,
      config
    );
    history.push("/admin/subjects");
  };

  const loadSubject = async () => {
    const result = await axios.get(
      `http://localhost:8080/admin/subject/${id}`,
      config
    );
    setSubject(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A Subject</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter subjectId"
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
              placeholder="Enter subjectName"
              name="subjectName"
              value={subjectName}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Subject Credit"
              name="subjectCredit"
              value={subjectCredit}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Subject Branch"
              name="subjectBranch"
              value={subjectBranch}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Semester"
              name="subjectSemester"
              value={subjectSemester}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update Subject</button>
        </form>
      </div>
    </div>
  );
};

export default EditSubject;
