import bcrypt from "bcryptjs";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import Simulation from "../models/SimulationLog.js";

export const createTeacher = async (req, res) => {
  const { name, email, password, school, phone = "", address = {}, bio = "", avatarUrl = "" } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  await Teacher.create({
    name,
    email,
    password: hashed,
    school,
    phone,
    address: {
      line1: address.line1 || "",
      city: address.city || "",
      state: address.state || "",
      zip: address.zip || ""
    },
    bio,
    avatarUrl
  });
  res.json({ message: "Teacher created" });
};

export const getTeachers = async (req, res) => {
  res.json(await Teacher.find());
};

// Get all distinct schools
export const getAllSchools = async (req, res) => {
  try {
    const schools = await Student.distinct("school");
    const schoolsWithData = await Promise.all(
      schools.map(async (school) => {
        const teachers = await Teacher.countDocuments({ school });
        const students = await Student.countDocuments({ school, approved: true });
        const simulations = await Simulation.countDocuments({
          student: { $in: await Student.find({ school, approved: true }).distinct("_id") }
        });
        const avgSimulations = students > 0 ? (simulations / students).toFixed(2) : 0;

        return {
          name: school,
          teacherCount: teachers,
          studentCount: students,
          totalSimulations: simulations,
          avgSimulations: parseFloat(avgSimulations)
        };
      })
    );

    res.json(schoolsWithData);
  } catch (error) {
    console.error("Error getting schools:", error);
    res.status(500).json({ error: "Failed to fetch schools" });
  }
};

// Get school details
export const getSchoolDetails = async (req, res) => {
  try {
    const { schoolName } = req.params;
    
    // Get teachers
    const teachers = await Teacher.find({ school: schoolName }).select("name email");
    
    // Get students
    const students = await Student.find({ school: schoolName, approved: true });
    const studentIds = students.map(s => s._id);
    
    // Get simulations
    const simulations = await Simulation.find({
      student: { $in: studentIds }
    }).populate('student', 'name email');

    // Calculate statistics
    const totalSimulations = simulations.length;
    const completedSimulations = simulations.filter(s => s.isCompleted).length;
    const avgSimulations = students.length > 0 ? (totalSimulations / students.length).toFixed(2) : 0;
    
    // Group simulations by student
    const studentStats = students.map(student => {
      const studentSims = simulations.filter(s => s.student._id.toString() === student._id.toString());
      return {
        studentId: student._id,
        studentName: student.name,
        studentEmail: student.email,
        totalSimulations: studentSims.length,
        completedSimulations: studentSims.filter(s => s.isCompleted).length,
        avgSimulations: studentSims.length > 0 ? (studentSims.length / studentSims.length).toFixed(2) : 0
      };
    });

    res.json({
      schoolName,
      teachers,
      totalTeachers: teachers.length,
      students,
      totalStudents: students.length,
      totalSimulations,
      completedSimulations,
      avgSimulations: parseFloat(avgSimulations),
      studentStats
    });
  } catch (error) {
    console.error("Error getting school details:", error);
    res.status(500).json({ error: "Failed to fetch school details" });
  }
};

// Get all pending students across all schools for admin
export const getAllPendingStudents = async (req, res) => {
  try {
    const pendingStudents = await Student.find({
      approved: false
    }).populate('approvedBy', 'name email').sort({ createdAt: -1 });

    res.json(pendingStudents);
  } catch (error) {
    console.error("Error getting pending students:", error);
    res.status(500).json({ error: "Failed to fetch pending students" });
  }
};

// Approve or reject student (admin version)
export const adminApproveRejectStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, approvedBy } = req.body; // action: 'approve' or 'reject'

    if (action === 'approve') {
      await Student.findByIdAndUpdate(id, {
        approved: true,
        approvedBy: approvedBy
      });
      res.json({ message: "Student approved successfully" });
    } else if (action === 'reject') {
      await Student.findByIdAndDelete(id);
      res.json({ message: "Student rejected and removed" });
    } else {
      res.status(400).json({ error: "Invalid action" });
    }
  } catch (error) {
    console.error("Error processing student approval:", error);
    res.status(500).json({ error: "Failed to process student approval" });
  }
};
