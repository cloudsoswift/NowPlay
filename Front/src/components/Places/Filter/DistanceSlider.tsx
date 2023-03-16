import { ChangeEvent } from "react";

type Props = {
  
};

export const DistanceSlider = (props: Props) => {
  const handleDistanceChange = (e:ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }
  return (
    <div>
      <input type="range" id="" min="1" max="6" onChange={handleDistanceChange}/>
    </div>
  );
};