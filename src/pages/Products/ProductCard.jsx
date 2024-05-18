import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="bg-[#151515] w-[17rem] p-3 rounded-lg">
      <section className="relative">
        <Link to={`/product/${product._id}`}>
          <img
            className="cursor-pointer w-full"
            src={product.image}
            alt={product.name}
            style={{
              height: "170px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </Link>
        <HeartIcon product={product} />
      </section>

      <div className="mt-2 text-white">{product.name}</div>
      <div className="mt-2 text-white">${product.price}</div>
      <div className="flex justify-between items-center mt-2">
        <Link
          to={`/product/${product._id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
        >
          View product
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
        <button
          className="p-2 rounded-full"
          onClick={() => addToCartHandler(product, 1)}
        >
          <AiOutlineShoppingCart size={25} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
