import React, { useState } from "react";
import axios from "axios";
import "../ManageExamResult/color.css";
import { useHistory } from "react-router-dom";

const AddMaterial = () => {
  let history = useHistory();
  const [material, setMaterial] = useState({
    materialId: "",
    subjectId: "",
    materialLink: "",
    materialDescription: "",
  });

  const { subjectId, materialLink, materialDescription } = material;

  const onInputChange = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/material", material, config);
    console.log(material);
    history.push("/teacher/materials");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Material</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="color">
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter SubjectId"
                name="subjectId"
                value={subjectId}
                required
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Material Link"
                name="materialLink"
                value={materialLink}
                required
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter material Description"
                name="materialDescription"
                value={materialDescription}
                required
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <button className="btn btn-primary btn-block mt-4">
            Add Material
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMaterial;
