import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "./redux/api/productApiSlice.js";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Message from "./components/Message";
import Product from "./pages/Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.Message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[7rem] text-[3rem]">
              Latest Products
            </h1>
            <Link
              to="/shop"
              className="bg-pink-500 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem] hover:bg-pink-700 transition-colors duration-300 ease-in-out text-white"
            >
              View all
            </Link>
          </div>
          <div>
            <div className="ml-20 flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id} className="">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
