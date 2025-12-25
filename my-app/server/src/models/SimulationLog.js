import mongoose from "mongoose";

const observationSchema = new mongoose.Schema({
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }
});

const simulationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  simulationName: { type: String, required: true },
  started: { type: Date, default: Date.now },
  ended: { type: Date, default: null },
  isCompleted: { type: Boolean, default: false },
  observations: [observationSchema]
}, {
  timestamps: true
});

// Ensure one simulation record per student per simulation
simulationSchema.index({ student: 1, simulationName: 1 }, { unique: true });

export default mongoose.model("Simulation", simulationSchema);
