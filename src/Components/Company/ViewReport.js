import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import GetAppIcon from "@material-ui/icons/GetApp";
import PDFViewer from "pdf-viewer-reactjs";
import Switch from "react-switch";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { CallToActionSharp } from "@material-ui/icons";

const ViewReport = () => {
  const [state, setState] = useState(2);
  var count = 0;
  const [report, setReport] = useState({
    rId: "",
    externalStatus: "",
    internalStatus: "",
    reportDate: "",
    reportNo: "",
    studentId: "",
    reportData: "",
    reportName: "",
    reportType: "",
  });
  const { id } = useParams();
  const [data, setData] = useState("");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    callApi();
  }, [state]);

  useEffect(() => {
    loadData();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const callApi = async () => {
    await axios.put(`http://localhost:8080/report`, report, config);
  };

  const loadData = async () => {
    const result1 = await axios.get(
      `http://localhost:8080/report/report/${id}`,
      config
    );
    setReport(result1.data);
    setData(result1.data.reportData);
    setCheck(result1.data.externalStatus === "Yes" ? true : false);
  };

  const showReport = () => {
    const linkSource = `data:application/pdf;base64,${report.reportData}`;
    const downloadLink = document.createElement("a");
    const fileName = report.reportName;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const handleChange = () => {
    setTimeout(() => {
      if (check === true) {
        setReport({ ...report, ["externalStatus"]: "No" });
        setCheck(false);
        setState(3);
      } else if (check === false) {
        setReport({ ...report, ["externalStatus"]: "Yes" });
        setCheck(true);
        setState(5);
      }
    }, 50);
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="row">
          <div class="col-sm-4">
            <Link
              className="btn btn-outline-primary mb-2"
              to={`/company/student/reports/${report.studentId}`}
            >
              <ArrowBackIcon /> Back
            </Link>
          </div>
        </div>
        <div
          className="flex-row align-items-center"
          style={{
            justifyContent: "space-around",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div class="col-sm-3" style={{ textAlign: "center" }}>
            Name : {report.reportName}
          </div>

          <div class="col-sm-3" style={{ textAlign: "center" }}>
            Date : {report.reportDate}
          </div>

          <div
            class="col-sm-3"
            style={{
              textAlign: "center",
            }}
          >
            <div>{check ? "Approved" : "Pending"}</div>

            <Switch
              className="react-switch"
              checked={check}
              onChange={handleChange}
            />
          </div>

          <div class="col-sm-3" style={{ textAlign: "center" }}>
            <Link class="btn btn-warning" onClick={() => showReport()}>
              <GetAppIcon /> download
            </Link>
          </div>
        </div>
        <embed
          src={`data:application/pdf;base64,${report.reportData}`}
          type="application/pdf"
          width="100%"
          height="900vh"
          style={{ marginTop: "10px" }}
        ></embed>
      </div>
    </div>
  );
};

export default ViewReport;
