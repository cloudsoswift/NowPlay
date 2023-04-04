import { useInfiniteQuery } from "@tanstack/react-query";
import { AiFillStar } from "react-icons/ai";
import { HiPencilAlt } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../../utils/api/api";
import { PopupImage } from "../PopupImage";
import { TReview } from "../Types";
import { useRef, useEffect, forwardRef } from "react";

type ReviewProps = {
  review: TReview;
};
type ReviewInfoProps = {
};

export const Review = ({ review }: ReviewProps) => {
  const date = new Date(review.createdAt);
  const dateString = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
  return (
    <div className="border p-4 w-full h-[30vh] shadow-sm">
      <div>
        <span className="text-lg">{review.writer?.nickname}</span>{" "}
        <span className="text-sm">{dateString}</span>{" "}
        <span>
          <AiFillStar className="inline text-[var(--primary-color)]" />
          {review.rating}
        </span>
      </div>
      <div className="flex w-full h-[20vh] space-x-2 flex-col">
        {/* <img src={review.imageURL} alt="" className="max-h-[20vh]" /> */}
        <PopupImage
          imageURL={review.reviewImageUrl}
          imageClass="max-h-[15vh] w-full object-cover"
        />
        <ReviewBox>{review.content}</ReviewBox>
      </div>
    </div>
  );
};

export const ReviewInfo = forwardRef((props: ReviewInfoProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { id } = useParams();
  const fetchReviewList = async ({ pageParam = 0 }) => {
    const {data} = await api.get(`places/${id}/reviews?page=${pageParam}`);
    return data;
  };
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ["getReviewList"],
    queryFn: fetchReviewList,
    getNextPageParam: (lastPage, pages)=> lastPage.number + 1 < lastPage.totalPages ? lastPage.number + 1 : undefined,
  });
  console.log(data, hasNextPage, isFetching, isFetchingNextPage, status);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const handleTouchEnd = (e: TouchEvent) => {
      if(ref && typeof ref !== 'function'){
        if(ref.current?.scrollHeight === ref.current!.scrollTop + ref.current!.clientHeight){
          fetchNextPage();
        }
      }
    }
    if(ref && typeof ref !== 'function' && ref.current){
      ref.current.addEventListener("touchend", handleTouchEnd);
    } return ()=>{
      if(ref && typeof ref !== 'function' && ref.current ){
      ref?.current?.removeEventListener("touchend", handleTouchEnd);
      }
    }
  }, [ref])
  return (
    <div className="h-full overflow-y-scroll" ref={contentRef}>
      <Link
        to={"review"}
        className="grid h-14 w-full border rounded-xl shadow-sm my-2 justify-items-center items-center"
      >
        <div className="text-xl">
          <HiPencilAlt className="inline text-[var(--primary-color)] text-xl" />{" "}
          글 등록
        </div>
      </Link>
      <div className="space-y-4">
        {data?.pages?.at(0)?.content == false && <div>리뷰가 없습니다...</div>}
        {data?.pages.map((page) => (
          page?.content?.map((reviewList: Array<any>)=>{
            const ReviewData = reviewList.at(0);
            const {reviewImageUrl} = reviewList.at(1) !== null ? reviewList.at(1) : {reviewImageUrl: ""};
            const review = {
              ...ReviewData,
              reviewImageUrl
            }
            return <Review key={ReviewData.idx} review={review} />
          }
        )))}
      </div>
    </div>
  );
});

const ReviewBox = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;
