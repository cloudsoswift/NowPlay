import { TPlaceCard } from "./Types";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useBottomSheet } from "../../utils/hooks/useBottomSheet";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { StarRating } from "./StarRating";
import { BsBookmarkHeart, BsBookmarkHeartFill } from 'react-icons/bs'
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { TStoreOutput, TStoreOutputWithTotalCount } from "../../utils/api/graphql";

type PlaceCardProps = {
  place: TStoreOutput;
};

export const PlaceCard2 = ({ place }: PlaceCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${place.store.idx}`);
  };
  const percentRating = place.averageRating * 20;

  return (
    <CardBox onClick={handleClick}>
      <img src={`${place.store.imagesUrl}`} />
      <div>
        <Top>
          <Name>{place.store.name}</Name>
          <Category>{place.store.subcategory.subcategory}</Category>
          <BookmarkDiv>
            {place.isBookmark ? <BsBookmarkHeartFill /> : <BsBookmarkHeart />}
          </BookmarkDiv>
        </Top>
        <Middle>
          <Address>{place.store.address}</Address>
        </Middle>
        <Bottom>
          <Distance>
            {place.distance < 1
              ? `${(place.distance * 1000).toFixed(0)}m`
              : `${place.distance.toFixed(2)}km`}
          </Distance>
          <div>/</div>
          <ReviewNum>리뷰 {place.reviewCount}개</ReviewNum>
          <div>/</div>
          <Star>
            <Small>{place.averageRating}</Small>
            <StarRatinga>
              <StarRatingFill style={{ width: percentRating + "%" }}>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </StarRatingFill>
              <StarRatingBase>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </StarRatingBase>
            </StarRatinga>
          </Star>
        </Bottom>
      </div>
    </CardBox>
  );
};

// export const PlaceCard1 = ({ place }: PlaceCardProps) => {
//   const navigate = useNavigate();
//   const handleClick = () => {
//     navigate(`${place.id}`);
//   };
//   return (
//     <div
//       className="w-full h-[40vh] grid justify-self-center border rounded-xl p-2 shadow-md"
//       onClick={handleClick}
//     >
//       <img src={`/pics/${place.imageURL}`} alt="" className="h-[25vh] w-full" />
//       <div className="flex space-x-2">
//         <span className="text-xl">{place.name}</span>
//         <span className="text-[var(--gray-color)]">{place.subCategory}</span>
//       </div>
//       <div>{place.address}</div>
//       <div className="flex space-x-2 items-center">
//         <div className="text-[var(--primary-color)]">
//           {place.distance < 1
//             ? `${place.distance * 1000}m`
//             : `${place.distance.toFixed(2)}km`}
//         </div>
//         <div>{`리뷰 ${place.reviewCount}개`}</div>
//         <StarRating rating={place.averageRating} />
//       </div>
//       <div>{place.isBookmark}</div>
//     </div>
//   );
// };

// const TEST_DATA: Array<TPlaceCard> = [
//   {
//     id: 1,
//     imageURL: "place_test_image.png",
//     name: "스파크 노래타운",
//     subCategory: "노래방",
//     address: "경북 구미시 인동중앙로1길 5",
//     distance: 0.513,
//     averageRating: 3.5,
//     reviewCount: 4,
//     isBookmark: true,
//   },
//   {
//     id: 2,
//     imageURL: "place_test_image.png",
//     name: "스파크 노래타운",
//     subCategory: "노래방",
//     address: "경북 구미시 인동중앙로1길 5",
//     distance: 0.513,
//     averageRating: 4.0,
//     reviewCount: 4,
//     isBookmark: false,
//   },
//   {
//     id: 3,
//     imageURL: "place_test_image.png",
//     name: "스파크 노래타운",
//     subCategory: "노래방",
//     address: "경북 구미시 인동중앙로1길 5",
//     distance: 0.513,
//     averageRating: 4.0,
//     reviewCount: 4,
//     isBookmark: true,
//   },
//   {
//     id: 4,
//     imageURL: "place_test_image.png",
//     name: "스파크 노래타운",
//     subCategory: "노래방",
//     address: "경북 구미시 인동중앙로1길 5",
//     distance: 0.513,
//     averageRating: 4.0,
//     reviewCount: 4,
//     isBookmark: false,
//   },
// ];

type PlaceCardsProps = {
  result: UseInfiniteQueryResult<TStoreOutputWithTotalCount>
};

export const MIN_Y = 120; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
export const MAX_Y = window.innerHeight - 60; // 바텀시트가 최소로 내려갔을 때의 y 값
export const BOTTOM_SHEET_HEIGHT = window.innerHeight; // 바텀시트의 세로 길이

export const PlaceCardSheet = ({ result }: PlaceCardsProps) => {
  const { sheet, content } = useBottomSheet();
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = result;
  useEffect(()=>{
    const handleTouchEnd = (e: TouchEvent) => {
      if(content.current?.scrollHeight === content.current!.scrollTop + content.current!.clientHeight){
        fetchNextPage();
      }
    }
    content.current?.addEventListener("touchend", handleTouchEnd);
    return ()=>{
      content.current?.removeEventListener("touchend", handleTouchEnd);
    }
  }, [])
  return (
    <Wrapper ref={sheet}>
      <div className="h-20 rounded-t-lg pt-4 pb-1 bg-[var(--gray-color-light)]" id="bottomSheetHeader">
        <div className="w-8 h-1 rounded-sm m-auto bg-[var(--primary-color)]"></div>
      </div>
      <div
        id="bottomSheetContent"
        className="overflow-auto"
        ref={content}
      >
        {/* {TEST_DATA.map((data) => (
          <PlaceCard2 key={data.id} place={data.} />
        ))} */}
        {data?.pages.map((page)=>(
          page.storeOutput.map((store)=>(
            <PlaceCard2 key={store.store.idx} place={store} />
          ))
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 0;
  top: calc(100% - ${MIN_Y}px);
  left: 0;
  right: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  height: ${BOTTOM_SHEET_HEIGHT - MIN_Y}px;
`;


const CardBox = styled.div`
  width: 100%;
  padding: 30px 30px 15px 30px;
  > img {
    width: 100%;
    border-radius: 20px;
  }
  > div {
  }
  border-top: 10px solid var(--gray-color-light);
`;

const Top = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const Name = styled.div`
  width: auto;
  font-size: var(--large-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 15px;
`;

const Category = styled.div`
  margin-left: auto;
  width: auto;
  font-size: var(--title-2);
  color: var(--gray-color);
`;

const Middle = styled.div`
  margin-top: 5px;
`;

const Address = styled.div`
  width: 100%;
  font-size: var(--body-text);
`;

const Bottom = styled.div`
  justify-content: start;
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const Distance = styled.div`
  font-size: var(--caption);
  margin-inline: 10px;
  color: var(--primary-color);
`;

const ReviewNum = styled.div`
margin-inline: 10px;
`

const Star = styled.div`
margin-inline: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Small = styled.div`
  font-size: var(--body-text);
  margin-right: 5px;
`;

const StarRatinga = styled.div`
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color: #2b2a29;
`;

const StarRatingFill = styled.div`
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: var(--primary-color);
  > span {
    font-size: var(--title-2);
  }
`;

const StarRatingBase = styled.div`
  z-index: 0;
  padding: 0;
  > span {
    font-size: var(--title-2);
  }
`;

const BookmarkDiv = styled.div`
  margin-left: 5px;
  margin-bottom: 5px;
  > svg {
    width: 30px;
    height: 30px;
    fill: var(--primary-color)
  }
`
