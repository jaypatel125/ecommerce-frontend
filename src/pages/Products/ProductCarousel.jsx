import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaStore } from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[35rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block mr-[3rem]"
        >
          {products.map(
            ({ image, _id, name, price, description, brand, rating }) => (
              <div key={_id} className="p-4">
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem] mb-4"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <p className="flex items-center mt-2">
                      <FaStore className="mr-2 text-gray-500" />
                      <span>Brand: {brand}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="flex items-center justify-end mt-2">
                      <FaStar className="mr-2 text-yellow-500" />
                      <span>Ratings: {Math.round(rating)}</span>
                    </p>
                    <p className="text-lg font-semibold mt-2">${price}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-400">
                  {description.substring(0, 150)}...
                </p>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
