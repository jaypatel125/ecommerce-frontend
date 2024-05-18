import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);
  if (isLoading) return <Loader />;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <section className="flex flex-col">
          <div
            className={`p-4 text-gray-400 cursor-pointer text-lg ${
              activeTab === 1 ? "font-bold text-gray-100" : ""
            }`}
            onClick={() => handleTabClick(1)}
          >
            Write a review
          </div>
          <div
            className={`p-4 text-gray-400 cursor-pointer text-lg ${
              activeTab === 2 ? "font-bold text-gray-100" : ""
            }`}
            onClick={() => handleTabClick(2)}
          >
            All reviews
          </div>
          <div
            className={`p-4 text-gray-400 cursor-pointer text-lg ${
              activeTab === 3 ? "font-bold text-gray-100" : ""
            }`}
            onClick={() => handleTabClick(3)}
          >
            Related products
          </div>
        </section>
      </div>

      <div className="col-span-2">
        <section className="p-4">
          {activeTab === 1 && (
            <div>
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <div>
                    <label htmlFor="rating" className="block text-xl mb-2">
                      Rating
                    </label>
                    <select
                      id="rating"
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="p-2 border rounded-lg xl:w-[40rem] "
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div className="my-2">
                    <label htmlFor="comment" className="block text-xl mb-2">
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      rows="3"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="p-2 border rounded-lg xl:w-[40rem] "
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loadingProductReview}
                    className="bg-pink-600 text-white py-2 px-4 rounded-lg"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <p>
                  Please <Link to="/login">sign in</Link> to write a review
                </p>
              )}
            </div>
          )}
          {activeTab === 2 && (
            <>
              <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>
              <div>
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-[#1A1A1A] p-4 rounded-lg mb-5"
                  >
                    <div className="flex justify-between">
                      <strong className="text-[#B0B0B0]">{review.name}</strong>
                      <p className="text-[#B0B0B0]">
                        {review.createdAt.substring(0, 10)}
                      </p>
                    </div>
                    <p className="my-4">{review.comment}</p>
                    <Ratings value={review.rating} />
                  </div>
                ))}
              </div>
            </>
          )}
          {activeTab === 3 && (
            <section className="flex flex-wrap">
              {!data ? (
                <Loader />
              ) : (
                data.map((product) => (
                  <div key={product._id} className="p-2">
                    <SmallProduct product={product} />
                  </div>
                ))
              )}
            </section>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductTabs;
