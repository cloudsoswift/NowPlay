import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api/api";
import BigCard from "./BigCard";
import { TPlaceCard } from "../Places/Types";

const LikeContent = () => {
  const { data } = useQuery(["LikeStore"], async () => {
    const { data } = await api({
      method: "GET",
      url: `accounts/bookmarks?pageNo=2`,
    });
    return data;
  });
  return (
    <LikeContentBox>
      {data?.map((data: any, index: number) => {
        const store: TPlaceCard = {
          idx: data.store.idx,
          imageURL: data.store.imagesUrl,
          name: data.store.name,
          subCategory: data.store.subcategory.subcategory,
          address: data.store.address,
          distance: 5,
          averageRating: 3,
          reviewCount: 5,
          isBookmark: true,
        }
        return <BigCard key={index} place={store}></BigCard>
      })}
    </LikeContentBox>
  )
};

export default LikeContent

const LikeContentBox = styled.ul`
  max-width: 100%;
  overflow-y: hidden;
`