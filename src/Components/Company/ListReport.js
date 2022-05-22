import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AssessmentIcon from "@material-ui/icons/Assessment";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import PersonIcon from "@material-ui/icons/Person";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const ListReport = () => {
  const [edialog, setEdialog] = useState(false);
  const [eteacher, setEteacher] = useState([]);
  const [report, setReport] = useState([]);
  const [reportlist, setReportlist] = useState([]);
  const [iteacher, setIteacher] = useState([]);

  useEffect(() => {
    loadData();
  }, [iteacher]);

  const { id } = useParams();

  const gotoLoadteacher = () => {
    setTimeout(() => {
      loadTeacher(report.externalId, report.internalId);
    }, 50);
  };

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const loadData = async () => {
    const result = await axios.get(
      `http://localhost:8080/studentreport/${id}`,
      config
    );
    const result1 = await axios.get(
      `http://localhost:8080/report/student/${id}`,
      config
    );
    setReport(result.data);
    setReportlist(result1.data);

    gotoLoadteacher();
  };

  const loadTeacher = async (eid, iid) => {
    const result1 = await axios.get(
      `http://localhost:8080/admin/teacher/${eid}`,
      config
    );
    const result2 = await axios.get(
      `http://localhost:8080/admin/teacher/${iid}`,
      config
    );
    setEteacher(result1.data);
    setIteacher(result2.data);
  };

  const checkStatus = (status) => {
    if (status === "No") {
      return (
        <div>
          <CancelIcon style={{ color: "red" }} /> Pending
        </div>
      );
    }
    if (status === "Yes") {
      return (
        <div>
          <CheckCircleIcon style={{ color: "green" }} /> Checked
        </div>
      );
    }
  };

  const showReport = () => {
    const file = new Blob([report.reportData], {
      type: "application/pdf",
    });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  return (
    <div className="container">
      <Dialog
        open={edialog}
        onClick={() => setEdialog(false)}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogContent></DialogContent>
        <DialogContent style={{ textAlign: "center" }}>
          <div>
            <PersonIcon style={{ fontSize: 53 }} />
          </div>
          <div style={{ fontSize: 25 }}>Profile</div>
          <div>Name : {iteacher.teacherName}</div>
          <div>Email : {iteacher.teacherEmail}</div>
          <div>Phone : {iteacher.teacherPhone}</div>
          <div>Role : {iteacher.teacherRole}</div>
          <div>WorkPlace : {iteacher.teacherWorkplace}</div>
        </DialogContent>
        <DialogContent></DialogContent>
        <DialogContent></DialogContent>
      </Dialog>
      <div className="py-4">
        <div className="row">
          <div class="col-sm-4">
            Project Definition : {report.projectDefinition}
          </div>
          <div class="col-sm-4">Work Language : {report.workLanguage}</div>
          <div class="col-sm-4">
            Company Resources : {report.companyResources}
          </div>
        </div>
        <div className="row">
          <div class="col-sm-4">Join Date : {report.joinDate}</div>
          <div class="col-sm-4">End Date : {report.endDate}</div>
          <div class="col-sm-4">College : {iteacher.teacherWorkplace}</div>
        </div>
        <div className="row">
          <div class="col-sm-4">
            <Link class="btn btn-primary" onClick={() => setEdialog(true)}>
              <PersonIcon /> Internal Faculty
            </Link>
          </div>

          <div class="col-sm-4"></div>

          <div class="col-sm-4"></div>
        </div>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">ReportNo</th>
              <th scope="col">Name</th>
              <th scope="col">External Status</th>
              <th scope="col">Internal Status</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reportlist.map((rl, index) => (
              <tr>
                <td>{rl.reportNo}</td>
                <td>{rl.reportName}</td>
                <td>{checkStatus(rl.externalStatus)}</td>
                <td>{checkStatus(rl.internalStatus)}</td>
                <td>
                  <Link
                    class="btn btn-primary mr-2"
                    to={`/company/student/viewreport/${rl.rId}`}
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

export default ListReport;
