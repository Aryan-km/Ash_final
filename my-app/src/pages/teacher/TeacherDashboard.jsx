import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPendingStudentsAPI, approveStudentAPI, getSchoolStatsAPI } from "../../api/teacher.api";
import Card from "../../components/Card";
import { BarChart, PieChart, LineChart } from "../../components/Charts";
import { FiUsers, FiClock, FiActivity, FiTrendingUp } from "react-icons/fi";

export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pendingRes, statsRes] = await Promise.all([
          getPendingStudentsAPI(),
          getSchoolStatsAPI()
        ]);
        setStudents(pendingRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveStudentAPI(id);
      setStudents(students.filter(s => s._id !== id));
      // Refresh stats after approval
      const statsRes = await getSchoolStatsAPI();
      setStats(statsRes.data);
    } catch (error) {
      console.error("Error approving student:", error);
    }
  };

  const statsCards = stats ? [
    { label: "Total Students", value: stats.totalStudents.toString(), icon: <FiUsers className="text-purple-600" /> },
    { label: "Pending Approval", value: students.length.toString(), icon: <FiClock className="text-yellow-600" /> },
    { label: "Total Simulations", value: stats.totalSimulations.toString(), icon: <FiActivity className="text-purple-600" /> },
    { label: "Avg per Student", value: stats.totalStudents > 0 ? Math.round(stats.totalSimulations / stats.totalStudents).toString() : "0", icon: <FiTrendingUp className="text-green-600" /> }
  ] : [
    { label: "Total Students", value: "0", icon: <FiUsers className="text-purple-600" /> },
    { label: "Pending Approval", value: "0", icon: <FiClock className="text-yellow-600" /> },
    { label: "Total Simulations", value: "0", icon: <FiActivity className="text-purple-600" /> },
    { label: "Avg per Student", value: "0", icon: <FiTrendingUp className="text-green-600" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your students and monitor their progress</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((stat, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className="text-2xl text-gray-400">{stat.icon}</div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/teacher/simulations" className="block">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-gray-300">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-50 rounded-lg mr-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Manage Simulations</h3>
                        <p className="text-sm text-gray-500">Create and manage interactive simulations</p>
                      </div>
                    </div>
                  </Card>
                </Link>

                <Link to="/teacher/reports" className="block">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200 hover:border-gray-300">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-50 rounded-lg mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">View Reports</h3>
                        <p className="text-sm text-gray-500">Monitor student progress and analytics</p>
                      </div>
                    </div>
                  </Card>
                </Link>

                <Card className="cursor-pointer border border-gray-200 hover:border-gray-300 hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-50 rounded-lg mr-4">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
                      <p className="text-sm text-gray-500">Configure school and account settings</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Analytics Charts */}
            {stats && stats.charts && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Line Chart - Simulation Completion Over Time */}
                  <Card className="border border-gray-200">
                    <div className="h-72">
                      <LineChart
                        data={stats.charts.lineChart || []}
                        title="Simulation Completions (Last 30 Days)"
                      />
                    </div>
                  </Card>

                  {/* Pie Chart - Category Distribution */}
                  <Card className="border border-gray-200">
                    <div className="h-72">
                      <PieChart
                        data={stats.charts.pieChart || []}
                        title="Simulation Categories"
                      />
                    </div>
                  </Card>

                  {/* Bar Chart - Student Performance */}
                  <Card className="border border-gray-200">
                    <div className="h-72">
                      <BarChart
                        data={stats.charts.barChart || []}
                        title="Top Performing Students"
                      />
                    </div>
                  </Card>

                  {/* Bar Chart - Weekly Activity */}
                  <Card className="border border-gray-200">
                    <div className="h-72">
                      <BarChart
                        data={stats.charts.weeklyActivity || []}
                        title="Weekly Activity"
                      />
                    </div>
                  </Card>
                </div>

                {/* Summary Stats */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                        <p className="text-2xl font-bold text-green-600">{stats.completionRate}%</p>
                      </div>
                      <FiTrendingUp className="text-green-600 text-2xl" />
                    </div>
                  </Card>

                  <Card className="border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Students</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {stats.studentStats.filter(s => s.totalSimulations > 0).length}
                        </p>
                      </div>
                      <FiUsers className="text-blue-600 text-2xl" />
                    </div>
                  </Card>

                  <Card className="border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Avg per Student</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {stats.totalStudents > 0 ? Math.round(stats.totalSimulations / stats.totalStudents) : 0}
                        </p>
                      </div>
                      <FiActivity className="text-purple-600 text-2xl" />
                    </div>
                  </Card>
                </div>
              </div>
            )}
            {/* Student Statistics */}
            {stats && stats.studentStats && stats.studentStats.length > 0 && (
              <Card className="mb-8 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Student Statistics</h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {stats.studentStats.length} students
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Total Simulations</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Unique Simulations</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stats.studentStats.map((student) => (
                        <tr key={student.studentId} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4 text-sm text-gray-900 font-medium">{student.studentName}</td>
                          <td className="py-4 px-4 text-sm text-gray-500">{student.studentEmail}</td>
                          <td className="py-4 px-4 text-sm text-center text-gray-900">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {student.totalSimulations}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-center text-gray-900">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {student.uniqueSimulations}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
            {/* Pending Approvals */}
            <Card className="border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Pending Approvals</h2>
                {students.length > 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {students.length} pending
                  </span>
                )}
              </div>
              {students.length > 0 ? (
                <div className="space-y-4">
                  {students.map((s) => (
                    <div key={s._id} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{s.name}</p>
                          <p className="text-sm text-gray-500">{s.email}</p>
                          <p className="text-xs text-gray-400">{s.school}</p>
                        </div>
                      </div>
                      <button
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                        onClick={() => handleApprove(s._id)}
                      >
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Approve
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">All caught up!</h3>
                  <p className="mt-1 text-sm text-gray-500">No pending student approvals.</p>
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
