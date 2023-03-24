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
    <div className="grid justify-center w-full border rounded-xl p-2">
      <input
        type="range"
        id=""
        min="1"
        max="6"
        className="w-full"
        onChange={handleDistanceChange}
      />
    </div>
  );
};
