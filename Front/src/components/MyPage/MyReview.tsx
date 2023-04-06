import styled from "styled-components";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api/api";
import ReviewCard from './ReviewCard';
// import { MyReviewCard } from "./MyReviewCard";

export type Treview = {
  ownerComment: {
    content: string | undefined;
  };
  review: {
    idx: number;
    createdAt: string;
    rating: number;
    hidden: boolean;
    storeName: string;
    image: string;
    content: string;
  }
}

const MyReview = () => {
  const { data } = useQuery<Treview[]>(["userReview"], async () => {
    const { data } = await api({
      method: "POST",
      url: "/accounts/reviews",
    });
    const newData: Treview[] = []
    data.forEach((review: any) => {
      newData.push({
        ownerComment: {
          content: review.ownerComment?.content,
        },
        review: {
          idx: review.review.idx,
          createdAt: review.review.createdAt,
          rating: review.review.rating,
          hidden: review.review.hidden,
          storeName: review.review.store.name,
          image: review.reviewImage.length !== 0 ? review.reviewImage[0].reviewImageUrl : "",
          content: review.review.content
        }
      })
    })
    return newData;
  });

  console.log(data);


  return (
    <>
    {data && data.map(review => {
      return <ReviewCard review={review} />
    })}
      
    </>
  );
};

export default MyReview;