import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavorites);
  console.log(favorites);

  return (
    <div className="xl:ml-[10%] md:ml-[0rem] mt-[2rem]">
      <h1 className="text-2xl font-semibold ml-[4%]">Favorites</h1>
      <div className="flex flex-wrap">
        {favorites.map((favorite) => (
          <Product key={favorite._id} product={favorite} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
