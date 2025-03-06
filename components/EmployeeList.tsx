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

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {employees.map((employee) => (
        <div key={employee._id} className="border p-4 rounded">
          <p>{employee.firstName} {employee.lastName}</p>
          <p>{employee.email}</p>
          <p>{employee.phone}</p>
          <p>{employee.role}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
