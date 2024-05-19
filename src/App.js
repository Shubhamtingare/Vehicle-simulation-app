import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import AddScenario from "./components/AddScenario";
import "./App.css";
import VehicleForm from "./components/VehicleForm";
import AllScenarios from "./components/AllScenarios";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [simulationIntervalId, setSimulationIntervalId] = useState(null);

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  vehicles={vehicles}
                  setVehicles={setVehicles}
                  simulationIntervalId={simulationIntervalId}
                  setSimulationIntervalId={setSimulationIntervalId}
                />
              }
            />
            <Route path="/add-scenario" element={<AddScenario />} />
            <Route path="/all-scenarios" element={<AllScenarios />} />
            <Route path="/add-vehicle" element={<VehicleForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
