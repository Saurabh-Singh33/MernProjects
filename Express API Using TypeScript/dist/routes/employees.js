"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_1 = __importDefault(require("../models/employee"));
const router = express_1.default.Router();
// GET /employees - Get all employees
router.get("/", async (req, res) => {
    try {
        const employees = await employee_1.default.find();
        res.json(employees);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch employees" });
    }
});
// GET /employees/:id - Get employee by ID
router.get("/:id", async (req, res) => {
    try {
        const employee = await employee_1.default.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch employee" });
    }
});
// POST /employees - Create a new employee
router.post("/", async (req, res) => {
    try {
        const { name, email, department } = req.body;
        const newEmployee = employee_1.default.build({ name, email, department });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    }
    catch (error) {
        res.status(400).json({ message: "Failed to create employee" });
    }
});
// PUT /employees/:id - Update an employee
router.put("/:id", async (req, res) => {
    try {
        const updatedEmployee = await employee_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(updatedEmployee);
    }
    catch (error) {
        res.status(400).json({ message: "Failed to update employee" });
    }
});
// DELETE /employees/:id - Delete an employee
router.delete("/:id", async (req, res) => {
    try {
        const deletedEmployee = await employee_1.default.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json({ message: "Employee deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete employee" });
    }
});
exports.default = router;
