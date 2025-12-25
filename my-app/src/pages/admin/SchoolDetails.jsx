import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSchoolDetailsAPI } from "../../api/admin.api";
import Card from "../../components/Card";
import { BarChart, PieChart } from "../../components/Charts";
import { FiUsers, FiBookOpen, FiCheckCircle, FiLayers, FiX, FiActivity } from "react-icons/fi";

export default function SchoolDetails() {
  const { schoolName } = useParams();
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTeachers, setShowTeachers] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSchoolDetailsAPI(schoolName);
        setSchoolData(res.data);
      } catch (error) {
        console.error("Error fetching school details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [schoolName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!schoolData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">School not found</p>
      </div>
    );
  }

  const chartData = schoolData.studentStats.map(student => ({
    label: student.studentName,
    value: student.totalSimulations
  }));

  const completionData = [
    { label: "Completed", value: schoolData.completedSimulations },
    { label: "In Progress", value: schoolData.totalSimulations - schoolData.completedSimulations }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/admin")}
          className="mb-6 text-purple-600 hover:text-purple-700 font-medium text-sm"
        >
          ← Back to Schools
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{schoolData.schoolName}</h1>
          <p className="text-gray-600">School statistics and details</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Teachers</p>
                <p className="text-2xl font-bold text-gray-900">{schoolData.totalTeachers}</p>
              </div>
              <FiUsers className="text-purple-600 text-2xl" />
            </div>
            <button
              onClick={() => setShowTeachers(true)}
              className="mt-3 w-full text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              View Teachers →
            </button>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{schoolData.totalStudents}</p>
              </div>
              <FiBookOpen className="text-purple-600 text-2xl" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Simulations</p>
                <p className="text-2xl font-bold text-gray-900">{schoolData.totalSimulations}</p>
              </div>
              <FiLayers className="text-purple-600 text-2xl" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Simulations</p>
                <p className="text-2xl font-bold text-gray-900">{schoolData.avgSimulations}</p>
              </div>
              <FiActivity className="text-purple-600 text-2xl" />
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="h-80">
              <BarChart
                data={chartData}
                title="Simulations per Student"
              />
            </div>
          </Card>

          <Card>
            <div className="h-80">
              <PieChart
                data={completionData}
                title="Simulation Completion Status"
              />
            </div>
          </Card>
        </div>

        {/* Student Statistics Table */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Statistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Student Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Total Simulations</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Completed</th>
                </tr>
              </thead>
              <tbody>
                {schoolData.studentStats.map((student) => (
                  <tr key={student.studentId} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-900 font-medium">{student.studentName}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{student.studentEmail}</td>
                    <td className="py-3 px-4 text-sm text-center text-gray-900 font-medium">{student.totalSimulations}</td>
                    <td className="py-3 px-4 text-sm text-center text-purple-600 font-medium">{student.completedSimulations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Teachers Modal */}
      {showTeachers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-purple-50">
              <h2 className="text-xl font-semibold text-gray-900">Teachers at {schoolData.schoolName}</h2>
              <button
                onClick={() => setShowTeachers(false)}
                className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium"
              >
                ✕ Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {schoolData.teachers.map((teacher, idx) => (
                  <div key={idx} className="p-4 bg-purple-50 border border-purple-200 rounded-md">
                    <p className="font-medium text-gray-900">{teacher.name}</p>
                    <p className="text-sm text-gray-600">{teacher.email}</p>
                  </div>
                ))}
                {schoolData.teachers.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No teachers found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

