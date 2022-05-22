import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewStudentReport = () => {
  const [state, setState] = useState([]);
  var count = 0;
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
  const { id } = useParams();

  useEffect(() => {
    loadStudent();
  }, [state]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const loadStudent = async () => {
    const res = await axios.get(
      `http://localhost:8080/studentreport/${id}`,
      config
    );
    setStudent(res.data);
    console.log(student);
    if (count != 1) {
      count++;
      setState();
    }
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/admin/listStudentReport">
        back to Home
      </Link>
      <h1 className="display-4">Student Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">externalId: {student.externalId}</li>
        <li className="list-group-item">internalId: {student.internalId}</li>
        <li className="list-group-item">
          projectDefinition: {student.projectDefinition}
        </li>
        <li className="list-group-item">
          workLanguage: {student.workLanguage}
        </li>
        <li className="list-group-item">
          studentPercentage: {student.studentPercentage}
        </li>
        <li className="list-group-item">
          companyResources: {student.companyResources}
        </li>
        <li className="list-group-item">joinDate: {student.joinDate}</li>
        <li className="list-group-item">endDate: {student.endDate}</li>
      </ul>
    </div>
  );
};

export default ViewStudentReport;
