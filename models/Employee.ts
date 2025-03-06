import mongoose, { Document, Schema } from 'mongoose';

interface Employee extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Staff';
}

const EmployeeSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, required: true, enum: ['Admin', 'Staff'] },
});

const Employee = mongoose.models.Employee || mongoose.model<Employee>('Employee', EmployeeSchema);

export default Employee;
