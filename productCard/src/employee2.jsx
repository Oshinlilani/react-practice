import { useEffect } from "react";
import { useState } from "react";

export default function Employee2() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      return JSON.parse(savedData);
    }
    return [];
  });

  const [editId, setEditId] = useState(null);

  const [like, setLike] = useState(0);
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const filterEmployee = data.filter((employee) => {
    const matchName = employee.name
      .toLowerCase()
      .includes(debouncedInput.toLowerCase());

    const matchSalary =
      salaryFilter === "all" ||
      (salaryFilter === "above" && employee.salary > 30000) ||
      (salaryFilter === "below" && employee.salary < 30000);

    return matchName && matchSalary;
  });

  const handleLike = () => {
    setLike(like + 1);
  };

  const handleDislike = () => {
    setLike(like - 1);
  };

  const handleEdit = (id) => {
    const data1 = data.find((employee) => employee.id === id);

    setEditId(id);
    setData(data1.name);
    console.log("selected employee", data1);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 ">
        <h2>Employees data</h2>

        <div className="flex justify-center items-center gap-2 border ">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(e.target.value)}
          >
            <option value="all">All Employees</option>
            <option value="above">Salary above 30000</option>
            <option value="below">Salary below 30000</option>
          </select>
        </div>

        <div className="flex gap-6 justify-center items-center">
          {filterEmployee.map((employee, index) => {
            return (
              <>
                <div key={index}>
                  <div className="">
                    Employee:
                    <p>{employee.name} </p>
                    <p>{employee.salary}</p>
                  </div>
                </div>

                <button onClick={() => handleEdit(employee.id)}>Edit</button>
              </>
            );
          })}
        </div>

        <span className="mt-10">Like/Dislike Button </span>
        <div className="flex justify-center items-center gap-5 border rounded p-2 ">
          <button
            onClick={handleLike}
            className="border rounded p-1 bg-blue-300"
          >
            Like
          </button>
          <p>{like}</p>
          <button
            onClick={handleDislike}
            className="border rounded p-1 bg-red-200"
          >
            Dislike
          </button>
        </div>
      </div>
    </>
  );
}
