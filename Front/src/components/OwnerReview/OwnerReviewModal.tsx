import { useEffect, useState } from "react";
import styled from "styled-components";

import { BiX } from "react-icons/bi";

type TreviewData = {
  review_index: number;
  review_content: string;
  review_rate: number;
  review_created_at: string;
  review_is_hidden: boolean;
  owner_comments: {
    owner_comment_index: number;
    owner_comment_content: string;
    owner_comment_created_at: string;
  };
};

const dummyReview = {
  review_index: 1,
  review_content:
    "진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~진짜 잘먹었습니다! 다음에 또올게요~~",
  review_rate: 5,
  review_created_at: "2023-03-28",
  review_is_hidden: false,
  owner_comments: {
    owner_comment_index: 1,
    owner_comment_content:
      "감사합니다! 항상 발전하는 스테이크 하우스가 되도록 하겠습니다! 다음에 또 방문해주세요 ^^",
    owner_comment_created_at: "2023-03-29",
  },
};

const OwnerReviewModal = ({ modalclose }: { modalclose: () => void }) => {
  const [modalOpacity, setModalOpacity] = useState(0);

  useEffect(() => {
    setModalOpacity(1);
    document.body.style.overflow = "hidden";
  }, []);

  const modalClosehandler = async () => {
    document.body.style.overflow = "auto";
    setModalOpacity(0);

    setTimeout(() => modalclose(), 500);
  };

  return (
    <>
      <ReviewModal opacity={modalOpacity}>
        <BiX onClick={modalClosehandler} />
        <ReviewInfo>
          <h1>
            XXX님의 리뷰
            <p>{dummyReview.review_created_at}</p>
          </h1>
          <p>
            평점{" "}
            <StarRating>
              <StarRatingFill
                style={{ width: dummyReview.review_rate * 20 + "%" }}
              >
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </StarRatingFill>
              <StarRatingBase>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </StarRatingBase>
            </StarRating>
          </p>
          <p>리뷰 공개 여부 : {dummyReview.review_is_hidden.toString()}✔❌</p>
        </ReviewInfo>
        <ReviewChat>
          <ReviewerChatting>
            <img
              src='https://www.hawksmoornyc.com/wp-content/uploads/Prime-rib-with-sides-2--1024x683.jpg'
              alt=''
            />
          </ReviewerChatting>
          <ReviewerChatting>{dummyReview.review_content}</ReviewerChatting>
          <OwnerChatting>
            {dummyReview.owner_comments.owner_comment_content}
          </OwnerChatting>
          <ChattingInput>
            <input type='text' />
            <button>제출</button>
          </ChattingInput>
        </ReviewChat>
      </ReviewModal>
      <ModalBackground onClick={modalClosehandler} opacity={modalOpacity} />
    </>
  );
};

export default OwnerReviewModal;

const ModalBackground = styled.div<{ opacity: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #dcdcdc90;
  z-index: 10;

  opacity: ${(props) => props.opacity};

  transition: 0.5s all;
`;

const ReviewModal = styled.div<{ opacity: number }>`
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 20vh;
  left: 20vw;
  width: 60vw;
  height: 60vh;

  padding: 40px;

  background-color: white;

  border-left: 40px solid var(--primary-color);
  border-radius: 10px;

  z-index: 11;

  opacity: ${(props) => props.opacity};

  transition: 0.5s all;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    font-size: calc(var(--large-text) + 20px);

    color: var(--primary-color);

    transition: 0.5s all;

    cursor: pointer;

    &:hover {
      scale: 1.2;
    }
  }
`;

const ReviewInfo = styled.div`
  width: 40%;

  h1 {
    width: 90%;
    font-size: var(--large-text);
    margin-bottom: 20px;
    border-bottom: solid 2px var(--primary-color);
  }

  p {
    font-size: var(--title-2);
  }
`;

const ReviewChat = styled.div`
  position: relative;

  width: 60%;

  overflow: auto;

  background-color: var(--primary-color-light);
  border-radius: 10px;

  &::-webkit-scrollbar-track {
    
    background-color: var(--body-color);
  }

  &::-webkit-scrollbar {
    width: 7px;
    background-color: var(--body-color);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary-color);
    border-radius: 10px;
  }
`;

const ReviewerChatting = styled.div`
  position: relative;
  background-color: #f9e000;
  width: fit-content;
  max-width: 350px;

  padding: 10px;
  margin: 20px;
  border-radius: 10px;

  font-size: var(--body-text);

  img {
    border-radius: 10px;
    width: 100%;
    max-width: 300px;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  &:after {
    border-top: 0px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #f9e000;
    content: "";
    position: absolute;
    bottom: 0px;
    left: -10px;
  }
`;

const OwnerChatting = styled.div`
  position: relative;
  background-color: #afdfdc;
  width: fit-content;
  max-width: 350px;

  margin: 20px;
  margin-left: auto;
  padding: 10px;

  border-radius: 10px;

  font-size: var(--body-text);

  &:after {
    border-top: 0px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #afdfdc;
    content: "";
    position: absolute;
    bottom: 0px;
    right: -10px;
  }
`;

const ChattingInput = styled.div`
  position: sticky;

  bottom: 0;
  left: 0;
  height: 50px;
  width: calc(100%);

  border: 1px solid var(--primary-color);

  border-radius: 10px;

  input {
    height: 100%;
    width: calc(100% - 60px);

    border-bottom-left-radius: 10px;

    font-size: var(--title-2);

    padding-left: 10px;

    &:focus {
      outline: none;
    }
  }

  button {
    height: 100%;
    width: 60px;

    background-color: #f9e000;

    border-bottom-right-radius: 10px;

    font-size: var(--title-2);
  }
`;

const StarRating = styled.div`
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color: #2b2a29;
`;

const StarRatingFill = styled.div`
  padding: 0;
  position: absolute;
  z-index: 1;
  display: flex;
  left: 0;
  overflow: hidden;
  -webkit-text-fill-color: var(--primary-color);
  > span {
    font-size: var(--large-text);
  }
`;

const StarRatingBase = styled.div`
  z-index: 0;
  padding: 0;
  > span {
    font-size: var(--large-text);
  }
`;
