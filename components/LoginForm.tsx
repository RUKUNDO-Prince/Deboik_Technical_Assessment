"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (auth?.user) {
      router.replace("/");
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
      router.replace("/");
    } catch (err) {
      setError("Invalid email or password.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* FORM CONTAINER */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h2>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-600 bg-red-100 border border-red-400 p-3 rounded text-center mb-4">
            {error}
          </p>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border p-3 w-full rounded-md shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="border p-3 w-full rounded-md shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#2BDA53] text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>

        {/* REGISTER LINK */}
        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#2BDA53] hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;