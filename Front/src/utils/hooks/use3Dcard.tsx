import {useState, useEffect} from "react"

const use3Dcard = (CardWrapperRef: React.RefObject<HTMLDivElement>) => {

  const [cardOffset, setCardOffset] = useState<{width: number, height: number, mouseX: number, mouseY: number, mouseLeaveDelay: number | NodeJS.Timeout}>({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: 200,
  });

  const [wrapperStyle, setWrapperStyle] = useState("");
  const [backgroundStyle, setBackgroundStyle] = useState("");

  useEffect(() => {
    setCardOffset((prev) => {
      return {
        ...prev,
        width: CardWrapperRef.current?.offsetWidth ?? 0,
        height: CardWrapperRef.current?.offsetHeight ?? 0,
      };
    });
  }, []);

  useEffect(() => {
    const mousePx = cardOffset.mouseX / cardOffset.width;
    const mousePy = cardOffset.mouseY / cardOffset.height;
    setWrapperStyle(`rotateY(${mousePx * 30}deg) rotateX(${mousePy * -30}deg)`);
    setBackgroundStyle(
      `translateX(${mousePx * -40}px) translateY(${mousePy * -40}px)`
    );
  }, [cardOffset]);

  const onMouseMove = (e: React.MouseEvent) => {
    setCardOffset((prev) => {
      return {
        ...prev,
        mouseX:
          e.pageX - (CardWrapperRef.current?.offsetLeft ?? 0) - prev.width / 2,
        mouseY:
          e.pageY - (CardWrapperRef.current?.offsetTop ?? 0) - prev.height / 2,
      };
    });
  };

  const onMouseLeave = () => {
    setCardOffset((prev) => {
      return {
        ...prev,
        mouseLeaveDelay: setTimeout(() => {
          setCardOffset((prev) => {
            return {
              ...prev,
              mouseX: 0,
              mouseY: 0,
            };
          });
        }, 1000),
      };
    });
  };

  const onMouseEnter = () => {
    clearTimeout(cardOffset.mouseLeaveDelay);
  };


  return {event: {onMouseMove, onMouseEnter, onMouseLeave}, wrapperStyle, backgroundStyle}
}

export default use3Dcard