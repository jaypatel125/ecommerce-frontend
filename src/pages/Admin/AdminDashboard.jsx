import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: false, // Hide the top right icon options
        },
      },

      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });
  useEffect(() => {
    if (salesDetail) {
      const dates = salesDetail.map((sale) => sale._id.substring(0, 10));
      const sales = salesDetail.map((sale) => sale.totalSales);
      setState({
        ...state,
        options: {
          ...state.options,
          xaxis: {
            ...state.options.xaxis,
            categories: dates,
          },
        },
        series: [{ name: "Sales", data: sales }],
      });
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-[10%] md:ml-[0rem]">
        <div className="mt-[4rem]">
          <h2 className="text-2xl font-semibold ml-[4%]">Dashboard</h2>
        </div>
        <div className="w-[90%] ml-[2%] flex justify-around items-center">
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">
              {loading ? <Loader /> : customers.length}
            </h1>
          </div>
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5">All Orders</p>
            <h1 className="text-xl font-bold">
              {loadingTwo ? <Loader /> : orders.totalOrders}
            </h1>
          </div>
        </div>

        <div className="w-[95%] mt-5">
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            height={350}
          />
        </div>

        <div className="mt-[4rem] w-[95%]">
          <h2 className="text-2xl font-semibold ml-[4%]">All Orders</h2>
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
