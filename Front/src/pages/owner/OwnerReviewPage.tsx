import { useState } from "react";
import styled from "styled-components";
import ReviewCard from "../../components/OwnerReview/OwnerReviewCard";

const OwnerReviewPage = () => {
  const [isComment, setIsComment] = useState(false);
  const [openCommentInput, setOpenCommentInput] = useState(false);

  const CommentOnOff = () => {
    setIsComment((prev) => !prev);
  };

  const openComment = () => {
    setOpenCommentInput((prev) => !prev);
  };

  return (
    <>
      <ReviewContainer>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        {/* <ReviewCard>
          이게 리뷰 카드 <button>삭제요청버튼</button>
          <div>여기는 리뷰 정보 다시주문했어요 별점5개</div>
          <button onClick={CommentOnOff}>이거는 댓글 온오프 버튼</button>
          {isComment ? (
            <div>
              이게 댓글입니다. 재주문 고맙습니다...
              <button onClick={openComment}>코멘트 수정하기</button>
              {openCommentInput ? (
                <div>
                  여기는 코멘트 작성하기가 눌리면 보입니다.
                  <input type="text" defaultValue={"재주문 고맙습니다..."} />
                  <button>코멘트 수정버튼</button>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              여기는 리뷰 댓글이 없으면 보일겁니다
              <button onClick={openComment}>코멘트 작성하기</button>
              {openCommentInput ? (
                <div>
                  여기는 코멘트 작성하기가 눌리면 보입니다.
                  <input type="text" />
                  <button>코멘트 작성버튼</button>
                </div>
              ) : null}
            </div>
          )}
        </ReviewCard> */}
      </ReviewContainer>
    </>
  );
};

export default OwnerReviewPage;

const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  border-left: 20px solid var(--primary-color-light);

  justify-content: center;
  min-height: calc(100vh - 100px);

  background-color: var(--body-color);
  border-radius: 10px;

  padding: 20px;
`;
