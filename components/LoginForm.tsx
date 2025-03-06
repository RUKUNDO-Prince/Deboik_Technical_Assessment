"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error);
      return;
    }

    const data = await response.json();
    login(data.token, data.user);
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" required />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
