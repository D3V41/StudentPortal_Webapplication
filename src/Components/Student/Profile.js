import React, { useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";

const StudentProfile = () => {
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
  //   const { id } = localStorage.getItem("id");

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
      `http://localhost:8080/admin/student/${localStorage.getItem("id")}`,
      config
    );
    setStudent(res.data);
    // console.log(res.data);
  };
  return (
    <div className="container py-4">
      <h1 className="display-5">Your Id: {localStorage.getItem("id")}</h1>
      <hr />
      <div class="row">
        <div class="col-md-4 profile">Name:</div>
        <div class="col-md-6 profile">{student.studentName}</div>
      </div>
      <div class="row">
        <div class="col-md-4 profile">Email:</div>
        <div class="col-md-6 profile">{student.studentEmail}</div>
      </div>
      <div class="row">
        <div class="col-md-4 profile">Gender:</div>
        <div class="col-md-6 profile">{student.studentGender}</div>
      </div>
      <div class="row">
        <div class="col-md-4 profile">Dob:</div>
        <div class="col-md-6 profile">{student.studentDob}</div>
      </div>
      <div class="row">
        <div class="col-md-4 profile">Contact no.:</div>
        <div class="col-md-6 profile">{student.studentPhone}</div>
      </div>
      <div class="row">
        <div class="col-md-4 profile">Address:</div>
        <div class="col-md-6 profile">{student.studentAddress}</div>
      </div>
      <div class="row">
        <div class="col-md-4 profile">Roll No:</div>
        <div class="col-md-6 profile">{student.studentNumber}</div>
      </div>
      <div class="row">
        <div class="col-md-4 profile">Class:</div>
        <div class="col-md-6 profile">{student.studentClass}</div>
      </div>
      <div class="row">
        <div class="col-md-4 profile">Branch:</div>
        <div class="col-md-6 profile">{student.studentBranch}</div>
      </div>
    </div>
  );
};

export default StudentProfile;
