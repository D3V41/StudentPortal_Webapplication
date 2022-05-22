import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import { Input } from "@material-ui/core";

const ListStudent = () => {
  const [students, setStudent] = useState([]);
  const [q, setQ] = useState("");
  const [r, setR] = useState("");
  const [showPerPage, setShowPerPage] = useState(2);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {}, [r]);

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

  function searchBranch1(students) {
    if (r === "") {
      setR("CE");
    }
    console.log(r);
    return students.filter((student) => student.studentBranch === r);
  }

  function searchBranch(students) {
    if (r === "") {
      setR("CE");
    }
    console.log(r);
    return students
      .filter((student) => student.studentBranch === r)
      .slice(pagination.start, pagination.end);
  }

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:8080/admin/student/${id}`, config);
    loadStudents();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          <div class="col-sm-4">
            <Link
              className="btn btn-outline-primary mb-2"
              to="/admin/students/add"
            >
              <PersonAddIcon />
            </Link>
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
                <td>
                  <Link
                    class="btn btn-primary mr-2"
                    to={`/admin/students/${student.studentId}`}
                  >
                    <VisibilityIcon />
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/admin/students/edit/${student.studentId}`}
                  >
                    <EditIcon />
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteStudent(student.studentId)}
                  >
                    <DeleteIcon />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          total={searchBranch1(students).length}
        />
      </div>
    </div>
  );
};

export default ListStudent;
