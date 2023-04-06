import MiniCard from "./MiniCard";
import styled from "styled-components";
import React, {
  PropsWithChildren,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api/api";
import { filterState } from "../Places/Map";
import { QGetRecommendStores } from "../../utils/api/graphql";

const RecommendDistance = () => {
  const filterValue = useRecoilValue(filterState);
  const fetchCardList = async () => {
    const query = QGetRecommendStores;
    const variables: {
      lat: number;
      lon: number;
    } = {
      lat: filterValue.latitude,
      lon: filterValue.longitude,
    };
    const data = (
      await api.post("/graphql", {
        query,
        variables,
      })
    ).data?.data;
    return data.storeRecommendationByCoordinate
      ? data.storeRecommendationByCoordinate
      : [];
  };
  const result = useQuery({
    queryKey: ["recommendDistanceList"],
    queryFn: fetchCardList,
  });

  const { data, error, isFetching, status, refetch } = result;

  return (
    <CardList>
      {data ? (
        data?.map((data: any, index: number) => {
          return (
            <MiniCard
              key={index}
              idx={data.store.idx}
              name={data.store.name}
              distance={data.distance}
              thisRating={data.averageRating}
              imagesUrl={data.store.imagesUrl}
              subCategory={data.store.subcategory.subcategory}
            />
          );
        })
      ) : (
        <img src="https://t1.daumcdn.net/cfile/tistory/184F8A4E4E55932B06" />
      )}
    </CardList>
  );
};

export default RecommendDistance;

const CardList = styled.div`
  display: flex;
  max-width: 100%;
  overflow-y: hidden;
  > img {
    margin-inline: auto;
    height: 150px;
  }
`;
