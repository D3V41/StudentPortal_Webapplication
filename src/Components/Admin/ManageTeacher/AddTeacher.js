import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ManageStudent/color.css";
import { useHistory } from "react-router-dom";
import emailjs from "emailjs-com";
import { Call } from "@material-ui/icons";

const AddTeacher = () => {
  let history = useHistory();
  const [role, setRole] = useState("");
  const [teacher, setTeacher] = useState({
    teacherId: "",
    teacherName: "",
    teacherEmail: "",
    teacherGender: "",
    teacherDob: "",
    teacherPhone: "",
    teacherRole: "Internal Guide",
    teacherWorkplace: "",
    teacherAddress: "",
  });

  const {
    teacherId,
    teacherName,
    teacherEmail,
    teacherGender,
    teacherDob,
    teacherPhone,
    teacherRole,
    teacherWorkplace,
    teacherAddress,
  } = teacher;
  const onInputChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
    if (e.target.name === "teacherRole") {
      setRole(e.target.value);
    }
  };

  useEffect(() => {
    if (teacher.teacherRole === "External Guide") {
      loadExternalID();
    } else if (teacher.teacherRole === "Internal Guide") {
      loadTeacherID();
    }
  }, [role]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const loadTeacherID = async () => {
    const result = await axios.get(
      `http://localhost:8080/admin/teacher/generateTId`,
      config
    );

    console.log(result.data);

    setTeacher({ ...teacher, teacherId: result.data });
  };

  const loadExternalID = async () => {
    const result = await axios.get(
      `http://localhost:8080/admin/teacher/generateEId`,
      config
    );

    console.log(result.data);

    setTeacher({ ...teacher, teacherId: result.data });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/admin/teacher", teacher, config);
    console.log(teacher);

    emailjs
      .sendForm(
        "service_xfocrr4",
        "template_jgom898",
        e.target,
        "user_CrnRVdqzhS1yw1fuIApMy"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    history.push("/admin/teachers");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Teacher</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="color">
            <div class="row">
              <div className="form-group" class="col-lg-6">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter teacherId"
                  name="teacherId"
                  value={teacherId}
                  disabled
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-6">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter teacherName"
                  name="teacherName"
                  value={teacherName}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>

            <div class="row">
              <div className="form-group" class="col-lg-6">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter E-mail Address"
                  name="teacherEmail"
                  value={teacherEmail}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-6">
                <div class="border form-check form-check-inline form-control form-control-lg col-lg-2 pl-2">
                  Gender
                </div>
                <label class="ml-4">
                  <input
                    class="mr-2"
                    type="radio"
                    name="teacherGender"
                    value="Male"
                    onChange={(e) => onInputChange(e)}
                  />
                  Male
                </label>
                <label class="ml-3">
                  <input
                    class="mr-2"
                    type="radio"
                    name="teacherGender"
                    value="Female"
                    onChange={(e) => onInputChange(e)}
                  />
                  Female
                </label>
              </div>
            </div>

            <div class="row">
              <div className="form-group" class="col-lg-6">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Enter Contact No."
                  name="teacherPhone"
                  value={teacherPhone}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group" class="col-lg-6">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  placeholder="Enter DOB"
                  name="teacherDob"
                  value={teacherDob}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>

            <div class="row">
              <div className="form-group" class="col-lg-6">
                <div class="border form-check form-check-inline form-control form-control-lg col-lg-5 pl-2">
                  Teacher Role
                </div>
                <div class="form-check form-check-inline col-lg-3">
                  <select
                    className="custom-select"
                    name="teacherRole"
                    style={{ width: 175, height: 45 }}
                    value={teacherRole}
                    onChange={(e) => onInputChange(e)}
                  >
                    <option name="Internal Guide" value="Internal Guide">
                      Internal Guide
                    </option>
                    <option name="External Guide" value="External Guide">
                      External Guide
                    </option>
                  </select>
                </div>
              </div>
              <div className="form-group" class="col-lg-6">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Work Place."
                  name="teacherWorkplace"
                  value={teacherWorkplace}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>

            <div class="row">
              <div className="form-group" class="col-lg-12">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Address"
                  name="teacherAddress"
                  value={teacherAddress}
                  required
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-block mt-5">
            Add Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
