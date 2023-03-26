import * as React from "react";
import { ImCross } from "react-icons/im";
import { BusinessTimeSelector } from "./BusinessTimeSelector";
import { Categories } from "./Categories";
import { DistanceSlider } from "./DistanceSlider";
import { SelectableCategories } from "./SelectableCategories";
import { motion } from "framer-motion";
type Props = {
  className: string;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Filter = ({className, onClose}: Props) => {
  const handleApplyFilter = () => {
    
  }
  return (
    <motion.div className={`${className} box`}>
      <Categories />
      <SelectableCategories />
      <DistanceSlider />
      <BusinessTimeSelector />
      <div>
        <button onClick={handleApplyFilter} className="w-full border rounded-xl p-2 mt-2 text-white bg-[var(--primary-color)]">적용</button>
      </div>
      <div className="bottom-0">
        <button
          onClick={() => {
            onClose(false);
          }}
          className="mr-1 mt-1"
        >
          <ImCross />
        </button>
      </div>
    </motion.div>
  );
};
