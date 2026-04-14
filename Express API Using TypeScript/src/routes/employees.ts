import express, { Request, Response } from "express";
import Employee, { EmployeeAttrs, EmployeeDocument } from "../models/employee";

const router = express.Router();

// GET /employees - Get all employees
router.get(
  "/",
  async (
    req: Request,
    res: Response<EmployeeDocument[] | { message: string }>,
  ) => {
    try {
      const employees = await Employee.find();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch employees" });
    }
  },
);

// GET /employees/:id - Get employee by ID
router.get(
  "/:id",
  async (
    req: Request<{ id: string }>,
    res: Response<EmployeeDocument | { message: string }>,
  ) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch employee" });
    }
  },
);

// POST /employees - Create a new employee
router.post(
  "/",
  async (
    req: Request<{}, {}, EmployeeAttrs>,
    res: Response<EmployeeDocument | { message: string }>,
  ) => {
    try {
      const { name, email, department } = req.body;
      const newEmployee = Employee.build({ name, email, department });
      await newEmployee.save();
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(400).json({ message: "Failed to create employee" });
    }
  },
);

// PUT /employees/:id - Update an employee
router.put(
  "/:id",
  async (
    req: Request<{ id: string }, {}, Partial<EmployeeAttrs>>,
    res: Response<EmployeeDocument | { message: string }>,
  ) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true },
      );
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(updatedEmployee);
    } catch (error) {
      res.status(400).json({ message: "Failed to update employee" });
    }
  },
);

// DELETE /employees/:id - Delete an employee
router.delete(
  "/:id",
  async (req: Request<{ id: string }>, res: Response<{ message: string }>) => {
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
      if (!deletedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json({ message: "Employee deleted" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete employee" });
    }
  },
);

export default router;
