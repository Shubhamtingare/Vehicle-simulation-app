const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, "../build")));

// Import API route files
const scenarioRoutes = require("./routers/scenarioRoutes");
const vehicleRoutes = require("./routers/vehicleRoutes");

// Use API route files
app.use("/api/scenarios", scenarioRoutes);
app.use("/api/vehicles", vehicleRoutes);

// Handle requests that don't match any routes by serving the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
