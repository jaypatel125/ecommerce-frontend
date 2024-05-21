import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgessSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paypalMethod, setPaypalMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paypalMethod));
    navigate("/placeorder");
  };

  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps step1 step2 />
      <div className="flex justify-around items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-full md:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
          <div className="mb-4">
            <label className="block text-white mb-2">Address</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">City</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Postal Code</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Country</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          <label htmlFor="" className="block text-gray-400 ">
            Payment Method
          </label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-pink-500"
                name="paymentMethod"
                value="PayPal"
                checked={paypalMethod === "PayPal"}
                onChange={(e) => setPaypalMethod(e.target.value)}
              />
              <span className="ml-2">PayPal</span>
            </label>
          </div>
          <button
            className="bg-pink-500 text-white w-full px-4 py-2 rounded full mt-4"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                saveShippingAddress({ address, city, postalCode, country })
              );
              dispatch(savePaymentMethod(paypalMethod));
              navigate("/placeorder");
            }}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
