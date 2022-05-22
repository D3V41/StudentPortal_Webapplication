import React, { useState } from "react";
import axios from "axios";
import "../ManageStudent/color.css";
import { useHistory } from "react-router-dom";

const AddSubject = () => {
  let history = useHistory();
  const [subject, setSubject] = useState({
    subjectId: "",
    subjectName: "",
    subjectCredit: "",
    subjectBranch: "CE",
    subjectSemester: "1",
  });

  const {
    subjectId,
    subjectName,
    subjectCredit,
    subjectBranch,
    subjectSemester,
  } = subject;
  const onInputChange = (e) => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/admin/subject", subject, config);
    console.log(subject);
    history.push("/admin/subjects");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Subject</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="color">
            <div class="row">
              <div className="form-group" class="col-lg-6">
                <div class="border form-check form-check-inline form-control form-control-lg col-lg-3 pl-2">
                  Branch
                </div>
                <div class="form-check form-check-inline col-lg-3">
                  <select
                    className="custom-select ml-4"
                    name="subjectBranch"
                    style={{ width: 75 }}
                    value={subjectBranch}
                    onChange={(e) => onInputChange(e)}
                  >
                    <option name="CE" value="CE">
                      {" "}
                      CE
                    </option>
                    <option name="IT" value="IT">
                      IT
                    </option>
                    <option name="EC" value="EC">
                      {" "}
                      EC
                    </option>
                    <option name="MH" value="MH">
                      MH
                    </option>
                    <option name="IC" value="IC">
                      IC
                    </option>
                    <option name="CH" value="CH">
                      CH
                    </option>
                  </select>
                </div>
              </div>
              <div className="form-group" class="col-lg-6">
                <div class="border form-check form-check-inline form-control form-control-lg col-lg-3 pl-2">
                  Semester
                </div>
                <div class="form-check form-check-inline col-lg-3">
                  <select
                    className="custom-select ml-4"
                    name="subjectSemester"
                    style={{ width: 75 }}
                    value={subjectSemester}
                    onChange={(e) => onInputChange(e)}
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
            </div>

            <div class="row">
              <div className="form-group" class="col-lg-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter subjectId"
                  name="subjectId"
                  value={subjectId}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter subjectName"
                  name="subjectName"
                  value={subjectName}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-4">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Enter subject Credit"
                  name="subjectCredit"
                  value={subjectCredit}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-block mt-5">
            Add Subject
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubject;
