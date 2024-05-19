import React from "react";
import "./VehicleDisplay.css";

const VehicleDisplay = ({ vehicles }) => {
  return (
    <div className="vehicle-grid">
      <div className="grid-item">
        <div className="vehicle blue-vehicle"></div>
      </div>

      <div className="grid-item">
        <div className="vehicle red-vehicle"></div>
      </div>

      {vehicles.map((vehicle, index) => {
        const vehicleStyle = {
          left: `${vehicle.posX * 50}px`,
          top: `${vehicle.posY * 50}px`,
          display:
            vehicle.posX === -1 && vehicle.posY === -1 ? "none" : "block",
        };
        return (
          <div
            key={index}
            className={`vehicle ${vehicle.name.toLowerCase()}`}
            style={vehicleStyle}
          >
            {vehicle.name}
          </div>
        );
      })}
    </div>
  );
};

export default VehicleDisplay;
