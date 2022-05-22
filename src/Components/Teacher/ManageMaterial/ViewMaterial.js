import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewMaterial = () => {
  const [material, setMaterial] = useState({
    materialId: "",
    subjectId: "",
    materialLink: "",
    materialDescription: "",
  });
  const { id } = useParams();

  useEffect(() => {
    loadMaterial();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const loadMaterial = async () => {
    const res = await axios.get(`http://localhost:8080/material/${id}`, config);
    setMaterial(res.data);
  };
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/teacher/materials">
        back to Home
      </Link>
      <h1 className="display-4">Material Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">SubjectId: {material.materialId}</li>
        <li className="list-group-item">
          Material Link: {material.materialLink}
        </li>
        <li className="list-group-item">
          Material Description: {material.materialDescription}
        </li>
      </ul>
    </div>
  );
};

export default ViewMaterial;
