import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavorites);
  console.log(favorites);

  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">Favorites</h1>
      <div className="flex flex-wrap">
        {favorites.map((favorite) => (
          <Product key={favorite._id} product={favorite} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
