import * as React from 'react';
import { BusinessTimeSelector } from './BusinessTimeSelector';
import { Categories } from './Categories';
import { DistanceSlider } from './DistanceSlider';
import { SelectableCategories } from './SelectableCategories';
type Props = {
  className: string,
  onClose:  React.Dispatch<React.SetStateAction<boolean>>
};
export const Filter = (props: Props) => {
  return (
    <div className={props.className}>
      <button onClick={()=>{props.onClose(false)}} className="absolute top-2 right-2">X</button>
      <Categories />
      <SelectableCategories />
      <DistanceSlider />
      <BusinessTimeSelector />
    </div>
  );
};