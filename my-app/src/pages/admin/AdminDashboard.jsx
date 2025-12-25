import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSchoolsAPI } from "../../api/admin.api";
import Card from "../../components/Card";
import { BarChart, PieChart, LineChart } from "../../components/Charts";
import { FiLayers, FiUsers, FiBookOpen, FiActivity, FiPlus } from "react-icons/fi";
import { MdOutlineScience } from "react-icons/md";
import adminLottie from "../../assets/admin-lottie.json";
import Lottie from "lottie-react";

export default function AdminDashboard() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await getAllSchoolsAPI();
        setSchools(res.data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  const totalStats = schools.reduce((acc, school) => ({
    teachers: acc.teachers + school.teacherCount,
    students: acc.students + school.studentCount,
    simulations: acc.simulations + school.totalSimulations
  }), { teachers: 0, students: 0, simulations: 0 });

  const schoolChartData = schools.map(school => ({
    label: school.name,
    value: school.studentCount
  }));

  const simulationChartData = schools.map(school => ({
    label: school.name,
    value: school.totalSimulations
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const teacherRatioData = schools.map((school) => ({
    label: school.name,
    value: school.studentCount ? Number((school.teacherCount / (school.studentCount || 1)).toFixed(2)) : 0
  }));

  const avgSimData = schools.map((school) => ({
    label: school.name,
    value: school.avgSimulations
  }));

  const simsPerStudentData = schools.map((school) => ({
    label: school.name,
    value: school.studentCount ? Number((school.totalSimulations / (school.studentCount || 1)).toFixed(2)) : 0
  }));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage schools, teachers and system settings</p>
          </div>
          <div className="w-24">
            <Lottie animationData={adminLottie} loop />
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Schools</p>
                <p className="text-2xl font-bold text-gray-900">{schools.length}</p>
              </div>
              <FiLayers className="text-purple-600 text-2xl" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Teachers</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.teachers}</p>
              </div>
              <FiUsers className="text-purple-600 text-2xl" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.students}</p>
              </div>
              <FiBookOpen className="text-purple-600 text-2xl" />
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Simulations</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.simulations}</p>
              </div>
              <MdOutlineScience className="text-purple-600 text-2xl" />
            </div>
          </Card>
        </div>

        {schools.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="h-72">
                <BarChart data={schoolChartData} title="Students per School" />
              </div>
            </Card>
            <Card>
              <div className="h-72">
                <BarChart data={simulationChartData} title="Simulations per School" />
              </div>
            </Card>
            <Card>
              <div className="h-72">
                <LineChart data={avgSimData} title="Average Simulations per Student" />
              </div>
            </Card>
            <Card>
              <div className="h-72">
                <LineChart data={teacherRatioData} title="Teacher to Student Ratio" />
              </div>
            </Card>
            <Card>
              <div className="h-72">
                <PieChart data={simsPerStudentData} title="Simulations per Student Share" />
              </div>
            </Card>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => navigate("/admin/pending-approvals")}
            className="flex items-center gap-2 px-4 py-2 border border-yellow-300 text-yellow-700 bg-yellow-50 rounded-md hover:bg-yellow-100 transition-colors text-sm font-medium"
          >
            <FiClock /> Pending Approvals ({schools.reduce((acc, school) => acc + school.pendingStudents || 0, 0)})
          </button>
          <button
            onClick={() => navigate("/admin/create-teacher")}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            <FiPlus /> Create Teacher
          </button>
        </div>

        {/* Schools List */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">All Schools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map((school, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/admin/school/${encodeURIComponent(school.name)}`)}
                className="p-4 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 cursor-pointer transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{school.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Teachers: {school.teacherCount}</p>
                  <p>Students: {school.studentCount}</p>
                  <p>Simulations: {school.totalSimulations}</p>
                  <p className="text-purple-600 font-medium">Avg: {school.avgSimulations} per student</p>
                </div>
              </div>
            ))}
            {schools.length === 0 && (
              <p className="text-gray-500 text-center py-8 col-span-full">No schools found</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
