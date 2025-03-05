import React, { useEffect, useState } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('/api/employees');
      const data = await response.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  return (
    <div className="space-y-4">
      {employees.map((employee: any) => (
        <div key={employee._id} className="border p-4 rounded">
          <p>{employee.firstName} {employee.lastName}</p>
          <p>{employee.email}</p>
          <p>{employee.phone}</p>
          <p>{employee.role}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
