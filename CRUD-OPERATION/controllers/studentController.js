import Student from "../models/student.js";

// CREATE student
export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all students
export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// GET single student
export const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
};

// UPDATE student
export const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(student);
};

// DELETE student
export const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
};