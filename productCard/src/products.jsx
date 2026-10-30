import { useEffect } from "react";
import { useState } from "react";
import { PencilLine } from "lucide-react";
import { useMemo } from "react";

export default function products() {
  const [data, setData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("data");
      if (savedData) {
        return JSON.parse(savedData);
      }
    }
    return [
      { id: 1, name: "sugar", quantity: 1, price: 2.5 },
      { id: 2, name: "tea", quantity: 1, price: 3 },
    ];
  });

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const [editId, setEditId] = useState();
  const [editName, setEditName] = useState();
  const [editPrice, setEditPrice] = useState();

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const handleIncrease = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrease = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
  };

  const editProduct = (item) => {
    setEditId(item.id);
    setEditName(item.name);
    setEditPrice(item.price);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditPrice("");
  };

  const saveEdit = (id) => {
    if (!editName.trim() || !editPrice.trim()) return;

    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, name: editName, price: parseInt(editPrice) }
          : item,
      ),
    );
    cancelEdit();
  };
  const addProduct = (e) => {
    e.preventDefault();

    if (!newName.trim() || !newPrice.trim()) return;

    const newProd = {
      id: Date.now(),
      name: newName,
      quantity: parseInt(newQuantity, 10) || 1,
      price: parseFloat(newPrice),
    };

    setData([...data, newProd]);
    setNewName("");
    setNewPrice("");
    setNewQuantity("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <form
        className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center bg-gray-50 border rounded-xl gap-3 p-4 mb-10 shadow-sm "
        onSubmit={addProduct}
      >
        <input
          value={newName}
          placeholder="Product name"
          onChange={(e) => setNewName(e.target.value)}
          className="border rounded-lg p-2 flex-1 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          value={newPrice}
          type="number"
          placeholder="Price"
          onChange={(e) => setNewPrice(e.target.value)}
          className="border rounded-lg p-2 sm:w-28 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          value={newQuantity}
          type="number"
          placeholder="Quantity"
          onChange={(e) => setNewQuantity(e.target.value)}
          className="border rounded-lg p-2 sm:w-28 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit">Add product</button>
      </form>

      <div className="w-full bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-100 px-4 py-3 font-semibold text-gray-700 text-sm border-b">
          <span>Product Name</span>
          <span className="text-right">Price</span>
          <span className="text-right">Quantity</span>
          <span className="text-center">Actions</span>
        </div>
        <ul className="divide-y divide-gray-200">
          {data
            .filter((prod) => prod.quantity > 0)
            .map((item) => {
              const isEditing = editId === item.id;
              return (
                <li
                  key={item.id}
                  className="grid grid-cols-4 px-4 py-4 items-center text-gray-600 text-sm sm:text-base"
                >
                  <span className="font-medium text-gray-900 truncate">
                    {item.name}
                  </span>
                  <span className="text-right">{item.price}</span>
                  <span className="text-right pr-2">{item.quantity}</span>

                  <div className="flex justify-center">
                    <div className="inline-flex rounded-lg border border-gray-300 bg-white overflow-hidden shadow-xs">
                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="px-3 py-1 hover:bg-gray-50 border-r border-gray-300 font-semibold text-green-600 text-base"
                      >
                        +
                      </button>

                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="px-3 py-1 hover:bg-gray-50 border-r  border-gray-300 font-semibold text-red-500 text-base"
                      >
                        -
                      </button>
                      <button className="px-3 py-1 hover:bg-gray-50 border-r  border-gray-300 font-semibold text-yellow-500 text-base">
                        <PencilLine size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
