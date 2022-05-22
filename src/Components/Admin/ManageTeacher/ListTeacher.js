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

const ListTeacher = () => {
  const [teachers, setTeacher] = useState([]);
  const [q, setQ] = useState("");
  const [showPerPage, setShowPerPage] = useState(2);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

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
  };

  function search(teachers) {
    const columns = teachers[0] && Object.keys(teachers[0]);
    return teachers.filter((teacher) =>
      columns.some(
        (column) => teacher[column].toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  const deleteTeacher = async (id) => {
    await axios.delete(`http://localhost:8080/admin/teacher/${id}`, config);
    loadTeachers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div class="row">
          <div class="col-sm-4">
            <Link
              className="btn btn-outline-primary mb-2"
              to="/admin/teachers/add"
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
        </div>

        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">TeacherId</th>
              <th scope="col">Teacher Name</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {search(teachers.slice(pagination.start, pagination.end)).map(
              (teacher, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{teacher.teacherId}</td>
                  <td>{teacher.teacherName}</td>
                  <td>{teacher.teacherEmail}</td>
                  <td>
                    <Link
                      class="btn btn-primary mr-2"
                      to={`/admin/teachers/${teacher.teacherId}`}
                    >
                      <VisibilityIcon />
                    </Link>
                    <Link
                      class="btn btn-outline-primary mr-2"
                      to={`/admin/teachers/edit/${teacher.teacherId}`}
                    >
                      <EditIcon />
                    </Link>
                    <Link
                      class="btn btn-danger"
                      onClick={() => deleteTeacher(teacher.teacherId)}
                    >
                      <DeleteIcon />
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <Pagination
          showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          total={teachers.length}
        />
      </div>
    </div>
  );
};

export default ListTeacher;
