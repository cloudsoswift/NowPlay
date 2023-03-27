import * as React from "react";
import { ImCross } from "react-icons/im";
import { BusinessTimeSelector } from "./BusinessTimeSelector";
import { Categories } from "./Categories";
import { DistanceSlider } from "./DistanceSlider";
import { SelectableCategories } from "./SelectableCategories";
type Props = {
  className: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Filter = (props: Props) => {
  return (
    <div className={props.className}>
      <div className="sticky top-1 text-end">
        <button
          onClick={() => {
            props.onClose(false);
          }}
          className="mr-1 mt-1"
        >
          <ImCross />
        </button>
      </div>
      <Categories />
      <SelectableCategories />
      <DistanceSlider />
      <BusinessTimeSelector />
    </div>
  );
};
