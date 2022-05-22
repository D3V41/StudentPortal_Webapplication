import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AssessmentIcon from "@material-ui/icons/Assessment";

const SelectStudent = () => {
  const [state, setState] = useState([]);
  var count = 0;
  const [reports, setReport] = useState([]);

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
      `http://localhost:8080/studentreport/teacher/${localStorage.getItem(
        "id"
      )}`,
      config
    );
    const result2 = await axios.get(
      `http://localhost:8080/admin/teacher`,
      config
    );
    const result3 = await axios.get(
      `http://localhost:8080/admin/student`,
      config
    );

    var results = append(result.data, result2.data);

    var final = addStudentName(results, result3.data);

    setReport(final);
    console.log(results);

    if (count != 1) {
      count++;
      setState();
    }
  };

  function addStudentName(input, students) {
    for (var j = 0; j < students.length; j++) {
      input.forEach((element) => {
        if (element.studentId == students[j].studentId) {
          element["studentName"] = students[j].studentName;
        }
      });
    }
    return input;
  }
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

  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          <div
            class="col-sm-4"
            style={{ fontSize: "1.5em", fontWeight: "bold" }}
          >
            Select Student
          </div>

          <div class="col-sm-4"></div>
        </div>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">StudentId</th>
              <th scope="col">Student Name</th>
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
                <td>{report.studentName}</td>
                <td>{report.externalName}</td>
                <td>{report.projectDefinition}</td>
                <td>{report.company}</td>
                <td>
                  <Link
                    class="btn btn-primary mr-2"
                    to={`/teacher/listReport/${report.studentId}`}
                  >
                    <AssessmentIcon />
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
