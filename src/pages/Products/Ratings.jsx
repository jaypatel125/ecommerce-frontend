import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa";

const Ratings = ({ value, text, color }) => {
  const fullStars = Math.floor(value);
  const halfStars = Math.ceil(value - fullStars) >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars).keys()].map((star) => (
        <FaStar key={star} className="`text-${color} ml-1" />
      ))}
      {[...Array(halfStars).keys()].map((star) => (
        <FaStarHalf key={star} className="`text-${color} ml-1" />
      ))}
      {[...Array(emptyStars).keys()].map((star) => (
        <FaRegStar key={star} className="`text-${color} ml-1" />
      ))}
      <span className="ml-2">{text && text}</span>
    </div>
  );
};

Ratings.defaultProps = {
  color: "yellow-400",
};

export default Ratings;
