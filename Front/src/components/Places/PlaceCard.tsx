import { TPlaceCard } from "./Types";

type PlaceCardProps = {
  place: TPlaceCard;
};
export const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <div className="w-[90vw] h-[40vh] grid justify-self-center">
      <img src={`pics/${place.imageURL}`} alt="" />
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

type PlaceCardsProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlaceCards = (props: PlaceCardsProps) => {
  const TEST_DATA: Array<TPlaceCard> = [
    {
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
  return (
    <div
      className="w-screen h-[79vh] bg-white border-4 relative top-5 left-0 grid overflow-y-scroll"
      style={{ zIndex: "100" }}
    >
      <button
        onClick={() => {
          props.onClose(false);
        }}
        className="sticky top-1 text-end mr-1"
      >
        X
      </button>
      {TEST_DATA.map((data) => (
        <PlaceCard place={data} />
      ))}
    </div>
  );
};
