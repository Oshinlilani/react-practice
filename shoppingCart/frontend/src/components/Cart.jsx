export default function Cart({ cartItems, setCartItems }) {
  const cartItems1 = JSON.parse(localStorage.getItem("cart")) || [];

  const handleAddToCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <>
      <div className="container mx-auto border-2 border-gray-300 p-4 m-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Cart : </h2>
        <div className="flex flex-wrap justify-around w-full ">
          {/* Cart items will be displayed here */}
          {cartItems.length > 0 ? (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b py-2 gap-6"
                >
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                  <div className="flex gap-2 border p-1 rounded-lg">
                    <button onClick={() => handleAddToCart(item.id)}>+</button>
                    <button onClick={() => handleRemoveFromCart(item.id)}>
                      -
                    </button>
                  </div>
                  <span>Quantity: {item.quantity}</span>
                </div>
              ))}

              <div className="flex justify-between font-bold mt-4">
                <span>Total:</span>
                <span>
                  ₹
                  {cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div>
              <p>No items in cart</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
