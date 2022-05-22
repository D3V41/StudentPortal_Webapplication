import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import { Input } from "@material-ui/core";

const ListMaterial = () => {
  const [materials, setMaterial] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    loadMaterials();
  }, []);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const loadMaterials = async () => {
    const result = await axios.get("http://localhost:8080/material", config);
    console.log(result);
    setMaterial(result.data);
  };

  function search(materials) {
    const columns = materials[0] && Object.keys(materials[0]);
    return materials.filter((material) =>
      columns.some(
        (column) => material[column].toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  const deleteMaterial = async (id) => {
    await axios.delete(`http://localhost:8080/material/${id}`, config);
    loadMaterials();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div class="row">
          <div class="col-sm-4">
            <Link
              className="btn btn-outline-primary mb-2"
              to="/teacher/materials/add"
            >
              <PersonAddIcon />
            </Link>
          </div>
          <div class="col-sm-4">
            <p>
              <SearchIcon />
              <Input
                type="text"
                placeholder="Search..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </p>
          </div>
        </div>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">SubjectId</th>
              <th scope="col">Material Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {search(materials).map((material, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{material.subjectId}</td>
                <td>{material.materialLink}</td>
                <td>
                  <Link
                    class="btn btn-primary mr-2"
                    to={`/teacher/materials/${material.materialId}`}
                  >
                    <VisibilityIcon />
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/teacher/materials/edit/${material.materialId}`}
                  >
                    <EditIcon />
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteMaterial(material.materialId)}
                  >
                    <DeleteIcon />
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

export default ListMaterial;
