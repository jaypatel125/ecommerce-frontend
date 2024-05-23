import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPaPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPaPal && paypal.clientId) {
      const loadingPaPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPaPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPaPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        order.isPaid = true;
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  // change ispaid to true
  const ispaidHandler = async () => {
    try {
      await payOrder({ orderId: orderId });
      refetch();
      toast.success("Order is paid");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="container flex flex-col justify-center md:flex-row">
      <div className="border-gray-300 mt-5 pb-4 mb-5">
        {order.orderItems === 0 ? (
          <Message>Order is empty</Message>
        ) : (
          <div className="oveflow-x-auto">
            <table className="w-[80%]">
              <thead className="border-b-2">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Price</th>
                  <th className="p-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item) => (
                  <tr key={item.product}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-4">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-4">{item.qty}</td>
                    <td className="p-4">${item.price}</td>
                    <td className="p-4">${item.qty * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="t-5 border-gray-300 pb-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Shipping</h2>
        <p className="mb-4 mt-4">
          <strong className="text-pink-500">Order:</strong> {order._id}
        </p>
        <p className="mb-4">
          <strong className="text-pink-500">Name:</strong> {order.user.username}
        </p>
        <p className="mb-4">
          <strong className="text-pink-500">Email:</strong>{" "}
          <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
        </p>
        <div className="mb-4">
          <p>
            <strong className="text-pink-500">Address:</strong> {""}
            {order.shippingAddress.address}, {order.shippingAddress.city}, {""}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
        </div>
        {/* ispaid */}

        <div className="mb-4">
          {order.isPaid ? (
            <Message variant="success">
              Paid on {order.paidAt.substring(0, 10)}
            </Message>
          ) : (
            <Message variant="danger">Not paid</Message>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items:</span>
          <span>${order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping:</span>
          <span>${order.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax:</span>
          <span>${order.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total:</span>
          <span>${order.totalPrice}</span>
        </div>

        {!order.isPaid && (
          <div>
            {loadingPay && <Loader />}{" "}
            {isPending ? (
              <Loader />
            ) : (
              <div>
                <div>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>

                  <button
                    className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
                    onClick={() => ispaidHandler()}
                  >
                    Pay
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {loadingDeliver && <Loader />}
        {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <button
            type="button"
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
            onClick={deliverHandler}
          >
            Mark as delivered
          </button>
        )}
        {order.isDelivered && (
          <Message variant="success">
            Delivered on {order.deliveredAt.substring(0, 10)}
          </Message>
        )}
      </div>
    </div>
  );
};

export default Order;
