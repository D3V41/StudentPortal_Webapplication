import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewMaterial = () => {
  const [materials, setMaterial] = useState([]);
  const [subject, setSubject] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    loadMaterials();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const loadMaterials = async () => {
    const result = await axios.get(
      `http://localhost:8080/material/subject/${id}`,
      config
    );

    const result2 = await axios.get(
      `http://localhost:8080/admin/subject/${id}`,
      config
    );
    console.log(result);
    setMaterial(result.data);
    setSubject(result2.data);
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1 className="display-5">Subject : {subject.subjectName}</h1>
        <hr />

        {materials.map((material, index) => (
          <div
            class="card"
            style={{ marginBottom: 10, backgroundColor: "#F0F8FF" }}
          >
            <div class="card-body">
              <p class="card-text">
                Description : {material.materialDescription}
              </p>
              <a href={material.materialLink} target="_blank" class="card-link">
                Link
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMaterial;
