import { useInfiniteQuery } from "@tanstack/react-query";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TReview } from "../Types";

type ReviewProps = {
  review: TReview;
};
type ReviewInfoProps = {};

export const Review = ({ review }: ReviewProps) => {
  const date = review.created_at;
  const dateString = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
  return (
    <div className="border rounded-xl p-4">
      <div>
        <span className="text-lg">{review.nickname}</span>{" "}
        <span className="text-sm">{dateString}</span> <span><AiFillStar className="inline text-[var(--primary-color)]"/>{review.rate}</span>
      </div>
      <div className="w-full first-letter">
        <img src={review.imageURL} alt="" className="max-h-[20vh]" />
      </div>
      <div>{review.content}</div>
    </div>
  );
};

export const ReviewInfo = (props: ReviewInfoProps) => {
  const reviews: Array<TReview> = [
    {
      id: 1,
      nickname: "김덕배",
      content: "리뷰입니다?",
      created_at: new Date(),
      imageURL:
        "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
      rate: 4,
    },
    {
      id: 2,
      nickname: "김덕배",
      content: "리뷰입니다?잉?",
      created_at: new Date(),
      imageURL:
        "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
      rate: 4,
    },
    {
      id: 3,
      nickname: "김덕배",
      content: "리뷰입니다잉??",
      created_at: new Date(),
      imageURL:
        "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U",
      rate: 4,
    },
  ];
  return (
    <div className="h-full overflow-y-scroll">
      <Link to={"review"} className="block h-14 w-full border rounded-sm text-center align-middle">글 등록</Link>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Review review={review} />
        ))}
      </div>
    </div>
  );
};
