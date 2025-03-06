"use client";

import { useState, useEffect } from "react";

interface Employee {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

interface Props {
  employee?: Employee | null;
  onClose: () => void;
}

const EmployeeForm: React.FC<Props> = ({ employee, onClose }) => {
  const [formData, setFormData] = useState<Employee>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Staff",
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = employee ? "PUT" : "POST";
    const url = employee ? `/api/employees/${employee._id}` : "/api/employees";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save employee");

      onClose(); // Hide form after submission
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="border p-4 rounded mb-4">
      <h2 className="text-xl font-bold mb-2">{employee ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="border p-2 w-full" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border p-2 w-full" required />
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <select id="role" name="role" value={formData.role} onChange={handleChange} className="border p-2 w-full" required>
          <option value="Staff">Staff</option>
          <option value="Admin">Admin</option>
        </select>
        <div className="flex space-x-2">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            {employee ? "Update" : "Add"}
          </button>
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
