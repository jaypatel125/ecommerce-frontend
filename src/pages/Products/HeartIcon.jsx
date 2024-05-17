import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFromFavorite,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
  getFavoritesFromLocalStorage,
} from "../../Utils/localStorage";

import { useEffect, useState } from "react";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((favorite) => favorite._id === product._id);

  useEffect(() => {
    const favorites = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favorites));
  }, []);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorite(product._id));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addFavorite(product));
      addFavoriteToLocalStorage(product);
    }
  };
  return (
    <div className="absolute top-2 right-5 cursor-pointer">
      {isFavorite ? (
        <FaHeart className="text-pink-500" onClick={toggleFavorites} />
      ) : (
        <FaRegHeart
          className="text-white"
          onClick={() => {
            dispatch(addFavorite(product));
            addFavoriteToLocalStorage(product);
          }}
        />
      )}
    </div>
  );
};

export default HeartIcon;
