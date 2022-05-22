import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewTeacher = () => {
  const [teacher, setTeacher] = useState({
    teacherId: "",
    teacherName: "",
    teacherEmail: "",
    teacherGender: "",
    teacherDob: "",
    teacherPhone: "",
    teacherRole: "",
    teacherWorkplace: "",
    teacherAddress: "",
  });
  const { id } = useParams();

  useEffect(() => {
    loadTeacher();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const loadTeacher = async () => {
    const res = await axios.get(
      `http://localhost:8080/admin/teacher/${id}`,
      config
    );
    setTeacher(res.data);
    console.log(id);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/admin/teachers">
        back to Home
      </Link>
      <h1 className="display-4">teacher Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Name: {teacher.teacherName}</li>
        <li className="list-group-item">Email: {teacher.teacherEmail}</li>
        <li className="list-group-item">Gender: {teacher.teacherGender}</li>
        <li className="list-group-item">Dob: {teacher.teacherDob}</li>
        <li className="list-group-item">Contact no.: {teacher.teacherPhone}</li>
        <li className="list-group-item">Address: {teacher.teacherAddress}</li>
        <li className="list-group-item">Role: {teacher.teacherRole}</li>
        <li className="list-group-item">
          Workplace: {teacher.teacherWorkplace}
        </li>
      </ul>
    </div>
  );
};

export default ViewTeacher;
