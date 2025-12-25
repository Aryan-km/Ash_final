import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
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
  role: { type: String, default: "TEACHER" }
});

export default mongoose.model("Teacher", teacherSchema);
