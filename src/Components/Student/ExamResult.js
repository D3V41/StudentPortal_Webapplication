import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { GeneratePDF } from "./GeneratePdf";
import { PDFDownloadLink } from "@react-pdf/renderer";

const ExamResult = () => {
  const [state, setState] = useState([]);
  var count = 0;
  const [results, setResult] = useState([]);
  const [students, setStudent] = useState([]);
  const [subjects, setSubject] = useState([]);
  const [q, setQ] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    loadResults();
  }, [state, q]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const loadResults = async () => {
    const result = await axios.get(
      `http://localhost:8080/exam/${localStorage.getItem("id")}`,
      config
    );
    const result2 = await axios.get(
      `http://localhost:8080/admin/student/${localStorage.getItem("id")}`,
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

    var results = append(input, subjects);
    setResult(results);

    if (count != 1) {
      count++;
      setState();
      setLoad(true);
    }
  };

  function cpi(sem) {
    var spi1 = spi(results, "1");
    var spi2 = spi(results, "2");
    var spi3 = spi(results, "3");
    var spi4 = spi(results, "4");
    var spi5 = spi(results, "5");
    var spi6 = spi(results, "6");
    var spi7 = spi(results, "7");
    var spi8 = spi(results, "8");

    var all = [spi1, spi2, spi3, spi4, spi5, spi6, spi7, spi8];
    var cpi = 0;
    for (var i = 0; i < sem; i++) {
      cpi = cpi + all[i];
    }
    cpi = cpi / sem;
    return cpi;
  }

  function spi(results, sem) {
    var spi = 0;
    let a = 0;
    let l = [];

    results.forEach((e) => {
      if (e.subjectSemester === sem) {
        if (e.examType == "Rerem" && !l.includes(e.subjectId)) {
          a += 1;
          l.push(e.subjectId);
          const per =
            (parseInt(e.examInternalMark) + parseInt(e.examExternalMark)) *
            (100 / 120);
          var temp = 0;
          if (per > 85) {
            temp = spi + 10;
          } else if (per > 75) {
            temp = spi + 9;
          } else if (per > 65) {
            temp = spi + 8;
          } else if (per > 55) {
            temp = spi + 7;
          } else if (per > 45) {
            temp = spi + 6;
          } else if (per >= 35) {
            temp = spi + 5;
          } else if (per < 35) {
          }
          //console.log(a);
          spi = temp / a;
        } else if (e.examType == "Rem" && !l.includes(e.subjectId)) {
          a += 1;
          l.push(e.subjectId);
          const per =
            (parseInt(e.examInternalMark) + parseInt(e.examExternalMark)) *
            (100 / 120);
          var temp = 0;
          if (per > 85) {
            temp = spi + 10;
          } else if (per > 75) {
            temp = spi + 9;
          } else if (per > 65) {
            temp = spi + 8;
          } else if (per > 55) {
            temp = spi + 7;
          } else if (per > 45) {
            temp = spi + 6;
          } else if (per >= 35) {
            temp = spi + 5;
          } else if (per < 35) {
          }
          //console.log(a);
          spi = temp / a;
        } else if (e.examType == "Nor" && !l.includes(e.subjectId)) {
          a += 1;
          l.push(e.subjectId);
          const per =
            (parseInt(e.examInternalMark) + parseInt(e.examExternalMark)) *
            (100 / 120);
          var temp = 0;
          if (per > 85) {
            temp = spi + 10;
          } else if (per > 75) {
            temp = spi + 9;
          } else if (per > 65) {
            temp = spi + 8;
          } else if (per > 55) {
            temp = spi + 7;
          } else if (per > 45) {
            temp = spi + 6;
          } else if (per >= 35) {
            temp = spi + 5;
          } else if (per < 35) {
          }
          //console.log(a);
          spi = temp / a;
        }
      }
    });
    // console.log("spi " + spi);
    return spi;
  }

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
    }
    return input;
  }

  function getResult() {
    return results;
  }
  function getStudent() {
    return students;
  }
  function onChange(sem) {
    setQ(sem);
    spi(results, sem);
    cpi(sem);
  }
  return (
    <div className="container">
      <div className="py-4">
        <div className="row" style={{ alignItems: "center" }}>
          <div class="col-sm-4" style={{ fontSize: "1.27em" }}>
            <b>StudentId : </b>
            {localStorage.getItem("id")}
          </div>

          <div class="col-sm-4" style={{ fontSize: "1.27em" }}>
            <b>Student Name : </b>
            {students.studentName}
          </div>

          <div class="col-sm-4" style={{ fontSize: "1.27em" }}>
            <b>Semester :</b>{" "}
            <select
              className="custom-select"
              style={{ width: 75, height: 35 }}
              value={q}
              onChange={(e) => onChange(e.target.value)}
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
        <div id="pdfdiv">
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
                  <td>
                    {result.attendance}
                    {" %"}
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
                  <td>
                    {result.attendance}
                    {" %"}
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
                  <td>
                    {result.attendance}
                    {" %"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="row" style={{ alignItems: "center" }}>
          <div class="col-sm-1" style={{ fontSize: "1.27em" }}></div>
          <div class="col-sm-3" style={{ fontSize: "1.27em" }}>
            <b> SPI : {spi(results, q)}</b>
          </div>
          <div class="col-sm-4" style={{ fontSize: "1.27em" }}>
            <b> CPI : {cpi(q)}</b>
          </div>
          <div class="col-sm-4 btn">
            {load && (
              <PDFDownloadLink
                document={
                  <GeneratePDF
                    result={results}
                    student={students}
                    spi={spi(results, q)}
                    cpi={cpi(q)}
                    semester={q}
                  />
                }
                fileName="result.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download Pdf"
                }
              </PDFDownloadLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;
