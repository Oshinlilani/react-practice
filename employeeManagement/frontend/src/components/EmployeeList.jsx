import { useState } from "react";

export default function EmployeeList({
  employees,
  setEmployees,
  newEmployee,
  setNewEmployee,
  handleDelete,
  handleAddEmployee
}) {
  
  return (
    <>
      <div>
        <form onSubmit={handleAddEmployee}>
          <input
            type="text"
            placeholder="add employee"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="add department"
            value={newEmployee.department}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, department: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="add salary"
            value={newEmployee.salary}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, salary: e.target.value })
            }
          />
          <button type="submit">Add Employee</button>
        </form>

        {employees.map((employee) => {
          return (
            <div>
              <h3>Name: {employee.name}</h3>
              <p>Department: {employee.department}</p>
              <p>Salary: {employee.salary}</p>

              <button onClick={() => handleDelete(employee.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}
