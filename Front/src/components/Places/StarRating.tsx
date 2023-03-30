import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// @flow
type Props = {
  rating: number;
  className?: string;
};
export const StarRating = ({ rating, className }: Props) => {
  return (
    <div className={`flex items-center [&>svg]:text-[var(--primary-color)] ${className}`}>
      {rating.toFixed(1)}
      {rating >= 1 ? <AiFillStar /> : <AiOutlineStar />}
      {rating >= 2 ? <AiFillStar /> : <AiOutlineStar />}
      {rating >= 3 ? <AiFillStar /> : <AiOutlineStar />}
      {rating >= 4 ? <AiFillStar /> : <AiOutlineStar />}
      {rating >= 5 ? <AiFillStar /> : <AiOutlineStar />}
    </div>
  );
};
