import { useInfiniteQuery } from "@tanstack/react-query";
import { AiFillStar } from "react-icons/ai";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PopupImage } from "../PopupImage";
import { TReview } from "../Types";

type ReviewProps = {
  review: TReview;
};
type ReviewInfoProps = {};

export const Review = ({ review }: ReviewProps) => {
  const date = review.created_at;
  const dateString = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
  return (
    <div className="border p-4 w-full h-[30vh] shadow-sm">
      <div>
        <span className="text-lg">{review.nickname}</span>{" "}
        <span className="text-sm">{dateString}</span>{" "}
        <span>
          <AiFillStar className="inline text-[var(--primary-color)]" />
          {review.rate}
        </span>
      </div>
      <div className="flex w-full h-[20vh] space-x-2 flex-col">
        {/* <img src={review.imageURL} alt="" className="max-h-[20vh]" /> */}
        <PopupImage imageURL={review.imageURL} imageClass="max-h-[15vh] w-full object-cover" />
        <ReviewBox>{review.content}</ReviewBox>
      </div>
    </div>
  );
};

export const ReviewInfo = (props: ReviewInfoProps) => {
  const reviews: Array<TReview> = [
    {
      id: 1,
      nickname: "김덕배",
      content:
        "리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?리뷰입니다?",
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
      <Link
        to={"review"}
        className="grid h-14 w-full border rounded-xl shadow-sm my-2 justify-items-center items-center"
      >
        <div className="text-xl">
          <HiPencilAlt className="inline text-[var(--primary-color)] text-xl" /> 글 등록
        </div>
      </Link>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Review review={review} />
        ))}
      </div>
    </div>
  );
};

const ReviewBox = styled.div`
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
`