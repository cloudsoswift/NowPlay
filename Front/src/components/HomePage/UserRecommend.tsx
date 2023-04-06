import MiniCard from "./MiniCard";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
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

const UserRecommend = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  const isLogin = cookie.accessToken;
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
    return data.getStoreListByUserHobby ? data.getStoreListByUserHobby : [];
  };
  const result = useQuery({
    queryKey: ["recommendDistanceList"],
    queryFn: fetchCardList,
  });

  const { data, error, isFetching, status, refetch } = result;

  const userRecommendContent = isLogin ? (
    <CardList>
      {data ? (
        data?.map((data: any, index: number) => {
          console.log(data);
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
  ) : (
    <NavLink to="/mobile/mypage/login">
      <ButtonArea>로그인하고 추천을 받아보세요</ButtonArea>
    </NavLink>
  );

  return <>{userRecommendContent}</>;
};

export default UserRecommend;

const CardList = styled.div`
  display: flex;
  max-width: 100%;
  overflow-y: hidden;
  > img {
    margin-inline: auto;
    height: 150px;
  }
`;

const ButtonArea = styled.div`
  margin: 20px auto;
  text-align: center;
  width: 80vw;
  height: 40px;
  background-color: var(--primary-color);
  font-size: var(--caption);
  color: var(--body-color);
  line-height: 43px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px gray;
`;
