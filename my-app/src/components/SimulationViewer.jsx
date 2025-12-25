import { useState } from "react";
import { logSimulationAPI } from "../api/student.api";
import Card from "./Card";

export default function SimulationViewer({ simulation, onClose }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [notes, setNotes] = useState("");
  const [observations, setObservations] = useState([]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (simulation.name) {
      logSimulationAPI(simulation.name);
    }
  };

  const addObservation = () => {
    if (notes.trim()) {
      setObservations([...observations, { id: Date.now(), text: notes, timestamp: new Date() }]);
      setNotes("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-purple-50">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{simulation.name}</h2>
            <p className="text-sm text-gray-600">{simulation.description}</p>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium"
          >
            ✕ Close
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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

            {/* Sidebar - Interactive Components */}
            <div className="space-y-4">
              {/* Instructions */}
              <Card>
                <h3 className="font-semibold text-gray-900 mb-2">Instructions</h3>
                <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                  <li>Adjust the parameters using the controls</li>
                  <li>Observe the changes in real-time</li>
                  <li>Take notes of your observations</li>
                  <li>Record your findings below</li>
                </ul>
              </Card>

              {/* Notes */}
              <Card>
                <h3 className="font-semibold text-gray-900 mb-2">My Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your observations here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm mb-2"
                  rows="4"
                />
                <button
                  onClick={addObservation}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 active:bg-purple-800 transition-colors text-sm font-medium"
                >
                  Add Observation
                </button>
              </Card>

              {/* Observations List */}
              {observations.length > 0 && (
                <Card>
                  <h3 className="font-semibold text-gray-900 mb-2">Observations</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {observations.map((obs) => (
                      <div key={obs.id} className="p-2 bg-purple-50 border border-purple-200 rounded text-sm">
                        <p className="text-gray-800">{obs.text}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(obs.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <h3 className="font-semibold text-gray-900 mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors text-sm font-medium text-purple-700">
                    📊 View Data
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors text-sm font-medium text-purple-700">
                    📸 Screenshot
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors text-sm font-medium text-purple-700">
                    💾 Save Progress
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

