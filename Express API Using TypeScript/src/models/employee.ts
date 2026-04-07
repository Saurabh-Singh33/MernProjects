import mongoose, { Document, Model, Schema } from "mongoose";

export interface EmployeeAttrs {
  name: string;
  email: string;
  department: string;
}

export interface EmployeeDocument extends Document {
  name: string;
  email: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
}

interface EmployeeModel extends Model<EmployeeDocument> {
  build(attrs: EmployeeAttrs): EmployeeDocument;
}

const employeeSchema = new Schema<EmployeeDocument, EmployeeModel>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    department: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);

employeeSchema.statics.build = (attrs: EmployeeAttrs) => {
  return new Employee(attrs);
};

const Employee = mongoose.model<EmployeeDocument, EmployeeModel>(
  "Employee",
  employeeSchema,
);

export default Employee;
