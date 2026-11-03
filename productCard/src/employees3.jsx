import { useCallback, useMemo, useReducer, useState } from "react";
import EmployeeCard from "./components/EmployeeCard";

export default function Employees3() {
  const [search, setSearch] = useState("");

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul",
      department: "IT",
      salary: 30000,
    },
    {
      id: 2,
      name: "Priya",
      department: "HR",
      salary: 25000,
    },
    {
      id: 3,
      name: "Amit",
      department: "Finance",
      salary: 35000,
    },
  ]);


  const [state, dispatch] = useReducer(reducer, employees);

  const reducer = (state, action) => {
    switch (action.type) {
      case "Add Employee":
        return [...state, action.payload];
      case "Delete Employee":
        return state.filter((employee) => employee.id !== action.payload);
      default:
        return state;
    }
  }


  const [count, setCount] = useState(0)

  const filteredEmployees = useMemo(() => {
    console.log("filtering employees")

    return employees.filter((employee) => (
      employee.name.toLowerCase().includes(search.toLowerCase())
    ))
  }, [employees, search])

  const handleCount = () => {
    setCount((prevCount) => prevCount + 1)
  }

  const handleDelete = useCallback(id => {
    setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id))
  }, [])

  return (
    <div className="m-3 flex justify-center items-center flex-col gap-4">
      <h1>Employees List</h1>

      <input
        type="text"
        placeholder="search employees..."
        className="border rounded-2xl p-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleCount}>Count: {count}</button>

      <div className="flex justify-center items-center gap-4 flex-wrap border rounded p-1 ">
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
