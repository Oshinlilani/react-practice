import { useEffect, useState } from "react";

export default function Users2() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  // const  timeout = setTimeout(() => {
    
  // }, 1000);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((result) => setUser(result))
      .catch((error) => console.error(error))
      .finally(setLoading(false));
  },[1000])

  const handleSubmit = (e) => {
    e.preventDefault();

    const newuser = {
      id: Date.now(),
      name: name,
      email: email,
    };


    setUser((previous) => [...previous, newuser])

    setName("");
    setEmail("");
    
    setLoading(false);


    console.log(name);
    console.log(email);
  };
  

  if(loading) {
    return <p>Loading user</p>
  }
  
  return (
    <>
      <div className="m-3 ">
        <h2>Users Profile</h2>

        <form onSubmit={handleSubmit} className="m-2">
          <label>Name: </label>
          <input
            type="text"
            className="border rounded m-2 p-1"
            onChange={(e) => setName(e.target.value)}
            placeholder="Write your name"
          />
          <label>Email: </label>
          <input
            type="email"
            className="border rounded m-2 p-1"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Write your email"
          />

          <button className="border p-2 rounded-xl bg-amber-200">Submit</button>
        </form>

        {user.map((user) => (
          <div key={user.id}>

            <p className="text-black">{user.name}</p>
            <p>{user.email}</p>
            
          </div>
        ))}
      </div>
    </>
  );
}
