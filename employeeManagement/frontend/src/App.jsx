import { useState } from "react";
import "./App.css";
import EmployeeList from "./components/EmployeeList";

function App() {
  const initialEmployees = [
    { id: 1, name: "Rahul", department: "IT", salary: 30000 },
    { id: 2, name: "Priya", department: "HR", salary: 25000 },
    { id: 3, name: "Amit", department: "IT", salary: 40000 },
    { id: 4, name: "Sneha", department: "Finance", salary: 35000 },
  ];

  const [employees, setEmployees] = useState(initialEmployees);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    salary: "",
  });

  const handleDelete = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    // Add the new employee to the list
    console.log(newEmployee);

    console.log("Employee added:", newEmployee);

    setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
    setNewEmployee({
      name: "",
      department: "",
      salary: "",
    });
  };

  return (
    <>
      <EmployeeList
        employees={employees}
        setEmployees={setEmployees}
        newEmployee={newEmployee}
        setNewEmployee={setNewEmployee}
        handleDelete={handleDelete}
        handleAddEmployee={handleAddEmployee}
      />
    </>
  );
}

export default App;
