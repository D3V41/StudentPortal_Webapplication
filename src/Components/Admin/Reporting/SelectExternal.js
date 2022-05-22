import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";
import SearchIcon from "@material-ui/icons/Search";
import { Input } from "@material-ui/core";

const SelectExternal = () => {
  const [teachers, setTeacher] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    loadTeachers();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const loadTeachers = async () => {
    const result = await axios.get(
      "http://localhost:8080/admin/teacher",
      config
    );
    console.log(result);
    setTeacher(result.data);
    localStorage.setItem("external", "");
  };

  function search(teachers) {
    const columns = teachers[0] && Object.keys(teachers[0]);
    return teachers.filter((teacher) =>
      columns.some(
        (column) => teacher[column].toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  function filter(teachers) {
    return teachers.filter(
      (teacher) => teacher.teacherRole == "External Guide"
    );
  }

  return (
    <div className="container">
      <div className="py-4">
        <div class="row">
          <div
            class="col-sm-4"
            style={{ fontSize: "1.5em", fontWeight: "bold" }}
          >
            Select External Guide
          </div>
          <div class="col-sm-4">
            <SearchIcon />
            <Input
              type="text"
              placeholder="Search..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">TeacherId</th>
              <th scope="col">Teacher Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filter(search(teachers)).map((teacher, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{teacher.teacherId}</td>
                <td>{teacher.teacherName}</td>
                <td>{teacher.teacherEmail}</td>
                <td>{teacher.teacherRole}</td>
                <td>
                  <Link
                    class="btn btn-secondary mr-2"
                    to={`/admin/addStudentReport`}
                    onClick={() => {
                      localStorage.setItem("external", teacher.teacherId);
                    }}
                  >
                    <AssistantPhotoIcon />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectExternal;
