"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error);
      return;
    }

    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" required />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
