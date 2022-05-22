import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewStudent = () => {
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
  const { id } = useParams();

  useEffect(() => {
    loadStudent();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const loadStudent = async () => {
    const res = await axios.get(
      `http://localhost:8080/admin/student/${id}`,
      config
    );
    setStudent(res.data);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/admin/students">
        back to Home
      </Link>
      <h1 className="display-4">Student Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Name: {student.studentName}</li>
        <li className="list-group-item">Email: {student.studentEmail}</li>
        <li className="list-group-item">Gender: {student.studentGender}</li>
        <li className="list-group-item">Dob: {student.studentDob}</li>
        <li className="list-group-item">Contact no.: {student.studentPhone}</li>
        <li className="list-group-item">Address: {student.studentAddress}</li>
        <li className="list-group-item">Roll No.: {student.studentNumber}</li>
        <li className="list-group-item">Class: {student.studentClass}</li>
        <li className="list-group-item">Branch: {student.studentBranch}</li>
      </ul>
    </div>
  );
};

export default ViewStudent;
