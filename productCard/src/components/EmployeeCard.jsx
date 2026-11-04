import React, { memo } from "react";




function EmployeeCard({ employee, onDelete }) {
  // console.log("Rendering employee card for:", employee.name)

  return (
    <div className="border rounded p-2 flex flex-col justify-center items-center gap-2 w-60">
      <h2>Name: {employee.name}</h2>
      <p>Department: {employee.department}</p>
      <p>Salary: {employee.salary}</p>
      <button className="bg-blue-400 text-white px-2 py-1 rounded-xl" onClick={() => alert(`Employee ID: ${employee.id}`)}>Show ID</button>
      <button onClick={() => onDelete(employee.id)}>Delete</button>


      <div>
        
      </div>
    </div>
  );
}

export default memo(EmployeeCard);  