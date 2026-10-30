import { useEffect, useState } from "react";

export default function TodoApp({ prop }) {

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });

  const [inputs, setInputs] = useState("");

  const addTodo =(todo) => {
    if(inputs.trim() === "") return;
    setTodos([...todos, todo]);
    saveTodosToLocalStorage([...todos, todo]);
    setInputs("");
  }

  const deleteTodo = (todo) => {
    setTodos(todos.filter(t => t !== todo));
    saveTodosToLocalStorage([...todos.filter(t => t !== todo)]);
  }

  // const saveTodosToLocalStorage = (todosToSave) => {
  //   localStorage.setItem("todos", JSON.stringify(todosToSave));
  // }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="flex justify-center items-center flex-col gap-4 m-40 w-100">
      <div className="flex flex-col gap-2 w-60">
        <h2 className="text-2xl font-bold text-center">Todo List</h2>

        <input type="text" className="w-100" placeholder="Add a new todo" value={inputs} onChange={(e) => setInputs(e.target.value)} />
        <button onClick={() => addTodo(inputs)} className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500">Add</button>

        <ul>
          {todos.map((todo, index) => (
            <li key={index} className="w-50">
              <span > {index + 1}. {todo}</span>
              <span className="text-gray-500"> {prop}</span>
              <button onClick={() => deleteTodo(todo)} className="bg-red-400 text-white p-1 m-2 rounded-md hover:bg-red-500 ml-2">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


