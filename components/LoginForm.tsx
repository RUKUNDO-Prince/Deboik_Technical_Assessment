"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const auth = useContext(AuthContext); // Use AuthContext
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (auth?.user) {
      router.replace("/"); // Redirect if already authenticated
    }
  }, [auth?.user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await auth?.login(formData.email, formData.password);
      router.replace("/"); // Redirect after login
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
