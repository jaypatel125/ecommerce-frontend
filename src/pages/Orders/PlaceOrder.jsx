import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgessSteps from "../../components/ProgessSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <ProgessSteps step1 step2 step3 />
      <div className="container ml-[10%] mt-8 w-[90%]">
        {cart.cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/shop">Go Back</Link>
          </Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left">Product</td>
                  <td className="px-1 py-2 text-left">Quantity</td>
                  <td className="px-1 py-2 text-left">Price</td>
                  <td className="px-1 py-2 text-left">Total</td>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item) => (
                  <tr key={item.product}>
                    <td className="p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.qty}</td>
                    <td className="p-4">${item.price}</td>
                    <td className="p-4">${item.qty * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="w-[90%] mt-8 container mx-auto">
          <h2 className="text-2xl font-semibold mb-5 text-center">
            Order Summary
          </h2>
          <div className="flex flex-col md:flex-row justify-between p-8 bg-[#181818] rounded-lg shadow-lg">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <ul className="text-lg space-y-4">
                <li className="flex justify-between">
                  <span className="font-semibold">Items:</span>
                  <span>${cart.itemsPrice}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Shipping:</span>
                  <span>${cart.shippingPrice}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-semibold">Tax:</span>
                  <span>${cart.taxPrice}</span>
                </li>
                <li className="flex justify-between text-xl">
                  <span className="font-semibold">Total:</span>
                  <span>${cart.totalPrice}</span>
                </li>
              </ul>
              {error && (
                <div className="mt-4">
                  <Message variant="danger">{error.data.message}</Message>
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 md:pl-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
                <p>
                  <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
