import React, { useState } from 'react';

const EmployeeForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'Admin' | 'Staff'>('Staff');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = { firstName, lastName, email, phone, role };
    
    await fetch('/api/employees/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    });

    // Clear the form after submission
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setRole('Staff');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full"
      />
      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
        Role
      </label>
      <select
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value as 'Admin' | 'Staff')}
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
