import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAvailableSimulationsAPI } from "../../api/student.api";
import Card from "../../components/Card";

export default function Simulation() {
  const navigate = useNavigate();
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSimulations();
  }, []);

  const fetchSimulations = async () => {
    try {
      setLoading(true);
      const response = await getAllAvailableSimulationsAPI();
      setSimulations(response.data);
    } catch (error) {
      console.error("Error fetching simulations:", error);
      setError("Failed to load simulations");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading simulations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchSimulations}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interactive Simulations</h1>
          <p className="text-gray-600">Explore physics concepts through hands-on simulations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulations.map((sim) => (
            <Card key={sim.id || sim._id} className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                    {sim.category}
                  </span>
                  {sim.assigned && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      Assigned
                    </span>
                  )}
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  sim.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                  sim.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {sim.difficulty}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-2">{sim.name}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{sim.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>⏱️ {sim.duration}</span>
                <span>🔬 Simulation</span>
                {sim.isCompleted && (
                  <span className="text-green-600 font-medium">✓ Completed</span>
                )}
              </div>

              <button
                onClick={() => navigate(`/student/simulation/${encodeURIComponent(sim.name)}`)}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 active:bg-purple-800 transition-colors text-sm font-medium"
              >
                Open Simulation
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
