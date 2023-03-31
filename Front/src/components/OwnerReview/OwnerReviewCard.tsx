import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import use3Dcard from "../../utils/hooks/use3Dcard";

import OwnerReviewModal from "./OwnerReviewModal";

const ReviewCard = ({review}: any) => {
  const CardWrapperRef = useRef<HTMLDivElement>(null);

  const { event, wrapperStyle, backgroundStyle } = use3Dcard(CardWrapperRef);

  const [modalOpen, setModalOpen] = useState(false)

  const modalHandler = () => {
    setModalOpen(prev => !prev)
  }

  return (
    <>
    <CardWrap ref={CardWrapperRef} {...event} onClick={modalHandler}>
      <Card style={{ transform: wrapperStyle }}>
        <div
          className="card-bg"
          style={{
            backgroundImage: `url("${review[1] && review[1].reviewImageUrl}")`,
            transform: backgroundStyle,
          }}
        />
        <CardInfo>
          <h1>{review[0].writer ? review[0].writer.name : "이름없음"}님의 리뷰</h1>
          <p>{review[0].content}</p>
        </CardInfo>
      </Card>
    </CardWrap>
    {modalOpen ? <OwnerReviewModal modalclose={modalHandler} review={review}/> : null}
    </>
  );
};

export default ReviewCard;

const Card = styled.div`
  position: relative;
  flex: 0 0 240px;
  width: 240px;
  height: 320px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(black, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px,
    inset rgba(white, 0.5) 0 0 0 6px;
  transition: 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);

  .card-bg {
    opacity: 0.5;
    position: absolute;
    top: -20px;
    left: -20px;
    width: 120%;
    height: 120%;
    padding: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: 1s cubic-bezier(0.445, 0.05, 0.55, 0.95),
      opacity 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    pointer-events: none;
  }
`;

const CardInfo = styled.div`
  padding: 20px;
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: translateY(40%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);

  h1 {
    font-size: var(--title-1);
    text-shadow: rgba(black, 0.5) 0 10px 10px;
  }

  p {
    opacity: 0;
    text-shadow: rgba(black, 1) 0 2px 3px;
    transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  * {
    position: relative;
    z-index: 1;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(#000, 0.6) 100%
    );
    background-blend-mode: overlay;
    opacity: 0;
    transform: translateY(100%);
    transition: 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
`;


const CardWrap = styled.div`
  margin: 10px;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;
  height: 320px;

  &:hover {
    .card-bg {
      transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1),
        opacity 5s cubic-bezier(0.23, 1, 0.32, 1);
      opacity: 0.8;
    }
    ${Card} {
      box-shadow: rgba(white, 0.2) 0 0 40px 5px, rgba(white, 1) 0 0 0 1px,
        rgba(black, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px,
        inset white 0 0 0 6px;
      transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1),
        box-shadow 2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }

    ${CardInfo} {
      transform: translateY(0);
    }
    ${CardInfo} p {
      opacity: 1;
    }
    ${CardInfo}, ${CardInfo} p {
      transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    }
    ${CardInfo}:after {
      transition: 5s cubic-bezier(0.23, 1, 0.32, 1);
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

