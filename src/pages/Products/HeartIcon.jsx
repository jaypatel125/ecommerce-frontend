import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
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
  return <div>HeartIcon</div>;
};

export default HeartIcon;
