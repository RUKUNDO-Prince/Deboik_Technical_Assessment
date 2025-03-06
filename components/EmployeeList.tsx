"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

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

const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await fetch("/api/employees");
  if (!response.ok) throw new Error("Failed to fetch employees");
  return response.json();
};

const deleteEmployee = async (id: string) => {
  const response = await fetch(`/api/employees/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete employee");
};

const EmployeeList: React.FC<Props> = ({ onEdit }) => {
  const queryClient = useQueryClient();
  const { data: employees, isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500">{(error as Error).message}</p>}
      {employees?.map((employee) => (
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
              disabled={deleteMutation.isLoading}
            >
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
