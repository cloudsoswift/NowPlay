import { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Treview } from "./MyReview";
import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api/api";
import { queryClient } from "../../main";

const ReviewCard = ({ review }: { review: Treview }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const [upOpen, setUpOpen] = useState(true);

  const [scaleState, setScaleState] = useState(1);

  const [updateImg, setUpdateImg] = useState<FileList | null>();

  const [reviewContent, setReviewContent] = useState(review.review.content);

  const [rating, setRating] = useState(review.review.rating);

  const [isHidden, setIsHidden] = useState(review.review.hidden);

  const removeMutation = useMutation(
    async () =>
      api({
        method: "DELETE",
        url: `places/${review.review.idx}/reviews`,
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["userReview"]);
      },
    }
  );

  const updateMutation = useMutation(
    async () => {
      console.log(reviewContent,
        rating,
        isHidden,)
      const form = new FormData();
      if (updateImg) {
        form.append("files", updateImg[0]);
      }
      form.append(
        "review",
        new Blob(
          [
            JSON.stringify({
              reviewContent,
              rating,
              isHidden,
            }),
          ],
          { type: "application/json" }
        )
      )
      return api({
        method: "PUT",
        url: `places/${review.review.idx}/reviews`,
        data: form
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["userReview"]);
      },
    }
  );

  const removeHandler = () => {
    removeMutation.mutate();
  };

  const updateHandler = () => {
    updateMutation.mutate();
  };

  const upOpenHandler = async (num: number) => {
    setScaleState(num);
    setTimeout(() => {
      return setUpOpen(!!num);
    }, 300);
  };

  const reviewContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(e.target.value);
  };

  const imgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateImg(e.currentTarget?.files);
  };

  const uploadImg = updateImg ? URL.createObjectURL(updateImg[0]) : "";

  return (
    <CardContainer ref={cardRef}>
      {upOpen ? (
        <MyReviewCard scale={scaleState}>
          <h1>{review.review.storeName}</h1>
          <h2>{review.review.createdAt.slice(0, 10)}</h2>
          <h2>별점</h2>
          <ImgBox>
            <img
              src='http://www.bizhankook.com/upload/bk/article/202002/thumb/19402-44437-sampleM.jpg'
              alt=''
            />
          </ImgBox>
          <div className='chat-box'>
            <ReviewerChatting>{review.review.content}</ReviewerChatting>
            {review.ownerComment.content ? (
              <OwnerChatting>{review.ownerComment.content}</OwnerChatting>
            ) : null}
          </div>
          <button
            onClick={() => {
              upOpenHandler(0);
            }}
          >
            수정
          </button>
        </MyReviewCard>
      ) : (
        <ReviewUpdateCard
          height={
            cardRef.current?.clientHeight ? cardRef.current?.clientHeight : 0
          }
          scale={scaleState}
        >
          <input type='file' accept='image/*' onChange={imgHandler} />
          <ImgBox className='img-box'>
            <img src={uploadImg} alt='' />
          </ImgBox>
          <RatingBox>
            <button
              type='button'
              onClick={() => {
                setRating(1);
              }}
            >
              {rating >= 1 ? <AiFillStar /> : <AiOutlineStar />}
            </button>
            <button
              type='button'
              onClick={() => {
                setRating(2);
              }}
            >
              {rating >= 2 ? <AiFillStar /> : <AiOutlineStar />}
            </button>
            <button
              type='button'
              onClick={() => {
                setRating(3);
              }}
            >
              {rating >= 3 ? <AiFillStar /> : <AiOutlineStar />}
            </button>
            <button
              type='button'
              onClick={() => {
                setRating(4);
              }}
            >
              {rating >= 4 ? <AiFillStar /> : <AiOutlineStar />}
            </button>
            <button
              type='button'
              onClick={() => {
                setRating(5);
              }}
            >
              {rating >= 5 ? <AiFillStar /> : <AiOutlineStar />}
            </button>
          </RatingBox>
          <textarea
            name=''
            id=''
            cols={40}
            rows={4}
            value={reviewContent}
            onChange={reviewContentHandler}
          />
          <button
            onClick={() => {
              upOpenHandler(1);
              updateHandler();
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              upOpenHandler(1);
              removeHandler();
            }}
          >
            삭제
          </button>
        </ReviewUpdateCard>
      )}
    </CardContainer>
  );
};

export default ReviewCard;

const CardContainer = styled.div`
  height: fit-content;
`;

const openAnimation = keyframes`
  0% {
    scale: 0
  }
  100% {
    scale: 1
  }
`;

const RatingBox = styled.div`
  svg {
    color: var(--primary-color);

    font-size: var(--title-1);
  }
`;

const ReviewUpdateCard = styled.div<{ height: number; scale: number }>`
  height: ${(props) => `${props.height - 20}px`};
  width: 90vw;

  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  scale: ${(props) => (props.scale === 0 ? 1 : 0)};

  box-shadow: 2px 2px 2px var(--primary-color);

  transition: all 0.3s ease;

  animation: ${openAnimation} 0.3s forwards;

  > button {
    text-align: center;
    width: 100%;

    padding: 10px;

    background-color: var(--primary-color-on);

    font-size: var(--title-2);
    color: var(--body-color);

    transition: all 0.1s ease;

    :active {
      background-color: var(--primary-color);
      font-size: var(--title-1);
    }
  }
`;

const ImgBox = styled.div`
  height: 20vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 10px;
    width: 100%;
    max-width: 300px;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }
`;

const MyReviewCard = styled.div<{ scale: number }>`
  width: 90vw;
  height: auto;

  margin-bottom: 20px;

  scale: ${(props) => props.scale};

  box-shadow: 2px 2px 2px var(--primary-color);

  transition: all 0.3s ease;

  animation: ${openAnimation} 0.3s forwards;

  h1 {
    font-size: var(--title-1);
  }

  .img-box {
    height: 20vh;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      border-radius: 10px;
      width: 100%;
      max-width: 300px;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }

  button {
    text-align: center;
    width: 100%;

    padding: 10px;

    background-color: var(--primary-color-on);

    font-size: var(--title-2);
    color: var(--body-color);

    transition: all 0.1s ease;

    :active {
      background-color: var(--primary-color);
      font-size: var(--title-1);
    }
  }
`;

const ReviewerChatting = styled.div`
  position: relative;
  background-color: #f9e000;

  max-width: 350px;

  padding: 10px;
  margin: 20px;
  border-radius: 10px;

  font-size: var(--body-text);

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
  width: 80%;
  max-width: 350px;

  word-break: break-all;

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
