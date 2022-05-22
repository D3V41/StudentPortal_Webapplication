import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchIcon from "@material-ui/icons/Search";
import { Input } from "@material-ui/core";

const ListStudent = () => {
  const [students, setStudent] = useState([]);
  const [q, setQ] = useState("");

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
  };

  function search(students) {
    const columns = students[0] && Object.keys(students[0]);
    return students.filter((student) =>
      columns.some(
        (column) => student[column].toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          <div
            class="col-sm-4"
            style={{ fontSize: "1.5em", fontWeight: "bold" }}
          >
            List of students
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
              <th scope="col">StudentId</th>
              <th scope="col">Student Name</th>
              <th scope="col">Email</th>
              <th scope="col">Branch</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {search(students).map((student, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{student.studentId}</td>
                <td>{student.studentName}</td>
                <td>{student.studentEmail}</td>
                <td>{student.studentBranch}</td>
                <td>
                  <Link
                    class="btn btn-primary mr-2"
                    to={`/teacher/results/${student.studentId}`}
                  >
                    <VisibilityIcon />
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

export default ListStudent;
