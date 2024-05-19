const express = require("express");
const { readData, writeData } = require("../utils");
const router = express.Router();

// Get all vehicles
router.get("/", (req, res) => {
  const data = readData();
  res.json(data.vehicles);
});

// Add new vehicle
router.post("/", (req, res) => {
  const data = readData();
  const newVehicle = req.body;

  newVehicle.id = `${Date.now()}`;
  data.vehicles.push(newVehicle);
  writeData(data);
  res.status(201).json(newVehicle);
});

// Update vehicle by ID
router.put("/:id", (req, res) => {
  const data = readData();
  const { id } = req.params;
  const updatedVehicle = req.body;
  const vehicleIndex = data.vehicles.findIndex((v) => v.id === id);
  if (vehicleIndex === -1) {
    return res.status(404).send("Vehicle not found");
  }
  data.vehicles[vehicleIndex] = {
    ...data.vehicles[vehicleIndex],
    ...updatedVehicle,
  };
  writeData(data);
  res.status(200).json(data.vehicles[vehicleIndex]);
});

// Delete vehicle by ID
router.delete("/:id", (req, res) => {
  const data = readData();
  const { id } = req.params;
  const vehicleIndex = data.vehicles.findIndex((v) => v.id === id);
  if (vehicleIndex === -1) {
    return res.status(404).send("Vehicle not found");
  }
  data.vehicles.splice(vehicleIndex, 1);
  writeData(data);
  res.status(204).send();
});

module.exports = router;
