import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const AddReport = () => {
  let history = useHistory();
  const [report, setReport] = useState({
    reportNo: "",
    externalStatus: "No",
    internalStatus: "No",
    reportDate: "",
    reportName: "",
    reportType: "application/pdf",
    studentId: localStorage.getItem("id"),
  });
  const [reportdata, setReportdata] = useState("");

  const onInputChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const config = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const blob = await fetch(reportdata).then((res) => res.blob());
    var bodyFormData = new FormData();
    bodyFormData.append("file", blob);
    bodyFormData.append("studentId", report.studentId);
    bodyFormData.append("reportNo", report.reportNo);
    bodyFormData.append("reportName", report.reportName);
    bodyFormData.append("reportDate", report.reportDate);
    bodyFormData.append("externalStatus", report.externalStatus);
    bodyFormData.append("internalStatus", report.internalStatus);

    console.log(bodyFormData);

    await axios.post("http://localhost:8080/report", bodyFormData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    // console.log(report);
    history.push("/student/reports");
  };

  const checkFile = (e) => {
    let files = e.target.files;
    if (files[0].type !== "application/pdf") {
      document.getElementById("warning").innerHTML = "INVALID FILE FORMAT!!!";
      document.getElementById("uploadbtn").setAttribute("disabled", "disabled");
      return;
    }
    if (files[0].size > 1000000) {
      document.getElementById("warning").innerHTML = "Too Big File!!!";
      document.getElementById("uploadbtn").setAttribute("disabled", "disabled");
      return;
    }
    setReport({ ...report, ["reportName"]: files[0].name });
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      setReportdata(e.target.result);
    };
    document.getElementById("warning").innerHTML = "";
    document.getElementById("uploadbtn").removeAttribute("disabled");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add Report</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="color">
            <div class="row">
              <div className="form-group" class="col-lg-6">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Report number"
                  name="reportNo"
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-6">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  placeholder="Date"
                  name="reportDate"
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div class="row">
              <div
                className="form-group"
                class="col-lg-12"
                style={{ textAlign: "center" }}
              >
                <input
                  type="file"
                  placeholder="Upload report"
                  name="reportData"
                  id="upfile"
                  required
                  onChange={(e) => checkFile(e)}
                />
                <div id="warning" style={{ color: "red" }}></div>
              </div>
            </div>
          </div>
          <button className="btn btn-warning btn-block mt-5" id="uploadbtn">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReport;
