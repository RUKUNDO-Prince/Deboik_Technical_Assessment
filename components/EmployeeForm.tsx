"use client";

import React, { useState } from "react";

const EmployeeForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"Admin" | "Staff">("Staff");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const newEmployee = { firstName, lastName, email, phone, role };

    try {
      const response = await fetch("/api/employees/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      setSuccessMessage("Employee added successfully!");

      // Clear the form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setRole("Staff");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full"
        required
      />
      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
        Role
      </label>
      <select
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value as "Admin" | "Staff")}
        className="p-2 border border-gray-300 rounded w-full"
      >
        <option value="Admin">Admin</option>
        <option value="Staff">Staff</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
