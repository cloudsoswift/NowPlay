import { ChangeEvent, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import { filterState } from "../Map";

type Props = {};

export const DistanceSlider = (props: Props) => {
  const setFilter = useSetRecoilState(filterState);
  const draggableArea = useRef<HTMLDivElement>(null);
  const draggableTarget = useRef<HTMLDivElement>(null);
  const modifyTarget = (target: number) => {
    let pos = 0;
    let distance = 1;
    if (draggableArea.current && draggableTarget.current) {
      const appRect = draggableArea.current.getBoundingClientRect();
      const pipRect = draggableTarget.current.getBoundingClientRect();
      const pipMiddleX = pipRect.width / 2 + target;
      const divider = appRect.width / 8;
      const spot = appRect.width / 4;
      console.log(target);
      // console.log(appRect, pipRect, pipMiddleX, pipMiddleY);
      if (pipMiddleX < divider) {
        pos = 0;
        distance = 1;
      } else if (pipMiddleX >= divider && pipMiddleX < spot + divider){
        pos = spot - pipRect.width / 2;
        distance = 5;
      } else if (pipMiddleX >= spot + divider && pipMiddleX < spot * 2 + divider){
        pos = (spot - pipRect.width / 4) * 2;
        distance = 10;
      } else if (pipMiddleX >= spot * 2 + divider && pipMiddleX < spot * 3 + divider){
        pos = (spot  - pipRect.width / 6 ) * 3;
        distance = 15;
      } else if (pipMiddleX >= spot * 3 + divider && pipMiddleX < spot * 4 + divider) {
        pos = (spot  - pipRect.width / 8 ) * 4;
        distance = 20;
      }
    }
    setFilter((prevData) => {
      return {
        ...prevData,
        distance,
      };
    });
    return pos;
  };
  return (
    <div className="grid grid-cols-1 w-full border rounded-xl p-2">
      <div
        className="flex relative justify-between justify-self-center items-center z-0 w-3/4 h-10"
        ref={draggableArea}
      >
        <motion.div
          drag="x"
          onDragEnd={(event, info) => console.log(info.point.x, info.point.y)}
          dragConstraints={draggableArea}
          dragElastic={0.1}
          dragTransition={{ modifyTarget, power: 0.1, min: 0, max: 200, timeConstant: 100 }}
          ref={draggableTarget}
          className="absolute"
        >
          <span className="w-4 h-4 block bg-white rounded-full border-2 border-black"/>
        </motion.div>
        <div className="absolute w-full h-1 bg-gray-500 -z-10" />
        <span className="w-1 h-5 mt-8 flex justify-center">1km</span>
        <span className="w-1 h-5 mt-8 flex justify-center">5km</span>
        <span className="w-1 h-5 mt-8 flex justify-center">10km</span>
        <span className="w-1 h-5 mt-8 flex justify-center">15km</span>
        <span className="w-1 h-5 mt-8 flex justify-center">20km</span>
        {/* <span className="w-1 h-5 block bg-black" />
        <span className="w-1 h-5 block bg-black" />
        <span className="w-1 h-5 block bg-black" />
        <span className="w-1 h-5 block bg-black" />
        <span className="w-1 h-5 block bg-black" /> */}
      </div>
    </div>
  );
};