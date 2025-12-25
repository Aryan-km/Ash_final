import Student from "../models/Student.js";
import SimulationLog from "../models/SimulationLog.js";
import TeacherSimulation from "../models/Simulation.js";
import Teacher from "../models/Teacher.js";

export const getUnapprovedStudents = async (req, res) => {
  const students = await Student.find({
    school: req.user.school,
    approved: false
  });
  res.json(students);
};

export const approveStudent = async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, {
    approved: true,
    approvedBy: req.user.id
  });
  res.json({ message: "Student approved" });
};

export const getMyProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id).select("-password");
    res.json(teacher);
  } catch (error) {
    console.error("Error getting teacher profile:", error);
    res.status(500).json({ error: "Failed to get profile" });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const { name, phone, address = {}, bio, avatarUrl } = req.body;
    const teacher = await Teacher.findByIdAndUpdate(
      req.user.id,
      {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(bio !== undefined && { bio }),
        ...(avatarUrl !== undefined && { avatarUrl }),
        ...(address && {
          address: {
            line1: address.line1 || "",
            city: address.city || "",
            state: address.state || "",
            zip: address.zip || ""
          }
        })
      },
      { new: true }
    ).select("-password");

    res.json(teacher);
  } catch (error) {
    console.error("Error updating teacher profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const getSchoolStats = async (req, res) => {
  try {
    const teacherSchool = req.user.school;
    
    // Get all approved students from the same school
    const students = await Student.find({
      school: teacherSchool,
      approved: true
    });

    // Get simulations for all students in the school
    const studentIds = students.map(s => s._id);
    const simulations = await SimulationLog.find({
      student: { $in: studentIds }
    }).populate('student', 'name email');

    // Count simulations per student
    const simulationCounts = {};
    simulations.forEach(sim => {
      const studentId = sim.student._id.toString();
      if (!simulationCounts[studentId]) {
        simulationCounts[studentId] = {
          studentId: studentId,
          studentName: sim.student.name,
          studentEmail: sim.student.email,
          totalSimulations: 0,
          uniqueSimulations: new Set(),
          completedSimulations: 0,
          simulations: []
        };
      }
      simulationCounts[studentId].totalSimulations++;
      simulationCounts[studentId].uniqueSimulations.add(sim.simulationName);
      if (sim.isCompleted) {
        simulationCounts[studentId].completedSimulations++;
      }
      simulationCounts[studentId].simulations.push({
        name: sim.simulationName,
        started: sim.started,
        ended: sim.ended,
        isCompleted: sim.isCompleted
      });
    });

    // Convert to array format
    const studentStats = students.map(student => {
      const stats = simulationCounts[student._id.toString()] || {
        studentId: student._id.toString(),
        studentName: student.name,
        studentEmail: student.email,
        totalSimulations: 0,
        uniqueSimulations: new Set(),
        simulations: []
      };
      
      return {
        studentId: stats.studentId,
        studentName: stats.studentName,
        studentEmail: stats.studentEmail,
        totalSimulations: stats.totalSimulations,
        uniqueSimulations: stats.uniqueSimulations.size,
        completedSimulations: stats.completedSimulations,
        simulations: stats.simulations
      };
    });

    // Calculate additional statistics for graphs
    const completedSimulations = simulations.filter(s => s.isCompleted);
    const totalCompletedSimulations = completedSimulations.length;

    // Simulation completion over time (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentSimulations = simulations.filter(s => new Date(s.started) >= thirtyDaysAgo);

    const completionData = {};
    recentSimulations.forEach(sim => {
      const date = new Date(sim.started).toISOString().split('T')[0];
      if (!completionData[date]) {
        completionData[date] = { started: 0, completed: 0 };
      }
      completionData[date].started++;
      if (sim.isCompleted) {
        completionData[date].completed++;
      }
    });

    const lineChartData = Object.entries(completionData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => ({
        label: new Date(date).toLocaleDateString(),
        value: data.completed,
        total: data.started
      }));

    // Category distribution (pie chart)
    const categoryData = {};
    simulations.forEach(sim => {
      // Extract category from simulation name (basic categorization)
      let category = 'Other';
      if (sim.simulationName.toLowerCase().includes('ohm') || sim.simulationName.toLowerCase().includes('circuit')) {
        category = 'Electricity';
      } else if (sim.simulationName.toLowerCase().includes('pendulum') || sim.simulationName.toLowerCase().includes('forces')) {
        category = 'Mechanics';
      } else if (sim.simulationName.toLowerCase().includes('wave')) {
        category = 'Waves';
      } else if (sim.simulationName.toLowerCase().includes('energy')) {
        category = 'Thermodynamics';
      }

      categoryData[category] = (categoryData[category] || 0) + 1;
    });

    const pieChartData = Object.entries(categoryData).map(([label, value]) => ({
      label,
      value
    }));

    // Student performance bar chart (top performers)
    const studentPerformanceData = studentStats
      .sort((a, b) => b.totalSimulations - a.totalSimulations)
      .slice(0, 10)
      .map(student => ({
        label: student.studentName.split(' ')[0], // First name only for brevity
        value: student.totalSimulations,
        completed: student.completedSimulations
      }));

    // Difficulty distribution
    const difficultyData = [
      { label: 'Beginner', value: Math.floor(Math.random() * 20) + 10 }, // Mock data for now
      { label: 'Intermediate', value: Math.floor(Math.random() * 15) + 8 },
      { label: 'Advanced', value: Math.floor(Math.random() * 10) + 5 }
    ];

    // Weekly activity data
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const daySimulations = simulations.filter(sim => {
        const simDate = new Date(sim.started);
        return simDate.toDateString() === date.toDateString();
      }).length;

      weeklyData.push({
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        value: daySimulations
      });
    }

    res.json({
      totalStudents: students.length,
      totalSimulations: simulations.length,
      totalCompletedSimulations,
      completionRate: simulations.length > 0 ? Math.round((totalCompletedSimulations / simulations.length) * 100) : 0,
      studentStats: studentStats,
      charts: {
        lineChart: lineChartData,
        pieChart: pieChartData,
        barChart: studentPerformanceData,
        weeklyActivity: weeklyData,
        difficultyDistribution: difficultyData
      }
    });
  } catch (error) {
    console.error("Error fetching school stats:", error);
    res.status(500).json({ error: "Failed to fetch school statistics" });
  }
};

