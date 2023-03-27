import { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { filterState } from "../Map";

type Props = {};
export const BusinessTimeSelector = (props: Props) => {
  const setFilter = useSetRecoilState(filterState);
  const nowHour = new Date().getHours();
  const nowMinute = new Date().getMinutes();
  const [hour, setHour] = useState(nowHour);
  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter((prevData) => {
      return {
        ...prevData,
        businessTime: e.target.value,
      };
    });
  };
  return (
    <div className="flex justify-center w-full border rounded-xl p-2">
      <select name="" id="" onChange={(e)=>{setHour(Number(e.target.value))}}>
        {Array.from(Array(25 - nowHour).keys()).map((v) => (
          <option value={v + nowHour}>{v + nowHour}</option>
        ))}
      </select>
      시
      <select name="" id="">
        {
          <option value={0} disabled={nowMinute > 0 && hour <= nowHour}>
            0
          </option>
        }
        {
          <option value={0} disabled={nowMinute > 30}>
            30
          </option>
        }
      </select>
      분 이후
    </div>
  );
};
