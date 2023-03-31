import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import styled from "styled-components";
import ReviewCard from "../../components/OwnerReview/OwnerReviewCard";
import api, { ownerapi } from "../../utils/api/api";
import { useState, useRef, useCallback, useEffect } from "react";

const OwnerReviewPage = () => {
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["repos"],
      async ({ pageParam = 0 }) => {
        console.log({ pageParam });
        const { data } = await ownerapi({
          method: "GET",
          url: `/places/1/reviews?page=${pageParam}`,
        });
        return data;
      },
      {
        getNextPageParam: (lastPage, pages) => {
          const NextPage = lastPage.number + 1;
          console.log(NextPage);
          return NextPage;
        },
      }
    );

  const observerElem = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: any) => {
      console.log(entries);
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
    <>
      <ReviewContainer>
        {isSuccess && data ? (
          data.pages.map((page) => {
            return page.content.map((review: any) => {
              {
                return <ReviewCard review={review}></ReviewCard>;
              }
            });
          })
        ) : (
          <></>
        )}
        <div className="loader" ref={observerElem}>
          {isFetchingNextPage && hasNextPage ? "Loading..." : ""}
        </div>
      </ReviewContainer>
    </>
  );
};

export default OwnerReviewPage;

const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  border-left: 20px solid var(--primary-color-light);

  justify-content: center;
  min-height: calc(100vh - 100px);

  background-color: var(--body-color);
  border-radius: 10px;

  padding: 20px;
`;
