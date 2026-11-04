import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export default function Products() {
  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Headphones", price: 1500 },
    { id: 3, name: "Mouse", price: 700 },
    { id: 4, name: "Keyboard", price: 1200 },
  ];

  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const handleAddToCart = (product) => {
    // Logic to add the product to the cart
    console.log("Adding to cart:", product);
    setCartItems((prevItems) => [...prevItems, product]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      <div className="container mx-auto border-2 border-gray-300 p-4 m-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Products : </h2>
        <div className="flex flex-wrap justify-around w-full">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 justify-center items-center border-2 border-gray-300 p-4 m-4 rounded-lg shadow-md hover:shadow-2xl"
            >
              <img
                src={`path/to/${product.name}.jpg`}
                alt={product.name}
                className="w-32 h-32 object-cover"
              />
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <div className="flex gap-2 ">
                <button className="border-2 border-gray-300 px-3 rounded-lg">
                  Size
                </button>
                <button
                  className="border-2 border-gray-300 px-3 rounded-lg flex items-center gap-1"
                  onClick={() => handleAddToCart(product)}
                >
                  Add <ShoppingBag strokeWidth={1.25} size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
