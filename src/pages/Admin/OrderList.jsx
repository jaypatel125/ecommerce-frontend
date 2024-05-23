import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <div className="ml-[10%] mt-[3rem]">
          <h2 className="text-2xl h-12 font-semibold">Manage Orders</h2>
          <table className="w-[90%]">
            <AdminMenu />
            <thead className="">
              <tr>
                <td className="py-2">ITEMS</td>
                <td className="py-2">ID</td>
                <td className="py-2">NAME</td>
                <td className="py-2">DATE</td>
                <td className="py-2">TOTAL</td>
                <td className="py-2">PAID</td>
                <td className="py-2">DELIVERED</td>
                <td className="py-2"></td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="py-2">{order.orderItems.length}</td>
                  <td className="py-2">{order._id}</td>
                  <td className="py-2">{order.user.username}</td>

                  <td className="py-2">{order.createdAt.substring(0, 10)}</td>
                  <td className="py-2">${order.totalPrice}</td>
                  <td className="py-2">
                    {order.isPaid ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>
                  <td className="py-2">
                    {order.isDelivered ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>
                  <td className="py-2">
                    <Link to={`/order/${order._id}`}>
                      <button className="p-2 bg-blue-400 rounded">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default OrderList;
