import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";
import { filterState } from "../Map";

type Props = {};
export const BusinessTimeSelector = (props: Props) => {
  const setFilter = useSetRecoilState(filterState);
  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter((prevData)=>{
      return {
        ...prevData,
        businessTime: e.target.value
      }
    })
  };
  return (
    <div>
      <input type="time" name="" id="" onChange={handleTimeChange} />
    </div>
  );
};
