import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFileredProductsQuery } from "../redux/api/productApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFileredProductsQuery({ checked, radio });

  useEffect(() => {
    if (!categoriesQuery.isLoading && !categoriesQuery.isError) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPriceFilter(value);

    if (filteredProductsQuery.data) {
      // Filter products based on checked categories, selected brand, and price filter
      const filteredProducts = filteredProductsQuery.data.filter((product) => {
        const isCategoryMatch =
          checked.length === 0 || checked.includes(product.category);
        const isBrandMatch =
          radio.length === 0 || radio.includes(product.brand);
        const isPriceMatch =
          product.price <= parseInt(priceFilter, 10) || value === "";

        return isCategoryMatch && isBrandMatch && isPriceMatch;
      });

      dispatch(setProducts(filteredProducts));
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex mr-10 ml-[8%] md:flex-row">
          <div className="bg-[#151515] w-[20%] p-3 mt-2 mb-2">
            <h2 className="h4 text-center py-2 mb-2">Filter by categories</h2>

            <div className="p-5 ">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex ietms-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="h4 text-center py-2 mb-2">Filter by brands</h2>
            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <>
                  <div className="flex items-enter mr-4 mb-2">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="pink-radio"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {brand}
                    </label>
                  </div>
                </>
              ))}
            </div>
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
              Filter by price
            </h2>
            <div className="p-5">
              <input
                type="text"
                value={priceFilter}
                onChange={handlePriceChange}
                placeholder="Enter price"
                className="w-full p-1 border rounded text-white"
              />
            </div>
            <div className="p-5 pt-0">
              <button
                className="w-full bg-pink-500 text-white p-2 rounded-lg"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="w-[80%] px-3 overflow-y-auto">
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products.map((product) => (
                  <div key={product._id} className="p-2">
                    <ProductCard product={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
