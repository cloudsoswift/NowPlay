import { ChangeEvent, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import { preparedFilterState } from "./Filter";

type Props = {};

export const DistanceSlider = (props: Props) => {
  const [{maxDistance} ,setFilter] = useRecoilState(preparedFilterState);
  const draggableArea = useRef<HTMLDivElement>(null);
  const draggableTarget = useRef<HTMLDivElement>(null);
  const modifyTarget = (target: number) => {
    let pos = 0;
    let maxDistance = 1;
    if (draggableArea.current && draggableTarget.current) {
      const appRect = draggableArea.current.getBoundingClientRect();
      const pipRect = draggableTarget.current.getBoundingClientRect();
      const pipMiddleX = pipRect.width / 2 + target;
      const divider = appRect.width / 10;
      const spot = appRect.width / 5;
      if (pipMiddleX < divider) {
        pos = 0;
        maxDistance = 2;
      } else if (pipMiddleX >= divider && pipMiddleX < spot + divider){
        pos = spot - pipRect.width / 2;
        maxDistance = 5;
      } else if (pipMiddleX >= spot + divider && pipMiddleX < spot * 2 + divider){
        pos = (spot - pipRect.width / 4) * 2;
        maxDistance = 10;
      } else if (pipMiddleX >= spot * 2 + divider && pipMiddleX < spot * 3 + divider){
        pos = (spot  - pipRect.width / 6 ) * 3;
        maxDistance = 20;
      } else if (pipMiddleX >= spot * 3 + divider && pipMiddleX < spot * 4 + divider) {
        pos = (spot  - pipRect.width / 8 ) * 4;
        maxDistance = 50;
      }else if (pipMiddleX >= spot * 4 + divider && pipMiddleX < spot * 5 + divider) {
        pos = (spot  - pipRect.width / 8 ) * 5;
        maxDistance = 500;
      }
    }
    setFilter((prevData) => {
      return {
        ...prevData,
        maxDistance,
      };
    });
    return pos;
  };
  return (
    <div className="grid grid-cols-1 w-full border rounded-xl p-2">
      <div
        className="flex relative justify-between justify-self-center items-center z-0 w-11/12 h-10"
        ref={draggableArea}
      >
        <motion.div
          drag="x"
          dragConstraints={draggableArea}
          dragElastic={0.1}
          dragTransition={{ modifyTarget, power: 0.1, min: 0, max: 200, timeConstant: 100 }}
          ref={draggableTarget}
          className="absolute w-7 h-7 p-1.5"
        >
          <span className="w-4 h-4 block bg-[var(--primary-color)] rounded-full border-2 border-black"/>
        </motion.div>
        <div className="absolute w-full h-1 bg-gray-500 -z-10" />
        <span className="w-1 h-5 mt-8 flex justify-right">2km</span>
        <span className="w-1 h-5 mt-8 flex justify-right">5km</span>
        <span className="w-1 h-5 mt-8 flex justify-right">10km</span>
        <span className="w-1 h-5 mt-8 flex justify-right">20km</span>
        <span className="w-1 h-5 mt-8 flex justify-right">50km</span>
        <span className="w-9 h-5 mt-8 flex justify-right text-[var(--primary-color)]">MAX</span>
      </div>
    </div>
  );
};