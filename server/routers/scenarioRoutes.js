const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const DATA_FILE_PATH = path.join(__dirname, "../data.json");

// Utility functions to read and write data
const readData = () => {
  const rawData = fs.readFileSync(DATA_FILE_PATH);
  return JSON.parse(rawData);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
};

// Define API routes for scenarios
router.get("/", (req, res) => {
  const data = readData();
  res.json(data.scenarios);
});

router.post("/", (req, res) => {
  const data = readData();
  const newScenario = req.body;
  newScenario.id = `${Date.now()}`;
  data.scenarios.push(newScenario);
  writeData(data);
  res.status(201).json(newScenario);
});

router.put("/:id", (req, res) => {
  const data = readData();
  const { id } = req.params;
  const updatedScenario = req.body;
  const scenarioIndex = data.scenarios.findIndex((s) => s.id === id);
  if (scenarioIndex === -1) {
    return res.status(404).send("Scenario not found");
  }
  data.scenarios[scenarioIndex] = {
    ...data.scenarios[scenarioIndex],
    ...updatedScenario,
  };
  writeData(data);
  res.status(200).json(data.scenarios[scenarioIndex]);
});

router.delete("/:id", (req, res) => {
  const data = readData();
  const { id } = req.params;
  const scenarioIndex = data.scenarios.findIndex((s) => s.id === id);
  if (scenarioIndex === -1) {
    return res.status(404).send("Scenario not found");
  }
  data.scenarios.splice(scenarioIndex, 1);
  writeData(data);
  res.status(204).send();
});

module.exports = router;
