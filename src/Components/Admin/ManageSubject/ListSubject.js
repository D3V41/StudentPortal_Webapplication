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

const ListSubject = () => {
  const [subjects, setSubject] = useState([]);
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
    loadSubjects();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const loadSubjects = async () => {
    const result = await axios.get(
      "http://localhost:8080/admin/subject",
      config
    );
    console.log(result);
    setSubject(result.data);
  };

  function search(subjects) {
    const columns = subjects[0] && Object.keys(subjects[0]);
    return subjects.filter((subject) =>
      columns.some(
        (column) => subject[column].toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  const deleteSubject = async (id) => {
    await axios.delete(`http://localhost:8080/admin/subject/${id}`, config);
    loadSubjects();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div class="row">
          <div class="col-sm-4">
            <Link
              className="btn btn-outline-primary mb-2"
              to="/admin/subjects/add"
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
              <th scope="col">SubjectId</th>
              <th scope="col">Subject Name</th>
              <th scope="col">Subject Credit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {search(subjects.slice(pagination.start, pagination.end)).map(
              (subject, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{subject.subjectId}</td>
                  <td>{subject.subjectName}</td>
                  <td>{subject.subjectCredit}</td>
                  <td>
                    <Link
                      class="btn btn-primary mr-2"
                      to={`/admin/subjects/${subject.subjectId}`}
                    >
                      <VisibilityIcon />
                    </Link>
                    <Link
                      class="btn btn-outline-primary mr-2"
                      to={`/admin/subjects/edit/${subject.subjectId}`}
                    >
                      <EditIcon />
                    </Link>
                    <Link
                      class="btn btn-danger"
                      onClick={() => deleteSubject(subject.subjectId)}
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
          total={subjects.length}
        />
      </div>
    </div>
  );
};

export default ListSubject;
