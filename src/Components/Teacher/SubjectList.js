import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import { Input } from "@material-ui/core";

const SubjectList = () => {
  const [subjects, setSubject] = useState([]);
  const [q, setQ] = useState("");
  const [p, setP] = useState("");
  const [r, setR] = useState("");

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

  function searchSemester(subjects) {
    if (p === "") {
      setP("1");
    }
    return subjects.filter((subject) => subject.subjectSemester === p);
  }

  function searchBranch(subjects) {
    if (r === "") {
      setR("CE");
    }
    return subjects.filter((subject) => subject.subjectBranch === r);
  }

  return (
    <div className="container">
      <div className="py-4">
        <div class="row">
          <div class="col-sm-4">
            <b>Semester :</b>{" "}
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
          </div>
          <div class="col-sm-4">
            <b>Branch :</b>{" "}
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
              <th scope="col">Branch</th>
              <th scope="col">Semester</th>
            </tr>
          </thead>
          <tbody>
            {searchBranch(searchSemester(search(subjects))).map(
              (subject, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{subject.subjectId}</td>
                  <td>{subject.subjectName}</td>
                  <td>{subject.subjectCredit}</td>
                  <td>{subject.subjectBranch}</td>
                  <td>{subject.subjectSemester}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectList;
