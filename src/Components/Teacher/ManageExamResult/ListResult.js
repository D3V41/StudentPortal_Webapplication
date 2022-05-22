import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, NavLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Toast from "react-bootstrap/Toast";
// import logo from "../../../../public/mortarboard (1).png";

const ListResult = () => {
  const [state, setState] = useState([]);
  var count = 0;
  const [results, setResult] = useState([]);
  const [students, setStudent] = useState([]);
  const [subjects, setSubject] = useState([]);
  const [toast, setToast] = useState(false);
  const [q, setQ] = useState("");
  const [message, setMessage] = useState("");

  //subjects.subjectName => subjects.subjectId == results.subjectId
  const { id } = useParams();

  const popupToast = () => {
    setToast(true);
    setTimeout(function () {
      setToast(false);
    }, 3000);
  };

  const cancleToast = () => setToast(false);

  useEffect(() => {
    loadResults();
  }, [state]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const loadResults = async () => {
    const result = await axios.get(`http://localhost:8080/exam/${id}`, config);
    const result2 = await axios.get(
      `http://localhost:8080/admin/student/${id}`,
      config
    );
    const result3 = await axios.get(
      `http://localhost:8080/admin/subject`,
      config
    );

    //setResult(result.data);
    setStudent(result2.data);
    setSubject(result3.data);
    var input = result.data;
    //console.log(input);
    var results = append(input, subjects);
    //console.log(results);
    setResult(results);

    if (count != 1) {
      count++;
      setState();
    }
  };

  function searchNor(results) {
    return results.filter((result) => result.examType === "Nor");
  }

  function searchRem(results) {
    return results.filter((result) => result.examType === "Rem");
  }

  function searchRerem(results) {
    return results.filter((result) => result.examType === "Rerem");
  }

  function searchSemester(results) {
    if (q === "") {
      setQ("1");
    }
    return results.filter((result) => result.subjectSemester === q);
  }

  function append(input, subjects) {
    for (var j = 0; j < subjects.length; j++) {
      //console.log(subjects[j].subjectId);
      input.forEach((element) => {
        if (element.subjectId == subjects[j].subjectId) {
          //console.log(element.subjectId);
          element["subjectName"] = subjects[j].subjectName;
          element["subjectSemester"] = subjects[j].subjectSemester;
        }
      });

      // if(input[i].subjectId == subjects[j].subjectId)
      // {
      //   //input[i].subjectName = subjects[j].subjectName;
      //   console.log(subjects[j].subjectName);
      //   var x = subjects[j].subjectName;
      //   input.forEach(element => {
      //     element['subjectName']=x;
      //   });
      //   //var array = [];
      //   //array[i].push(x);

      //   //subjectName.push(subjects[j].subjectName);
      //   break;
      // }
    }
    //console.log(input);
    return input;
  }

  const deleteResult = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/exam/${id}`,
      config
    );
    if ((await response.data) === 1) {
      setMessage("Result is successfully deleted");
    } else if ((await response.data) === 0) {
      setMessage("Result not exist");
    } else {
      setMessage("Server is down");
    }
    popupToast();
    loadResults();
  };

  return (
    <div className="container">
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          top: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
        >
          <Toast show={toast} onClose={cancleToast} delay={3000} autohide>
            <Toast.Header>
              <strong className="mr-auto">
                <DeleteIcon />
                Delete Result
              </strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </div>
      </div>
      <div className="py-4">
        <div class="row" style={{ alignItems: "center" }}>
          <div class="col-sm-1">
            <Link
              className="btn btn-outline-primary mb-2"
              to="/teacher/results/add"
            >
              <PersonAddIcon />
            </Link>
          </div>
          <div class="col-sm-3" style={{ fontSize: "1.27em" }}>
            StudentId : {id + " "}
          </div>
          <div class="col-sm-4" style={{ fontSize: "1.27em" }}>
            Student Name : {students.studentName}
          </div>
          <div class="col-sm-4" style={{ fontSize: "1.27em" }}>
            Semester :{" "}
            <select
              className="custom-select"
              style={{ width: 75 }}
              value={q}
              onChange={(e) => setQ(e.target.value)}
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
        </div>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">SubjectId</th>
              <th scope="col">SubjectName</th>
              <th scope="col">ExamType</th>
              <th scope="col">InternalMark</th>
              <th scope="col">ExternalMark</th>
              <th scope="col">Attendance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchSemester(searchNor(results)).map((result, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{result.subjectId}</td>
                <td>{result.subjectName}</td>
                <td>{result.examType}</td>
                <td>{result.examInternalMark}</td>
                <td>{result.examExternalMark}</td>
                <td>{result.attendance}</td>
                <td>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/teacher/results/edit/${result.examId}`}
                  >
                    <EditIcon />
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteResult(result.examId)}
                  >
                    <DeleteIcon />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">SubjectId</th>
              <th scope="col">SubjectName</th>
              <th scope="col">ExamType</th>
              <th scope="col">InternalMark</th>
              <th scope="col">ExternalMark</th>
              <th scope="col">Attendance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchSemester(searchRem(results)).map((result, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{result.subjectId}</td>
                <td>{result.subjectName}</td>
                <td>{result.examType}</td>
                <td>{result.examInternalMark}</td>
                <td>{result.examExternalMark}</td>
                <td>{result.attendance}</td>
                <td>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/teacher/results/edit/${result.examId}`}
                  >
                    <EditIcon />
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteResult(result.examId)}
                  >
                    <DeleteIcon />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">SubjectId</th>
              <th scope="col">SubjectName</th>
              <th scope="col">ExamType</th>
              <th scope="col">InternalMark</th>
              <th scope="col">ExternalMark</th>
              <th scope="col">Attendance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchSemester(searchRerem(results)).map((result, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{result.subjectId}</td>
                <td>{result.subjectName}</td>
                <td>{result.examType}</td>
                <td>{result.examInternalMark}</td>
                <td>{result.examExternalMark}</td>
                <td>{result.attendance}</td>
                <td>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/teacher/results/edit/${result.examId}`}
                  >
                    <EditIcon />
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteResult(result.examId)}
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

export default ListResult;