// Simulation Management Endpoints
export const createSimulation = async (req, res) => {
  try {
    const { name, description, url, category, difficulty, duration } = req.body;

    // Validate required fields
    if (!name || !description || !url || !category || !difficulty || !duration) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create simulation for the teacher's school
    const simulation = await TeacherSimulation.create({
      name,
      description,
      url,
      category,
      difficulty,
      duration,
      school: req.user.school,
      createdBy: req.user.id
    });

    // Populate teacher info for response
    await simulation.populate('createdBy', 'name email');

    res.status(201).json(simulation);
  } catch (error) {
    console.error("Error creating simulation:", error);
    res.status(500).json({ error: "Failed to create simulation" });
  }
};

export const getSchoolSimulations = async (req, res) => {
  try {
    const simulations = await TeacherSimulation.find({
      school: req.user.school,
      isActive: true
    }).populate('createdBy', 'name email').sort({ createdAt: -1 });

    res.json(simulations);
  } catch (error) {
    console.error("Error fetching simulations:", error);
    res.status(500).json({ error: "Failed to fetch simulations" });
  }
};

export const updateSimulation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, url, category, difficulty, duration, isActive } = req.body;

    const simulation = await TeacherSimulation.findOneAndUpdate(
      { _id: id, school: req.user.school },
      {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(url !== undefined && { url }),
        ...(category !== undefined && { category }),
        ...(difficulty !== undefined && { difficulty }),
        ...(duration !== undefined && { duration }),
        ...(isActive !== undefined && { isActive })
      },
      { new: true }
    ).populate('createdBy', 'name email');

    if (!simulation) {
      return res.status(404).json({ error: "Simulation not found" });
    }

    res.json(simulation);
  } catch (error) {
    console.error("Error updating simulation:", error);
    res.status(500).json({ error: "Failed to update simulation" });
  }
};

export const deleteSimulation = async (req, res) => {
  try {
    const { id } = req.params;

    const simulation = await TeacherSimulation.findOneAndUpdate(
      { _id: id, school: req.user.school },
      { isActive: false },
      { new: true }
    );

    if (!simulation) {
      return res.status(404).json({ error: "Simulation not found" });
    }

    res.json({ message: "Simulation deleted successfully" });
  } catch (error) {
    console.error("Error deleting simulation:", error);
    res.status(500).json({ error: "Failed to delete simulation" });
  }
};

// Get detailed student reports for reports page
export const getStudentReports = async (req, res) => {
  try {
    const teacherSchool = req.user.school;

    // Get all approved students from the same school
    const students = await Student.find({
      school: teacherSchool,
      approved: true
    }).select('-password');

    // Get simulations for all students in the school
    const studentIds = students.map(s => s._id);
    const simulations = await SimulationLog.find({
      student: { $in: studentIds }
    }).populate('student', 'name email').sort({ started: -1 });

    // Group simulations by student with detailed info
    const studentReports = students.map(student => {
      const studentSimulations = simulations.filter(sim =>
        sim.student._id.toString() === student._id.toString()
      );

      const completedSimulations = studentSimulations.filter(sim => sim.isCompleted);
      const totalTimeSpent = studentSimulations.reduce((total, sim) => {
        if (sim.ended && sim.started) {
          return total + (new Date(sim.ended) - new Date(sim.started));
        }
        return total;
      }, 0);

      const avgTimePerSimulation = completedSimulations.length > 0
        ? Math.round(totalTimeSpent / completedSimulations.length / 1000 / 60) // in minutes
        : 0;

      return {
        studentId: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        address: student.address,
        bio: student.bio,
        avatarUrl: student.avatarUrl,
        registeredDate: student.createdAt,
        approvedDate: student.approvedAt,
        approvedBy: student.approvedBy,
        totalSimulations: studentSimulations.length,
        completedSimulations: completedSimulations.length,
        completionRate: studentSimulations.length > 0
          ? Math.round((completedSimulations.length / studentSimulations.length) * 100)
          : 0,
        totalTimeSpent: Math.round(totalTimeSpent / 1000 / 60), // in minutes
        avgTimePerSimulation,
        simulations: studentSimulations.map(sim => ({
          name: sim.simulationName,
          started: sim.started,
          ended: sim.ended,
          duration: sim.ended && sim.started
            ? Math.round((new Date(sim.ended) - new Date(sim.started)) / 1000 / 60)
            : null,
          isCompleted: sim.isCompleted,
          observations: sim.observations
        }))
      };
    });

    res.json({
      schoolName: teacherSchool,
      totalStudents: students.length,
      studentReports: studentReports.sort((a, b) => b.totalSimulations - a.totalSimulations)
    });
  } catch (error) {
    console.error("Error fetching student reports:", error);
    res.status(500).json({ error: "Failed to fetch student reports" });
  }
};
