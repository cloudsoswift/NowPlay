import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import styled from "styled-components";
import ReviewCard from "../../components/OwnerReview/OwnerReviewCard";
import api, { ownerapi } from "../../utils/api/api";
import { useState, useRef, useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ownerInfoAtion } from "../../utils/recoil/userAtom";

const OwnerReviewPage = () => {
  const ownerInfo = useRecoilValue(ownerInfoAtion);

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["storeReviews"],
      async ({ pageParam = 0 }) => {
        const { data } = await ownerapi({
          method: "GET",
          url: `/places/${ownerInfo.storeIdx}/reviews?page=${pageParam}`,
        });
        return data;
      },
      {
        getNextPageParam: (lastPage, pages) => {
          return lastPage.number + 1;
        },
      }
    );

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
    <>
      <ReviewContainer>
        {isSuccess && data && data.pages[0].content.length !== 0 ? (
          data.pages.map((page) => {
            console.log(page);
            return page.content.map((review: any, index: number) => {
              {
                return <ReviewCard review={review} key={index}></ReviewCard>;
              }
            });
          })
        ) : (
          <NoContentCard>
            <div className='photo-box'>
              <img src='../src/assets/LeisureLogo.png' />
            </div>
            <div className='text-box'>
              <h1>리뷰가</h1>
              <h1>존재하지</h1>
              <h1>않습니다</h1>
            </div>
          </NoContentCard>
        )}
        <div className='loader' ref={observerElem}>
          {isFetchingNextPage && hasNextPage ? "" : ""}
        </div>
      </ReviewContainer>
    </>
  );
};

export default OwnerReviewPage;

const NoContentCard = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  height: auto;
  width: 30vw;

  background-color: var(--body-color);

  box-shadow: 10px 10px 5px var(--primary-color-light);

  .photo-box {
    width: 25vw;
    padding: 20px;
  }

  .text-box {
    width: 100%;
    text-align: start;
    padding: 40px;
  }

  h1 {
    font-size: var(--large-text);
    font-weight: bold;
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  border-left: 20px solid var(--primary-color-light);

  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);

  background-color: var(--body-color);
  border-radius: 10px;

  padding: 20px;
`;
