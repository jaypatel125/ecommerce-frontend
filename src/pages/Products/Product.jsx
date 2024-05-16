import { Link } from "react-router-dom";
import HeartIcon from "../Products/HeartIcon";
const Product = ({ product }) => {
  return (
    <div className="w-[23rem] mr-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[40rem] h-[20rem] object-cover rounded-lg"
        />
        <HeartIcon product={product} />
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 p-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
