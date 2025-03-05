"use client"

import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Employee Records</h1>
      <EmployeeForm />
      <EmployeeList />
    </div>
  );
};

export default Home;
