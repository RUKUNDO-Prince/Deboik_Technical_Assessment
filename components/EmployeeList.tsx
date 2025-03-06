"use client";

import React, { useEffect, useState } from "react";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

interface Props {
  onEdit: (employee: Employee) => void;
}

const EmployeeList: React.FC<Props> = ({ onEdit }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
      if (!response.ok) throw new Error("Failed to fetch employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      const response = await fetch(`/api/employees/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete employee");
      setEmployees((prev) => prev.filter((employee) => employee._id !== id));
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {employees.map((employee) => (
        <div key={employee._id} className="border p-4 rounded flex justify-between items-center">
          <div>
            <p className="font-bold">{employee.firstName} {employee.lastName}</p>
            <p>{employee.email}</p>
            <p>{employee.phone}</p>
            <p className="italic">{employee.role}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(employee)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(employee._id)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
