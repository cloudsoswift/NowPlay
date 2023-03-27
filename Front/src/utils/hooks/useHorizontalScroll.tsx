import { useRef, useEffect, useState, MutableRefObject } from "react";

interface HorizontalScrollMetrics {}

const useHorizontalScroll = (ref: MutableRefObject<HTMLElement>) => {
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [startX, setStartX] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsMouseOn(true);
    setStartX(e.pageX + ref.current.scrollLeft);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    setIsMouseOn(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseOn) return;

    ref.current!.scrollLeft = startX - e.pageX;
  };
  
  return { onMouseDown, onMouseUp, onMouseMove, onMouseLeave: onMouseUp };
};

export default useHorizontalScroll;
