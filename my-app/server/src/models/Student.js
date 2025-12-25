import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  school: { type: String, required: true },
  phone: { type: String, default: "" },
  address: {
    line1: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip: { type: String, default: "" }
  },
  bio: { type: String, default: "" },
  avatarUrl: { type: String, default: "" },
  approved: { type: Boolean, default: false },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  role: { type: String, default: "STUDENT" }
});

export default mongoose.model("Student", studentSchema);
