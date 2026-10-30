import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");

  const [name, setName] = useState("")
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      })
      .catch((err) => {
        setError("Failed to fetch users");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  const handleEdit = (id) => {
    const user = users.find((user) => user.id === id);

    setEditId(id);
    setNewName(user.name);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(t => t.id !== id))
  }

  const handleSave = () => {
    setUsers(
      users.map((user) =>
        user.id === editId ? { ...user, name: newName } : user,
      ),
    );
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      name : name,
      email : email
    } 

    setUsers((previousUsers) => [...previousUsers, newUser])

    setName("");
    setEmail("");

    console.log(name);
    console.log(email);
  }

  return (
    <>
      <div className="flex flex-col justify-center aligns-center">
        <h2>Users</h2>

        <form onSubmit={handleSubmit}>
          <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="" 
          type="name"
          placeholder="Full Name"
          />
          
          <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="" 
          type="email"
          placeholder="Email"
          />

          <button type="submit" >Submit</button>
        </form>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Users..."
        />

        {users
          .filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((user) => (
            <div key={user.id} className="flex gap-6 m-2">
              {editId === user.id ? (
                <>
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border rounded "
                  />

                  <button onClick={handleSave}>Save</button>
                </>
              ) : (
                <p>{user.name}</p>
              )}

              <p>{user.email}</p>

              <button
                onClick={() => handleEdit(user.id)}
                className="border rounded-2xl p-2"
              >
                Edit Name
              </button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          ))}
      </div>
    </>
  );
}
