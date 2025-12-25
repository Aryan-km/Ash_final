import mongoose from "mongoose";

const simulationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ["Beginner", "Intermediate", "Advanced"] },
  duration: { type: String, required: true },
  school: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Index for efficient querying by school
simulationSchema.index({ school: 1, isActive: 1 });

export default mongoose.model("TeacherSimulation", simulationSchema);
