import { useState, useReducer,  } from "react";
import styled from "styled-components";

const initialState = {
  client: { X: 0, Y: 0 },
  offset: { X: 0, Y: 0 },
  transition: "transform 1s",
  transform: "",
  mouseOnOff: false,
  eventOver: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "client": {
      return { ...state, client: { X: action.X, Y: action.Y } };
    }
    case "offset": {
      return {
        ...state,
        offset: { X: action.X - state.client.X, Y: action.Y - state.client.Y },
      };
    }
    case "mouseOnOff": {
      return { ...state, mouseOnOff: action.value };
    }
    case "transform": {
      if (action.reset) return {
        ...state,
        transform: ``,
      }

      if (action.over) return {
        ...state,
        transform: `translate(${action.over * window.innerHeight}px, ${state.offset.Y}px) rotate(${90 * action.over}deg)`,
      }

      return {
        ...state,
        transform: `translate(${state.offset.X}px, ${state.offset.Y}px) rotate(${state.offset.X *0.1}deg)`,
      };
    }
    case "transition": {
      return {
        ...state,
        transition: action.value,
      };
    }
    case "eventOver": {
      return {
        ...state,
        eventOver: true,
      };
    }
  }
}

export const MyReviewCard = ({ idx, url, removeCard }: { idx: number; url: string; removeCard: (url: string) => void }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [xyInfo, setxyInfo] = useState({ clientX: 0, clientY: 0 });
  const [offsetXY, setOffsetXY] = useState({
    offsetX: 0,
    offsetY: 0,
    mMove: "",
  });

  const mouseDownHandler = (e) => {
    // console.log(e.touches[0].clientX)
    if (state.eventOver) return;
    dispatch({ type: "mouseOnOff", value: false });
    const { clientX, clientY } = e;
    dispatch({ type: "client", X: clientX, Y: clientY });
    dispatch({ type: "transition", value: "" });
    dispatch({ type: "mouseOnOff", value: true });
  };

  const mouseMoveHandler = (e) => {
    if (state.eventOver) return;
    if (!state.mouseOnOff) return;
    if (state.client.X === 0 && state.client.Y === 0) return;
    const { clientX, clientY } = e;
    dispatch({ type: "offset", X: clientX, Y: clientY });
    dispatch({ type: "transform" });

    if (Math.abs(state.offset.X) > e.currentTarget.clientWidth * 0.7) {
      const direction = state.offset.X > 0 ? 1 : -1;
      dispatch({ type: "eventOver"});
      dispatch({ type: "transition", value: "transform 1s" });
      dispatch({ type: "transform", over: direction});

      setTimeout(() => {
        removeCard(url)
      }, 1000)
    }
  };

  const mouseUpHandler = (e) => {
    if (state.eventOver) return;
    dispatch({ type: "mouseOnOff", value: false });
    dispatch({ type: "client", X: 0, Y: 0 });
    dispatch({ type: "transition", value: "transform 0.5s" });
    dispatch({ type: "transform", reset: true });
  };

  const mouseLeaveHandler = (e) => {
    if (state.eventOver) return;
    dispatch({ type: "mouseOnOff", value: false });
    dispatch({ type: "client", X: 0, Y: 0 });
    dispatch({ type: "transition", value: "transform 0.5s" });
    dispatch({ type: "transform", reset: true });
  };


  const dragStartHandler = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Card
      i={idx}
      style={{ transform: state.transform, transition: state.transition }}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseLeaveHandler}
      onDragStart={dragStartHandler}
      onTouchStart={mouseDownHandler}
      onTouchMove={mouseMoveHandler}
      onTouchCancel={mouseUpHandler}
      url={url}
    >
      {/* <img src={url} alt='' /> */}
    </Card>
  );
};

const Card = styled.div<{ i: number, url: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 20px;
  transform: ${(props) => {
    return `translateZ(calc(${-30 * props.i}px)) translateY(calc(${
      -20 * props.i
    }px)) rotate(calc(${-4 * props.i}deg))`;
  }};
  filter: drop-shadow(2px 2px 20px rgba(0, 0, 0, 0.5));
  cursor: pointer;
  user-select: none;
  background-image: ${props => {return `url(${props.url})`}};
  background-size: cover;
  background-position: center;

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }
`;
