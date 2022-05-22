import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewSubject = () => {
  const [subject, setSubject] = useState({
    subjectId: "",
    subjectName: "",
    subjectCredit: "",
    subjectBranch: "",
    subjectSemester: "",
  });
  const { id } = useParams();

  useEffect(() => {
    loadSubject();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const loadSubject = async () => {
    const res = await axios.get(
      `http://localhost:8080/admin/subject/${id}`,
      config
    );
    setSubject(res.data);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/admin/subjects">
        back to Home
      </Link>
      <h1 className="display-4">subject Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Name: {subject.subjectName}</li>
        <li className="list-group-item">Credit: {subject.subjectCredit}</li>
        <li className="list-group-item">Branch: {subject.subjectBranch}</li>
        <li className="list-group-item">Semester: {subject.subjectSemester}</li>
      </ul>
    </div>
  );
};

export default ViewSubject;
