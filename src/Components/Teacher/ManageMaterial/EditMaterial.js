import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditMaterial = () => {
  let history = useHistory();
  const { id } = useParams();
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

  useEffect(() => {
    loadMaterial();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/material/${id}`, material, config);
    history.push("/teacher/materials");
  };

  const loadMaterial = async () => {
    const result = await axios.get(
      `http://localhost:8080/material/${id}`,
      config
    );
    setMaterial(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A Material</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter SubjectId"
              name="subjectId"
              value={subjectId}
              disabled
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

          <button className="btn btn-warning btn-block">Update Material</button>
        </form>
      </div>
    </div>
  );
};

export default EditMaterial;
