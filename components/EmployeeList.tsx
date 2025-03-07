"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
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

interface EmployeeListProps {
  onEdit: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onEdit }) => {
  const queryClient = useQueryClient();
  const {
    data: employees,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter employees based on search and role
  const filteredEmployees =
    employees?.filter((employee) => {
      return (
        (roleFilter === "All" || employee.role === roleFilter) &&
        `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }) || [];

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{(error as Error).message}</p>}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-x-4 mb-10">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-5">
          <label htmlFor="roleFilter" className="sr-only">
            Filter by role
          </label>
          <select
            id="roleFilter"
            className="border px-4 py-2 rounded"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
          </select>

          <div className="border px-4 py-2 rounded flex items-center justify-between">
            <input
              type="text"
              placeholder="Enter Staff Name Here..."
              className="outline-none select-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoIosSearch />
          </div>
        </div>
        {/* PAGINATION */}
        <div className="flex gap-2 items-center mt-4">
          <p className="text-sm">
            <span className="border py-1 px-2 rounded">{currentPage}</span> of{" "}
            {totalPages || 1}
          </p>
          <div className="flex gap-1">
            <button
              className="rounded-full p-1 text-white bg-[#2BDA53]"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              title="Previous Page"
            >
              <GrFormPrevious />
            </button>
            <button
              className="rounded-full p-1 text-white bg-[#2BDA53]"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              title="Next Page"
            >
              <GrFormNext />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[#203f53] border-separate border-spacing-y-5">
          <thead>
            <tr className="">
              <th className="p-3 text-left">
                <label htmlFor="selectAll" className="sr-only">
                  Select All
                </label>
                <input type="checkbox" id="selectAll" />
              </th>
              <th className="p-3 text-left">FIRST NAME</th>
              <th className="p-3 text-left">LAST NAME</th>
              <th className="p-3 text-left">EMAIL</th>
              <th className="p-3 text-left">PHONE</th>
              <th className="p-3 text-left">ROLE</th>
              <th className="p-3 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((employee) => (
              <tr
                key={employee._id}
                className="bg-white"
              >
                <td className="p-4">{employee.firstName}</td>
                <td className="p-4">{employee.lastName}</td>
                <td className="p-4">{employee.email}</td>
                <td className="p-4">{employee.phone}</td>
                <td className="p-4">{employee.role}</td>
                <td className="p-4 flex justify-center space-x-2">
                  <button title="Edit" onClick={() => onEdit(employee)}>
                    <FaRegEdit />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleDelete(employee._id)}
                    disabled={deleteMutation.isLoading}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
