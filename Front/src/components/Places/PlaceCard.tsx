import { TPlaceCard } from "./Types";

type PlaceCardProps = {};
export const PlaceCard = (props: PlaceCardProps) => {
  return <div></div>;
};

type PlaceCardsProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlaceCards = (props: PlaceCardsProps) => {
  const TEST_DATA: Array<TPlaceCard> = [
    {
      name: "",
      address: "",
      contact_number: "",
      homepage: "",
      imageURL: "",
      latitude: 0,
      longtitude: 0,
      explanation: "",
      closeOnHolidays: false,
    },
  ];
  return (
    <div
      className="w-screen h-[80vh] bg-white border-4 relative top-5 left-0"
      style={{ zIndex: "100" }}
    >
      <button
        onClick={() => {
          props.onClose(false);
        }}
        className="absolute top-2 right-2"
      >
        X
      </button>
      <PlaceCard />
    </div>
  );
};
