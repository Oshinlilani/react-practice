


export default function Cart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const handleAddToCart = (item) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
        : cartItem
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (item) => {
    const updatedCart = cartItems
      .map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: (cartItem.quantity || 1) - 1 }
          : cartItem
      )
      .filter((cartItem) => cartItem.quantity > 0);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <div className="container mx-auto border-2 border-gray-300 p-4 m-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Cart : </h2>
        <div className="flex flex-wrap justify-around w-full ">
          {/* Cart items will be displayed here */}
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b py-2"
                >
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                  <div className="flex gap-2 border p-1 rounded-lg">
                    <button onClick={() => handleAddToCart(item.id)}>+</button>
                    <button onClick={() => handleRemoveFromCart(item.id)}>-</button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between font-bold mt-4">
                <span>Total:</span>
                <span>
                  ₹
                  {cartItems.reduce((total, item) => total + item.price, 0)}
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
