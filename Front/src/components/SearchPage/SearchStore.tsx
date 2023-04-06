import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import React, {
  PropsWithChildren,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useRecoilValue } from "recoil";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../utils/api/api";
import { filterState } from "../Places/Map";
import { QSearchStore } from "../../utils/api/graphql";
import BigCard from "../LikePage/BigCard";
import { TPlaceCard } from "../Places/Types";
import { queryClient } from "../../main";

interface SearchBarType {
  searchInput: string;
}

const SearchStore = ({
  searchInput,
  children,
}: PropsWithChildren<SearchBarType>) => {
  const filterValue = useRecoilValue(filterState);

  const fetchCardList = async ({ pageParam = 1 }) => {
    const query = QSearchStore;
    const variables: {
      searchInput: string;
      count: number;
      lat: number;
      lon: number;
    } = {
      searchInput: searchInput,
      count: pageParam,
      lat: filterValue.latitude,
      lon: filterValue.longitude,
    };
    const data = (
      await api.post("/graphql", {
        query,
        variables,
      })
    ).data?.data;
    return data.searchStore ? data.searchStore : [];
  };
  const result = useInfiniteQuery({
    queryKey: ["searchList"],
    queryFn: fetchCardList,
    getNextPageParam: (lastPage, pages) =>
      pages.length + 1 < lastPage.totalCount / 20
        ? pages.length + 1
        : undefined,
    // staleTime: 20000,
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = result;

  useEffect(() => {
    console.log(error)
  }, error)

  const observerElem = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: any) => {
      const [target] = entries;
      if (target.isIntersecting) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    if (observerElem.current) {
      const element = observerElem.current;
      const option = { threshold: 0 };

      const observer = new IntersectionObserver(handleObserver, option);
      observer.observe(element);
      return () => observer.unobserve(element);
    }
  }, [fetchNextPage, hasNextPage, handleObserver]);

  return (
    <SearchList>
      {data?.pages.map((data) => {
        return data?.storeOutput?.map((data: any, index: number) => {
          const store: TPlaceCard = {
            idx: data.store.idx,
            imageURL: data.store.imagesUrl,
            name: data.store.name,
            subCategory: data.store.subcategory.subcategory,
            address: data.store.address,
            distance: data.distance,
            averageRating: data.averageRating,
            reviewCount: data.reviewCount,
            isBookmark: data.isBookmark,
          };
          return <BigCard key={index} place={store}></BigCard>;
        });
      })}
      <div ref={observerElem}></div>
    </SearchList>
  );
};

export default SearchStore;

const SearchList = styled.ul`
  max-width: 100%;
  overflow-y: hidden;
`;
