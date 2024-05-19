import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddScenario.css";

const AddScenario = () => {
  const [scenarioName, setScenarioName] = useState("");
  const [scenarioTime, setScenarioTime] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (scenarioName === "" || scenarioTime === "") {
      setError("Scenario Name and Time are required");
      return;
    }
    const newScenario = { name: scenarioName, time: scenarioTime };
    axios
      .post("http://localhost:5000/api/scenarios", newScenario)
      .then(() => {
        setScenarioName("");
        setScenarioTime("");
        setError("");
        navigate("/all-scenarios");
      })
      .catch((err) => {
        setError("Error adding scenario");
        console.error(err);
      });
  };

  return (
    <div className="add-scenario-container">
      <h1>Add Scenario</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="scenarioName">Scenario Name</label>
          <input
            type="text"
            id="scenarioName"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="scenarioTime">Scenario Time (seconds)</label>
          <input
            type="number"
            id="scenarioTime"
            value={scenarioTime}
            onChange={(e) => setScenarioTime(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div className="form-buttons">
          <button type="submit" className="btn btn-add">
            Add
          </button>
          <button
            type="button"
            className="btn btn-reset"
            onClick={() => {
              setScenarioName("");
              setScenarioTime("");
              setError("");
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-back"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScenario;
