import { TPlaceCard } from "./Types";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useBottomSheet } from "../../utils/hooks/useBottomSheet";

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
      className="w-full h-[40vh] grid justify-self-center border rounded-xl"
      onClick={handleClick}
    >
      <img src={`/pics/${place.imageURL}`} alt="" />
      <div className="grid grid-cols-2">
        <div>{place.name}</div>
        <div>{place.subCategory}</div>
      </div>
      <div>{place.address}</div>
      <div className="grid grid-cols-3">
        <div>{place.distance}</div>
        <div>{place.reviewCount}</div>
        <div>{place.averageRating}</div>
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

type PlaceCardsProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MIN_Y = 60; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
export const MAX_Y = window.innerHeight - 80; // 바텀시트가 최소로 내려갔을 때의 y 값
export const BOTTOM_SHEET_HEIGHT = `h-\[${window.innerHeight - MIN_Y}px\]`; // 바텀시트의 세로 길이

export const PlaceCardSheet = (props: PlaceCardsProps) => {
  const { sheet } = useBottomSheet();
  return (
    <div className={`flex flex-col fixed z-[1] top-0 left-0 right-0 rounded-t-lg shadow-lg ${BOTTOM_SHEET_HEIGHT} bg-neutral-500`} ref={sheet}>
      <div className="h-12 rounded-t-lg pt-4 pb-1">
        <div className="w-8 h-1 rounded-sm m-auto bg-slate-500"></div>
      </div>
    </div>
  );
};
