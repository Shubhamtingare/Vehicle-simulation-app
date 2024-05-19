export const handleStartSimulation = (
  selectedScenario,
  setVehicles,
  setSimulationIntervalId
) => {
  console.log("Starting simulation for scenario:", selectedScenario);

  const intervalId = setInterval(() => {
    console.log("Simulating vehicle movement...");
  }, 1000);

  setSimulationIntervalId(intervalId);
};

export const handleStopSimulation = (
  setSimulationIntervalId,
  simulationIntervalId
) => {
  console.log("Stopping simulation");
  clearInterval(simulationIntervalId);
};

export default { handleStartSimulation, handleStopSimulation };
