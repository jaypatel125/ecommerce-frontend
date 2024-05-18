import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="ml-[2rem] p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[15rem] h-[15rem] rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div>
              {product.name.length < 10
                ? product.name
                : product.name.substring(0, 10) + "..."}
            </div>
            <span className="bg-pink-900 text-pink-200 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full  ">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
