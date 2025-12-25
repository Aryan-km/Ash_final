import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSimulationAPI,
  startSimulationAPI,
  addObservationAPI,
  markSimulationDoneAPI,
  getAllAvailableSimulationsAPI
} from "../../api/student.api";
import Card from "../../components/Card";

export default function SimulationView() {
  const { simulationName } = useParams();
  const navigate = useNavigate();
  const [simulation, setSimulation] = useState(null);
  const [simulationData, setSimulationData] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [availableSimulations, setAvailableSimulations] = useState([]);

  // Fetch available simulations and find the current one
  useEffect(() => {
    const fetchSimulations = async () => {
      try {
        const response = await getAllAvailableSimulationsAPI();
        setAvailableSimulations(response.data);
      } catch (error) {
        console.error("Error fetching simulations:", error);
      }
    };
    fetchSimulations();
  }, []);

  // Find simulation from available simulations
  useEffect(() => {
    if (availableSimulations.length > 0) {
      const found = availableSimulations.find(s => s.name === decodeURIComponent(simulationName));
      if (found) {
        setSimulation(found);
      } else {
        setLoading(false);
      }
    }
  }, [simulationName, availableSimulations]);

  // Load or start simulation
  useEffect(() => {
    if (simulation) {
      const loadSimulation = async () => {
        try {
          // Try to get existing simulation
          try {
            const res = await getSimulationAPI(simulation.name);
            setSimulationData(res.data);
          } catch (error) {
            // If not found, start new simulation
            if (error.response?.status === 404) {
              const res = await startSimulationAPI(simulation.name);
              setSimulationData(res.data);
            } else {
              throw error;
            }
          }
        } catch (error) {
          console.error("Error loading simulation:", error);
        } finally {
          setLoading(false);
        }
      };
      loadSimulation();
    }
  }, [simulation]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const addObservation = async () => {
    if (!notes.trim() || !simulation) return;

    try {
      const res = await addObservationAPI(simulation.name, notes);
      setSimulationData(res.data);
      setNotes("");
    } catch (error) {
      console.error("Error adding observation:", error);
      alert("Failed to save observation");
    }
  };

  const markAsDone = async () => {
    if (!simulation) return;

    if (!window.confirm("Are you sure you want to mark this simulation as completed?")) {
      return;
    }

    try {
      const res = await markSimulationDoneAPI(simulation.name);
      setSimulationData(res.data);
      alert("Simulation marked as completed!");
    } catch (error) {
      console.error("Error marking simulation as done:", error);
      alert("Failed to mark simulation as done");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading simulation...</p>
      </div>
    );
  }

  if (!simulation) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Simulation not found</p>
          <button
            onClick={() => navigate("/student/simulations")}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Back to Simulations
          </button>
        </div>
      </div>
    );
  }

  const observations = simulationData?.observations || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/student/simulations")}
            className="mb-4 text-purple-600 hover:text-purple-700 font-medium text-sm"
          >
            ← Back to Simulations
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{simulation.name}</h1>
              <p className="text-gray-600">{simulation.description}</p>
            </div>
            {simulationData && (
              <div className="flex items-center gap-2">
                {simulationData.isCompleted ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm font-medium">
                    ✓ Completed
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm font-medium">
                    In Progress
                  </span>
                )}
                {!simulationData.isCompleted && (
                  <button
                    onClick={markAsDone}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    Mark as Done
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Simulation Info */}
        {simulationData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <p className="text-sm text-gray-600 mb-1">Started</p>
              <p className="text-gray-900 font-medium">
                {new Date(simulationData.started).toLocaleString()}
              </p>
            </Card>
            {simulationData.ended && (
              <Card>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-gray-900 font-medium">
                  {new Date(simulationData.ended).toLocaleString()}
                </p>
              </Card>
            )}
            <Card>
              <p className="text-sm text-gray-600 mb-1">Observations</p>
              <p className="text-gray-900 font-medium">{observations.length}</p>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Simulation */}
          <div className="lg:col-span-2">
            <Card className="p-0 overflow-hidden">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src={simulation.url}
                  className="w-full h-[600px]"
                  onLoad={handleLoad}
                  title={simulation.name}
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructions */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3">Instructions</h3>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>Adjust the parameters using the controls</li>
                <li>Observe the changes in real-time</li>
                <li>Take notes of your observations</li>
                <li>Record your findings below</li>
                <li>Mark as done when finished</li>
              </ul>
            </Card>

            {/* Add Notes */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3">Add Observation</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your observations here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm mb-3"
                rows="4"
              />
              <button
                onClick={addObservation}
                disabled={!notes.trim()}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 active:bg-purple-800 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Save Observation
              </button>
            </Card>

            {/* Stored Observations */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-3">Stored Observations</h3>
              {observations.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {observations.map((obs, idx) => (
                    <div key={idx} className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                      <p className="text-gray-800 text-sm mb-1">{obs.text}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(obs.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">No observations yet</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

