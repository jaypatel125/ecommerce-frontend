import { useGetTopProductsQuery } from "../redux/api/productApiSlice.js";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel.jsx";
import Message from "./Message.jsx";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error}</Message>;
  }
  return (
    <>
      <div className="flex justify-around mt-7">
        <div className="xl:block lg:hidden md:hidden sm:hidden">
          <div className="grid grid-cols-2 ml-20 mr-5">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
