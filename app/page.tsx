"use client";

import { useState, useContext, useEffect } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const Home = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!auth?.user) {
      router.push("/login");
    }
  }, [auth, router]);

  if (!auth?.user) return null;

  const handleAddNew = () => {
    setSelectedEmployee(null);
    setIsFormOpen(true);
  };

  const handleEditEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Employee Records</h1>
      <button onClick={handleAddNew} className="px-4 py-2 bg-green-500 text-white rounded mb-4">
        Add New
      </button>
      <button onClick={() => useAuthStore().logout()} className="px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>

      {isFormOpen && <EmployeeForm employee={selectedEmployee} onClose={handleCloseForm} />}
      <EmployeeList onEdit={handleEditEmployee} />
    </div>
  );
};

export default Home;