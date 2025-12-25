import SimulationLog from "../models/SimulationLog.js";
import TeacherSimulation from "../models/Simulation.js";
import Student from "../models/Student.js";

// Start or get existing simulation
export const startSimulation = async (req, res) => {
  try {
    const { simulationName } = req.body;
    
    // Find or create simulation (ensures one per student per simulation)
    let simulation = await SimulationLog.findOne({
      student: req.user.id,
      simulationName
    });

    if (!simulation) {
      // Create new simulation record
      simulation = await SimulationLog.create({
        student: req.user.id,
        simulationName,
        started: new Date()
      });
    }

    res.json(simulation);
  } catch (error) {
    console.error("Error starting simulation:", error);
    res.status(500).json({ error: "Failed to start simulation" });
  }
};

// Get a specific simulation
export const getSimulation = async (req, res) => {
  try {
    const { simulationName } = req.params;
    const simulation = await SimulationLog.findOne({
      student: req.user.id,
      simulationName
    }).populate('student', 'name email');

    if (!simulation) {
      return res.status(404).json({ error: "Simulation not found" });
    }

    res.json(simulation);
  } catch (error) {
    console.error("Error getting simulation:", error);
    res.status(500).json({ error: "Failed to get simulation" });
  }
};

// Add observation to simulation
export const addObservation = async (req, res) => {
  try {
    const { simulationName, observation } = req.body;
    
    const simulation = await SimulationLog.findOne({
      student: req.user.id,
      simulationName
    });

    if (!simulation) {
      return res.status(404).json({ error: "Simulation not found. Please start the simulation first." });
    }

    simulation.observations.push({
      text: observation,
      student: req.user.id,
      timestamp: new Date()
    });

    await simulation.save();
    res.json(simulation);
  } catch (error) {
    console.error("Error adding observation:", error);
    res.status(500).json({ error: "Failed to add observation" });
  }
};

// Mark simulation as done
export const markSimulationDone = async (req, res) => {
  try {
    const { simulationName } = req.body;
    
    const simulation = await SimulationLog.findOne({
      student: req.user.id,
      simulationName
    });

    if (!simulation) {
      return res.status(404).json({ error: "Simulation not found" });
    }

    simulation.isCompleted = true;
    simulation.ended = new Date();
    await simulation.save();

    res.json(simulation);
  } catch (error) {
    console.error("Error marking simulation as done:", error);
    res.status(500).json({ error: "Failed to mark simulation as done" });
  }
};

// Get recent simulations
export const getRecentSimulations = async (req, res) => {
  try {
    const simulations = await SimulationLog.find({ student: req.user.id })
      .sort({ started: -1 })
      .limit(5)
      .populate('student', 'name email');
    res.json(simulations);
  } catch (error) {
    console.error("Error getting recent simulations:", error);
    res.status(500).json({ error: "Failed to get recent simulations" });
  }
};

// Get my profile
export const getMyProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    res.json(student);
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ error: "Failed to get profile" });
  }
};

// Update my profile
export const updateMyProfile = async (req, res) => {
  try {
    const { name, phone, address = {}, bio, avatarUrl } = req.body;
    const student = await Student.findByIdAndUpdate(
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

    res.json(student);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// Get all available simulations for student (static + teacher-created for their school)
export const getAllAvailableSimulations = async (req, res) => {
  try {
    // Get student to find their school
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Get teacher-created simulations for the student's school
    const teacherSimulations = await TeacherSimulation.find({
      school: student.school,
      isActive: true
    }).populate('createdBy', 'name');

    // Define static simulations (same as in frontend)
    const staticSimulations = [
      {
        id: 1,
        name: "Ohm's Law",
        url: "https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_en.html",
        description: "Explore the relationship between voltage, current, and resistance",
        category: "Electricity",
        difficulty: "Beginner",
        duration: "30 min",
        isStatic: true
      },
      {
        id: 2,
        name: "Pendulum Lab",
        url: "https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_en.html",
        description: "Investigate the physics of pendulums and harmonic motion",
        category: "Mechanics",
        difficulty: "Intermediate",
        duration: "45 min",
        isStatic: true
      },
      {
        id: 3,
        name: "Wave Interference",
        url: "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_en.html",
        description: "Explore wave interference patterns and superposition",
        category: "Waves",
        difficulty: "Intermediate",
        duration: "40 min",
        isStatic: true
      },
      {
        id: 4,
        name: "Circuit Construction Kit",
        url: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html",
        description: "Build and test electrical circuits with virtual components",
        category: "Electricity",
        difficulty: "Advanced",
        duration: "60 min",
        isStatic: true
      },
      {
        id: 5,
        name: "Forces and Motion",
        url: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_en.html",
        description: "Learn about forces, motion, and Newton's laws",
        category: "Mechanics",
        difficulty: "Beginner",
        duration: "35 min",
        isStatic: true
      },
      {
        id: 6,
        name: "Energy Forms and Changes",
        url: "https://phet.colorado.edu/sims/html/energy-forms-and-changes/latest/energy-forms-and-changes_en.html",
        description: "Explore different forms of energy and energy transformations",
        category: "Thermodynamics",
        difficulty: "Intermediate",
        duration: "50 min",
        isStatic: true
      }
    ];

    // Get student's simulation logs to check completion status
    const simulationLogs = await SimulationLog.find({ student: req.user.id });
    const completedSimulations = new Set(
      simulationLogs.filter(log => log.isCompleted).map(log => log.simulationName)
    );

    // Combine and format simulations
    const allSimulations = [
      ...staticSimulations.map(sim => ({
        ...sim,
        isCompleted: completedSimulations.has(sim.name)
      })),
      ...teacherSimulations.map(sim => ({
        id: sim._id,
        name: sim.name,
        url: sim.url,
        description: sim.description,
        category: sim.category,
        difficulty: sim.difficulty,
        duration: sim.duration,
        isStatic: false,
        isCompleted: completedSimulations.has(sim.name),
        assigned: true,
        createdBy: sim.createdBy.name
      }))
    ];

    res.json(allSimulations);
  } catch (error) {
    console.error("Error fetching available simulations:", error);
    res.status(500).json({ error: "Failed to fetch available simulations" });
  }
};
