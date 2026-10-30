import { useState } from "react";

export default function Employees() {
  const [data, setData] = useState([
    { id: 1, name: "riya", salary: 20000 },
    { id: 2, name: "kajal", salary: 10000 },
    { id: 3, name: "priya", salary: 14000 },
  ]);
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");

  const handleIncrease = (id) => {
    setData(
      data.map((employee) =>
        employee.id === id
          ? { ...employee, salary: employee.salary + 1000 }
          : employee,
      ),
    );
  };

  const handleDecrease = (id) => {
    setData(
      data.map((employee) =>
        employee.id === id
          ? { ...employee, salary: employee.salary - 1000 }
          : employee,
      ),
    );
  };

  const handleEdit = (id) => {
    const employee = data.find((employee) => employee.id === id);

    setEditId(id);
    setNewName(employee.name);
  };

  const handleSave = () => {
    setData(
      data.map((employee) =>
        employee.id === editId ? { ...employee, name: newName } : employee,
      ),
    );
    setEditId(null);
  };

  return (
    <>
      <div className="list-disc ">
        {data.map((employee) => (
          <div key={employee.id} className="flex gap-3 m-2">
            <p>{employee.id}</p>
            {editId === employee.id ? (
              <>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border"
                />

                <button className="border p-1 bg-green-200 rounded-xl" onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <p>{employee.name}</p>

              </>
            )}
            <p>{employee.salary}</p>

            <button
              onClick={() => handleIncrease(employee.id)}
              className="border p-1 w-10 bg-amber-200 rounded-2xl"
            >
              +
            </button>
            <button
              onClick={() => handleDecrease(employee.id)}
              className="border p-1 w-10 bg-amber-600 rounded-2xl"
            >
              -
            </button>
            <button onClick={() => handleEdit(employee.id)} className="border p-1 bg-green-200 rounded-xl">Edit</button>
          </div>
        ))}
      </div>
    </>
  );
}
