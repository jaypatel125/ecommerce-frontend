// add and remove product from local storage
export const addFavoriteToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  if (!favorites.some((favorite) => favorite._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeFavoriteFromLocalStorage = (productId) => {
  const favorites = getFavoritesFromLocalStorage();
  const newFavorites = favorites.filter(
    (favorite) => favorite._id !== productId
  );
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
};

// retrieve products from local storage

export const getFavoritesFromLocalStorage = () => {
  const favoritesJson = localStorage.getItem("favorites");
  return favoritesJson ? JSON.parse(favoritesJson) : [];
};
