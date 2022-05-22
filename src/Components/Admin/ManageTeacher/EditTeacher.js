import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditTeacher = () => {
  let history = useHistory();
  const { id } = useParams();
  const [teacher, setTeacher] = useState({
    teacherId: "",
    teacherName: "",
    teacherEmail: "",
    teacherGender: "",
    teacherDob: "",
    teacherPhone: "",
    teacherRole: "",
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
  };

  useEffect(() => {
    loadTeacher();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8080/admin/teacher/${id}`,
      teacher,
      config
    );
    history.push("/admin/teachers");
  };

  const loadTeacher = async () => {
    const result = await axios.get(
      `http://localhost:8080/admin/teacher/${id}`,
      config
    );
    setTeacher(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter teacherId"
              name="teacherId"
              value={teacherId}
              disabled
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
            <div class="form-check form-check-inline col-lg-2">Gender</div>
            <label>
              <input
                class="mr-2"
                type="radio"
                name="teacherGender"
                value="Male"
                checked={teacherGender === "Male"}
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
                checked={teacherGender === "Female"}
                onChange={(e) => onInputChange(e)}
              />
              Female
            </label>
          </div>

          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter teacherRole"
              name="teacherRole"
              value={teacherRole}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Work place"
              name="teacherWorkplace"
              value={teacherWorkplace}
              required
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="form-group">
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
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditTeacher;
