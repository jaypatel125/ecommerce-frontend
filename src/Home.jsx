import { Link, useParams } from "react-router-dom";
import { useGetTopProductsQuery } from "./redux/api/productApiSlice.js";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Message from "./components/Message";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetTopProductsQuery({ keyword });
  return <>{!keyword ? <Header /> : null}</>;
};

export default Home;
