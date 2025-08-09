import { useContext } from "react";
import { CartContex } from "../context/CartContext";

export default () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContex);

  if (cart.length === 0) return <div className="p-4">سبد خرید خالی است.</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-2"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover"
            />
            <div>
              <h2>{item.title}</h2>
              <p>{item.price} تومان</p>
              <p>تعداد: {item.quantity}</p>
            </div>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500"
          >
            حذف
          </button>
        </div>
      ))}
      <button
        onClick={clearCart}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        خالی کردن سبد
      </button>
    </div>
  );
};
