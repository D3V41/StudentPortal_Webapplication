import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AssessmentIcon from "@material-ui/icons/Assessment";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import PersonIcon from "@material-ui/icons/Person";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const Profile = () => {
  const [teacher, setTeacher] = useState({
    teacherId: "",
    teacherName: "",
    teacherEmail: "",
    teacherGender: "",
    teacherDob: "",
    teacherPhone: "",
    teacherAddress: "",
  });
  //   const { id } = localStorage.getItem("id");

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
      `http://localhost:8080/admin/teacher/${localStorage.getItem("id")}`,
      config
    );
    setTeacher(res.data);
    // console.log(res.data);
  };
  return (
    <div className="container py-4">
      <h1 className="display-5">Your Id: {localStorage.getItem("id")}</h1>
      <hr />
      <div class="row">
        <div class="col-md-4 profile">Name:</div>
        <div class="col-md-6 profile">{teacher.teacherName}</div>
      </div>
      <div class="row">
        <div class="col-md-4 profile">Email:</div>
        <div class="col-md-6 profile">{teacher.teacherEmail}</div>
      </div>
      <div class="row">
        <div class="col-md-4 profile">Gender:</div>
        <div class="col-md-6 profile">{teacher.teacherGender}</div>
      </div>
      <div class="row">
        <div class="col-md-4 profile">Dob:</div>
        <div class="col-md-6 profile">{teacher.teacherDob}</div>
      </div>
      <div class="row">
        <div class="col-md-4 profile">Contact no.:</div>
        <div class="col-md-6 profile">{teacher.teacherPhone}</div>
      </div>
      <div class="row">
        <div class="col-md-4 profile">Address:</div>
        <div class="col-md-6 profile">{teacher.teacherAddress}</div>
      </div>
    </div>
  );
};

export default Profile;
