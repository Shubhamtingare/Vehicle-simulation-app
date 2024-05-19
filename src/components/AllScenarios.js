import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllScenarios.css";
import { useNavigate } from "react-router-dom";

const AllScenarios = () => {
  const [scenarios, setScenarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = () => {
    axios
      .get("http://localhost:5000/api/scenarios")
      .then((response) => {
        setScenarios(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scenarios:", error);
      });
  };

  const handleEdit = (scenarioId) => {
    navigate(`/edit-scenario/${scenarioId}`);
  };

  const handleDelete = (scenarioId) => {
    axios
      .delete(`http://localhost:5000/api/scenarios/${scenarioId}`)
      .then(() => {
        setScenarios((prevScenarios) =>
          prevScenarios.filter((scenario) => scenario.id !== scenarioId)
        );
        console.log("Scenario deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting scenario:", error);
      });
  };

  return (
    <div className="all-scenarios-container">
      <h1>All Scenarios</h1>
      <table>
        <thead>
          <tr>
            <th>Scenario ID</th>
            <th>Scenario Name</th>
            <th>Scenario Time</th>
            <th>Number of Vehicles</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            <tr key={scenario.id}>
              <td>{scenario.id}</td>
              <td>{scenario.name}</td>
              <td>{scenario.time}</td>
              <td>{scenario.vehicles ? scenario.vehicles.length : 0}</td>
              <td>
                <button onClick={() => handleEdit(scenario.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(scenario.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllScenarios;
