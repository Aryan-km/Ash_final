import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role, school:user.school }, process.env.JWT_SECRET);

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user =
    (await Admin.findOne({ email })) ||
    (await Teacher.findOne({ email })) ||
    (await Student.findOne({ email }));

  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Wrong password" });

  if (user.role === "STUDENT" && !user.approved)
    return res.status(403).json({ message: "Not approved yet" });

  res.json({ token: generateToken(user), role: user.role });
};

export const registerStudent = async (req, res) => {
  const { name, email, password, school } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  await Student.create({ name, email, password: hashed, school });
  res.json({ message: "Registration successful, awaiting approval" });
};
