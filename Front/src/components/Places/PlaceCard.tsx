import { TPlaceCard } from "./Types";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useBottomSheet } from "../../utils/hooks/useBottomSheet";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { StarRating } from "./StarRating";

type PlaceCardProps = {
  place: TPlaceCard;
};
export const PlaceCard = ({ place }: PlaceCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${place.id}`);
  };
  return (
    <div
      className="w-full h-[40vh] grid justify-self-center border rounded-xl p-2"
      onClick={handleClick}
    >
      <img src={`/pics/${place.imageURL}`} alt="" className="h-[25vh] w-full" />
      <div className="flex space-x-2">
        <span className="text-xl">{place.name}</span>
        <span className="text-[var(--gray-color)]">{place.subCategory}</span>
      </div>
      <div>{place.address}</div>
      <div className="flex space-x-2 items-center">
        <div className="text-[var(--primary-color)]">
          {place.distance < 1
            ? `${place.distance * 1000}m`
            : `${place.distance.toFixed(2)}km`}
        </div>
        <div>{`리뷰 ${place.reviewCount}개`}</div>
        <StarRating rating={place.averageRating}/>
      </div>
      <div>{place.isBookmark}</div>
    </div>
  );
};

const TEST_DATA: Array<TPlaceCard> = [
  {
    id: 1,
    imageURL: "place_test_image.png",
    name: "스파크 노래타운",
    subCategory: "노래방",
    address: "경북 구미시 인동중앙로1길 5",
    distance: 0.513,
    averageRating: 4.0,
    reviewCount: 4,
    isBookmark: true,
  },
  {
    id: 2,
    imageURL: "place_test_image.png",
    name: "스파크 노래타운",
    subCategory: "노래방",
    address: "경북 구미시 인동중앙로1길 5",
    distance: 0.513,
    averageRating: 4.0,
    reviewCount: 4,
    isBookmark: true,
  },
  {
    id: 3,
    imageURL: "place_test_image.png",
    name: "스파크 노래타운",
    subCategory: "노래방",
    address: "경북 구미시 인동중앙로1길 5",
    distance: 0.513,
    averageRating: 4.0,
    reviewCount: 4,
    isBookmark: true,
  },
  {
    id: 4,
    imageURL: "place_test_image.png",
    name: "스파크 노래타운",
    subCategory: "노래방",
    address: "경북 구미시 인동중앙로1길 5",
    distance: 0.513,
    averageRating: 4.0,
    reviewCount: 4,
    isBookmark: true,
  },
];

type PlaceCardsProps = {};

export const MIN_Y = 120; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
export const MAX_Y = window.innerHeight - 60; // 바텀시트가 최소로 내려갔을 때의 y 값
export const BOTTOM_SHEET_HEIGHT = window.innerHeight; // 바텀시트의 세로 길이

export const PlaceCardSheet = (props: PlaceCardsProps) => {
  const { sheet, content } = useBottomSheet();

  return (
    <Wrapper ref={sheet}>
      <div className="h-12 rounded-t-lg pt-4 pb-1" id="bottomSheetHeader">
        <div className="w-8 h-1 rounded-sm m-auto bg-slate-500"></div>
      </div>
      <div
        id="bottomSheetContent"
        className="overflow-auto p-4 space-y-4"
        ref={content}
      >
        {TEST_DATA.map((data) => (
          <PlaceCard key={data.id} place={data} />
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
