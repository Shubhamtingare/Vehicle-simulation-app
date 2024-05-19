import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/add-scenario">Add Scenario</NavLink>
        </li>
        <li>
          <NavLink to="/all-scenarios">All Scenarios</NavLink>
        </li>
        <li>
          <NavLink to="/add-vehicle">Add Vehicle</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
