import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStudentReportsAPI } from "../../api/teacher.api";
import Card from "../../components/Card";

export default function TeacherReports() {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingPDF, setGeneratingPDF] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await getStudentReportsAPI();
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async (studentId, studentName) => {
    try {
      setGeneratingPDF(studentId);

      // Find the student report
      const studentReport = reports.studentReports.find(r => r.studentId === studentId);
      if (!studentReport) return;

      // Create PDF content
      const pdfContent = generateStudentPDF(studentReport);

      // Create blob and download
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${studentName.replace(' ', '_')}_Report.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate report");
    } finally {
      setGeneratingPDF(null);
    }
  };

  const generateStudentPDF = (student) => {
    let content = `STUDENT REPORT\n`;
    content += `================\n\n`;

    content += `Student Information:\n`;
    content += `- Name: ${student.name}\n`;
    content += `- Email: ${student.email}\n`;
    content += `- Phone: ${student.phone || 'Not provided'}\n`;
    content += `- Registration Date: ${new Date(student.registeredDate).toLocaleDateString()}\n`;
    content += `- Approved Date: ${student.approvedDate ? new Date(student.approvedDate).toLocaleDateString() : 'Not approved yet'}\n\n`;

    content += `Address:\n`;
    if (student.address && (student.address.line1 || student.address.city)) {
      content += `- ${student.address.line1 || ''}\n`;
      content += `- ${student.address.city || ''}, ${student.address.state || ''} ${student.address.zip || ''}\n`;
    } else {
      content += `- Not provided\n`;
    }
    content += `\n`;

    content += `Performance Summary:\n`;
    content += `- Total Simulations: ${student.totalSimulations}\n`;
    content += `- Completed Simulations: ${student.completedSimulations}\n`;
    content += `- Completion Rate: ${student.completionRate}%\n`;
    content += `- Total Time Spent: ${student.totalTimeSpent} minutes\n`;
    content += `- Average Time per Simulation: ${student.avgTimePerSimulation} minutes\n\n`;

    content += `Simulation Details:\n`;
    content += `==================\n\n`;

    student.simulations.forEach((sim, index) => {
      content += `${index + 1}. ${sim.name}\n`;
      content += `   - Started: ${new Date(sim.started).toLocaleString()}\n`;
      content += `   - Status: ${sim.isCompleted ? 'Completed' : 'In Progress'}\n`;
      if (sim.ended) {
        content += `   - Ended: ${new Date(sim.ended).toLocaleString()}\n`;
      }
      if (sim.duration) {
        content += `   - Duration: ${sim.duration} minutes\n`;
      }

      if (sim.observations && sim.observations.length > 0) {
        content += `   - Observations:\n`;
        sim.observations.forEach((obs, obsIndex) => {
          content += `     ${obsIndex + 1}. ${obs.text}\n`;
          content += `        (${new Date(obs.timestamp).toLocaleString()})\n`;
        });
      }
      content += `\n`;
    });

    content += `Report Generated: ${new Date().toLocaleString()}\n`;
    content += `School: ${reports.schoolName}\n`;

    return content;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student reports...</p>
        </div>
      </div>
    );
  }

  if (!reports) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load reports</p>
          <button
            onClick={fetchReports}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Reports</h1>
            <p className="text-gray-600">Detailed performance reports for all students</p>
            <p className="text-sm text-gray-500 mt-1">{reports.schoolName} • {reports.totalStudents} students</p>
          </div>
          <button
            onClick={() => navigate("/teacher")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{reports.totalStudents}</p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
          </Card>
          <Card className="border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {reports.studentReports.reduce((sum, r) => sum + r.totalSimulations, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Simulations</p>
            </div>
          </Card>
          <Card className="border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(reports.studentReports.reduce((sum, r) => sum + r.completionRate, 0) / reports.totalStudents)}%
              </p>
              <p className="text-sm text-gray-600">Avg Completion Rate</p>
            </div>
          </Card>
          <Card className="border border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(reports.studentReports.reduce((sum, r) => sum + r.totalTimeSpent, 0) / reports.totalStudents)}m
              </p>
              <p className="text-sm text-gray-600">Avg Time Spent</p>
            </div>
          </Card>
        </div>

        {/* Students List */}
        <div className="space-y-4">
          {reports.studentReports.map((student, index) => (
            <Card key={student.studentId} className="border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {student.name}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Rank #{index + 1}
                      </span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-2">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {student.email}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8v4a4 4 0 01-8 0v-4m4-4v4m0 0V7" />
                        </svg>
                        {student.phone || "No phone"}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Registered {new Date(student.registeredDate).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Simulations</p>
                        <p className="font-semibold text-gray-900">{student.totalSimulations}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Completed</p>
                        <p className="font-semibold text-green-600">{student.completedSimulations}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Completion Rate</p>
                        <p className="font-semibold text-blue-600">{student.completionRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Time</p>
                        <p className="font-semibold text-purple-600">{student.totalTimeSpent}m</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 ml-4">
                  <button
                    onClick={() => generatePDF(student.studentId, student.name)}
                    disabled={generatingPDF === student.studentId}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {generatingPDF === student.studentId ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Report
                      </>
                    )}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
