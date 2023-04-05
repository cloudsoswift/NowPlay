import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api/api";
// import { MyReviewCard } from "./MyReviewCard";

const MyReview = () => {
  const {data} = useQuery(["userReview"], async () => {
    const { data } = await api({
      method: "GET",
      url: "/accounts/reviews",
    });
    return data
  });

  console.log(data)

  return (
    <>
      <h1>여기는 리뷰</h1>
    </>
  );
};

export default MyReview;