import React, { useState } from "react";
import axios from "axios";
import "./VehicleForm.css";
import { useNavigate } from "react-router-dom";

const VehicleForm = ({ fetchVehicles, setVehicles }) => {
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState({
    id: "",
    name: "",
    posX: 0,
    posY: 0,
    speed: 0,
    direction: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/vehicles", vehicle)
      .then(() => {
        fetchVehicles();
        setVehicles((prevVehicles) => [...prevVehicles, vehicle]);
      })
      .catch((err) => console.error(err));
  };

  const handleReset = () => {
    setVehicle({
      id: "",
      name: "",
      posX: 0,
      posY: 0,
      speed: 0,
      direction: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="vehicle-form-container">
      <h2>Add Vehicle</h2>
      <div className="form-group">
        <input
          type="text"
          name="id"
          placeholder="Vehicle ID"
          value={vehicle.id}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Vehicle Name"
          value={vehicle.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="posX"
          placeholder="Position X"
          value={vehicle.posX}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="posY"
          placeholder="Position Y"
          value={vehicle.posY}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          name="speed"
          placeholder="Speed"
          value={vehicle.speed}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <select
          name="direction"
          onChange={handleChange}
          value={vehicle.direction}
        >
          <option value="">Select Direction</option>
          <option value="Towards">Towards</option>
          <option value="Backwards">Backwards</option>
          <option value="Upwards">Upwards</option>
          <option value="Downwards">Downwards</option>
        </select>
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn btn-add">
          Add
        </button>
        <button type="button" className="btn btn-reset" onClick={handleReset}>
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
  );
};

export default VehicleForm;
