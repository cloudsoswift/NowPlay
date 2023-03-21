import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { TReview } from "../Types";

type ReviewProps = {
  review: TReview;
};
type ReviewInfoProps = {};

export const Review = ({ review }: ReviewProps) => {
  return (
    <div className="border rounded-xl">
      <div>{review.nickname}</div>
      <div>{review.content}</div>
      <div>{review.created_at.getTime()}</div>
      <div>{review.rate}</div>
      <div>{review.imageURL}</div>
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
    <div>
      <Link to={'review'}>글 등록</Link>
      <div className="space-y-2">
        {reviews.map((review) => (
          <Review review={review} />
        ))}
      </div>
    </div>
  );
};
