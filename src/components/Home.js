import React, { useState, useEffect } from "react";
import axios from "axios";
import VehicleForm from "./VehicleForm";
import VehicleDisplay from "./VehicleDisplay";
import { handleStartSimulation, handleStopSimulation } from "./SimulationLogic";
import "./Home.css";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState("");
  const [simulationIntervalId, setSimulationIntervalId] = useState(null);

  useEffect(() => {
    fetchScenarios();
    fetchVehicles();
  }, []);

  const fetchScenarios = () => {
    axios
      .get("http://localhost:5000/api/scenarios")
      .then((response) => setScenarios(response.data))
      .catch((err) => console.error(err));
  };

  const fetchVehicles = () => {
    axios
      .get("http://localhost:5000/api/vehicles")
      .then((response) => setVehicles(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log("Vehicles updated: ", vehicles);
  }, [vehicles]);

  const startSimulation = () => {
    if (selectedScenario === "") {
      console.log("Please select a scenario.");
      return;
    }

    console.log("Start button clicked");
    handleStartSimulation(
      selectedScenario,
      setVehicles,
      setSimulationIntervalId
    );
  };

  const stopSimulation = () => {
    console.log("Stop button clicked");
    handleStopSimulation(setSimulationIntervalId, simulationIntervalId);
  };

  return (
    <div className="home-container">
      <h1>Home</h1>
      <div className="scenarios-dropdown">
        <select
          value={selectedScenario}
          onChange={(e) => setSelectedScenario(e.target.value)}
        >
          <option value="">Select Scenario</option>
          {scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.name}
            </option>
          ))}
        </select>
        <button onClick={startSimulation} disabled={!selectedScenario}>
          Start Simulation
        </button>
        <button onClick={stopSimulation} disabled={!simulationIntervalId}>
          Stop Simulation
        </button>
      </div>
      <VehicleForm fetchVehicles={fetchVehicles} setVehicles={setVehicles} />
      <div className="grid-container">
        <VehicleDisplay vehicles={vehicles} />
      </div>
    </div>
  );
};

export default Home;
