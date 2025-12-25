import { useEffect, useState } from "react";
import { getRecentSimulationsAPI } from "../../api/student.api";
import Card from "../../components/Card";
import { FiBookOpen, FiCheckCircle, FiRefreshCw, FiStar } from "react-icons/fi";

export default function StudentDashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getRecentSimulationsAPI().then((res) => setLogs(res.data));
  }, []);

  const mockStats = [
    { label: "Total Simulations", value: "12", icon: <FiBookOpen className="text-purple-600" /> },
    { label: "Completed", value: "8", icon: <FiCheckCircle className="text-green-600" /> },
    { label: "In Progress", value: "4", icon: <FiRefreshCw className="text-purple-600" /> },
    { label: "Average Score", value: "85%", icon: <FiStar className="text-yellow-500" /> }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Track your learning progress and simulations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {mockStats.map((stat, idx) => (
            <Card key={idx}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Simulations</h2>
          {logs.length > 0 ? (
            <ul className="space-y-3">
              {logs.map((l) => (
                <li key={l._id} className="flex items-center justify-between p-3 bg-purple-50 border border-purple-100 rounded-md hover:bg-purple-100 transition-colors">
                  <span className="text-gray-800 font-medium">{l.simulationName}</span>
                  <span className="text-sm text-purple-600">View Details →</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-8">No simulations yet. Start exploring!</p>
          )}
        </Card>
      </div>
    </div>
  );
}
