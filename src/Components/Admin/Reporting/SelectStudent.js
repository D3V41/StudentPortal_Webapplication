import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Input } from "@material-ui/core";

const SelectStudent = () => {
  const [students, setStudent] = useState([]);
  const [q, setQ] = useState("");
  const [r, setR] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const loadStudents = async () => {
    const result = await axios.get(
      "http://localhost:8080/admin/student",
      config
    );
    console.log(result);
    setStudent(result.data);
    localStorage.setItem("student", "");
  };

  function search(students) {
    const columns = students[0] && Object.keys(students[0]);
    return students.filter((student) =>
      columns.some(
        (column) => student[column].toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  function searchBranch(students) {
    if (r === "") {
      setR("CE");
    }
    return students.filter((student) => student.studentBranch === r);
  }

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:8080/admin/student/${id}`, config);
    loadStudents();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          <div
            class="col-sm-4"
            style={{ fontSize: "1.5em", fontWeight: "bold" }}
          >
            Select from students
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

          <div class="col-sm-4">
            Branch :{" "}
            <select
              className="custom-select"
              style={{ width: 75 }}
              value={r}
              onChange={(e) => setR(e.target.value)}
            >
              <option name="CE">CE</option>
              <option name="IT">IT</option>
              <option name="MH">MH</option>
              <option name="EC">EC</option>
              <option name="IC">IC</option>
            </select>
          </div>
        </div>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">StudentId</th>
              <th scope="col">Student Name</th>
              <th scope="col">Email</th>
              <th scope="col">Branch</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchBranch(search(students)).map((student, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{student.studentId}</td>
                <td>{student.studentName}</td>
                <td>{student.studentEmail}</td>
                <td>{student.studentBranch}</td>
                <td>
                  <Link
                    class="btn btn-disabled mr-2"
                    to={`/admin/selectTeacher`}
                    onClick={() => {
                      localStorage.setItem("student", student.studentId);
                    }}
                  >
                    <AddCircleIcon color="secondary" />
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

export default SelectStudent;
