import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const ListStudentReport = () => {
  const [state, setState] = useState([]);
  var count = 0;
  const [reports, setReport] = useState([]);
  const [teachers, setTeacher] = useState([]);
  const [q, setQ] = useState("");
  const [r, setR] = useState("");

  useEffect(() => {
    loadStudents();
  }, [state]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const loadStudents = async () => {
    const result = await axios.get(
      "http://localhost:8080/studentreport",
      config
    );
    const result2 = await axios.get(
      `http://localhost:8080/admin/teacher`,
      config
    );

    setTeacher(result2.data);

    var results = append(result.data, teachers);
    setReport(results);
    console.log(reports);

    if (count != 1) {
      count++;
      setState();
    }
  };

  function append(input, teachers) {
    for (var j = 0; j < teachers.length; j++) {
      //console.log(subjects[j].subjectId);
      input.forEach((element) => {
        if (element.internalId == teachers[j].teacherId) {
          //console.log(element.subjectId);
          element["internalName"] = teachers[j].teacherName;
        }
        if (element.externalId == teachers[j].teacherId) {
          //console.log(element.subjectId);
          element["externalName"] = teachers[j].teacherName;
          element["company"] = teachers[j].teacherWorkplace;
        }
      });
    }
    return input;
  }

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:8080/studentreport/${id}`, config);
    loadStudents();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          <div class="col-sm-4">
            <Link
              className="btn btn-outline-primary mb-2"
              to="/admin/selectStudent"
            >
              <PersonAddIcon />
            </Link>
          </div>

          <div
            class="col-sm-4"
            style={{ fontSize: "1.5em", fontWeight: "bold" }}
          >
            List of All Reports
          </div>
        </div>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">StudentId</th>
              <th scope="col">Internal Guide</th>
              <th scope="col">External Guide</th>
              <th scope="col">Project Name</th>
              <th scope="col">Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{report.studentId}</td>
                <td>{report.internalName}</td>
                <td>{report.externalName}</td>
                <td>{report.projectDefinition}</td>
                <td>{report.company}</td>
                <td>
                  <Link
                    class="btn btn-primary mr-2"
                    to={`/admin/viewStudentReport/${report.studentId}`}
                  >
                    <VisibilityIcon />
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/admin/updateStudentReport/${report.studentId}`}
                  >
                    <EditIcon />
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteStudent(report.studentId)}
                  >
                    <DeleteIcon />
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

export default ListStudentReport;
