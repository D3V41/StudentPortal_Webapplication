import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SearchIcon from "@material-ui/icons/Search";
import { Input } from "@material-ui/core";

const SubjectList = () => {
  const [subjects, setSubject] = useState([]);
  const [student, setStudent] = useState([]);
  const [p, setP] = useState("");

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
    const result2 = await axios.get(
      `http://localhost:8080/admin/student/${localStorage.getItem("id")}`,
      config
    );
    console.log(result);
    setSubject(result.data);
    setStudent(result2.data);
  };

  function searchSemester(subjects) {
    if (p === "") {
      setP("1");
    }
    return subjects.filter((subject) => subject.subjectSemester === p);
  }

  function searchBranch(subjects) {
    return subjects.filter(
      (subject) => subject.subjectBranch === student.studentBranch
    );
  }

  return (
    <div className="container">
      <div className="py-4">
        <h4>
          Semester :{" "}
          <select
            className="custom-select"
            style={{ width: 75 }}
            value={p}
            onChange={(e) => setP(e.target.value)}
          >
            <option name="1"> 1</option>
            <option name="2">2</option>
            <option name="3"> 3</option>
            <option name="4">4</option>
            <option name="5">5</option>
            <option name="6">6</option>
            <option name="7">7</option>
            <option name="8">8</option>
          </select>
        </h4>

        <table class="table border shadow mt-2">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">SubjectId</th>
              <th scope="col">Subject Name</th>
              <th scope="col">Subject Credit</th>
              <th scope="col">Semester</th>
              <th>Materials</th>
            </tr>
          </thead>
          <tbody>
            {searchSemester(searchBranch(subjects)).map((subject, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{subject.subjectId}</td>
                <td>{subject.subjectName}</td>
                <td>{subject.subjectCredit}</td>
                <td>{subject.subjectSemester}</td>
                <td>
                  <Link
                    class="btn btn-primary mr-2"
                    to={`/student/materials/${subject.subjectId}`}
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

export default SubjectList;
