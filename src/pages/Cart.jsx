import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice.js";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (item, qty) => {
    dispatch(addToCart(item, qty));
  };

  const emptyCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div className="text-center">
            <h2>
              Your cart is empty{" "}
              <Link to="/shop" className="text-pink-500 underline">
                Go to shop
              </Link>{" "}
            </h2>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center mb-[1rem] pb-2">
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item.id}`} className="text-pink-500">
                      {item.name}
                    </Link>
                    <div className="mt-2 text-white">{item.brand}</div>
                    <div className="mt-2 text-white font-bold">
                      ${item.price}
                    </div>
                  </div>
                  <div className="w-24">
                    <select
                      className="w-full p-1 border rounded text-white"
                      value={item.qty}
                      onChange={(e) => {
                        addToCartHandler(item, Number(e.target.value));
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button
                      className="text-red-500 ml-[1rem]"
                      onClick={() => emptyCart(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-2xl font-semibold">
                    You've {cartItems.reduce((a, c) => a + c.qty, 0)} item(s) in
                    cart
                  </h2>

                  <div className="text-2xl font-bold">
                    Total: $
                    {cartItems
                      .reduce((a, c) => a + c.qty * c.price, 0)
                      .toFixed(2)}
                  </div>
                  <button
                    onClick={() => navigate("/login?redirect=/shipping")}
                    className="mt-4 bg-pink-500 text-white p-2 rounded-lg"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
