"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import { AuthContext } from "@/context/AuthContext";
import { useAuthStore } from "@/store/authStore";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const Home = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const auth = useContext(AuthContext);
  const router = useRouter();
  const { logout } = useAuthStore();

  useEffect(() => {
    if (!auth?.user) {
      router.push("/login");
    }
  }, [auth, router]);

  if (!auth?.user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

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
    <div className="flex flex-col bg-[#EEF2FF]/30">
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        {/* MAIN CONTENT */}
        <div className="p-8 w-full">
          <div className="flex flex-col lg:flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4 text-[#013C61]">Employees</h1>
            <div className="">
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-green-500 text-white rounded mb-4 mr-2"
              >
                Add New
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="bg-white flex justify-between items-center text-[#013C61] p-8 my-5">
            <h1 className="text-3xl font-bold">Josh Bakery Ventures</h1>
            <p>62, Bode Thomas, Surulere, Lagos</p>
          </div>

          {isFormOpen && (
            <EmployeeForm
              employee={selectedEmployee}
              onClose={handleCloseForm}
            />
          )}
          <EmployeeList onEdit={handleEditEmployee} />
        </div>
      </div>
    </div>
  );
};

export default Home;
