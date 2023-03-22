import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";
import { filterState } from "../Map";

type Props = {};

export const DistanceSlider = (props: Props) => {
  const setFilter = useSetRecoilState(filterState);
  const handleDistanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFilter((prevData) => {
      return {
        ...prevData,
        distance: Number(e.target.value),
      };
    });
  };
  return (
    <div>
      <input
        type="range"
        id=""
        min="1"
        max="6"
        onChange={handleDistanceChange}
      />
    </div>
  );
};
