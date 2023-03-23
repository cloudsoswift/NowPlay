import { useState } from "react";
import styled from "styled-components";

const OwnerReviewPage = () => {
  const [isComment, setIsComment] = useState(false);
  const [openCommentInput, setOpenCommentInput] = useState(false);

  const CommentOnOff = () => {
    setIsComment(prev => !prev)
  }

  const openComment = () => {
    setOpenCommentInput(prev => !prev)
  }

  return (
    <>
      <h1>리뷰페이지</h1>
      <ReviewContainer>
        여기는 리뷰 컨테이너
        <div>
          이게 리뷰 카드 <button>삭제요청버튼</button>
          <div>여기는 리뷰 정보 다시주문했어요 별점5개</div>
          <button onClick={CommentOnOff}>이거는 댓글 온오프 버튼</button>
          {isComment ? (
            <div>
              이게 댓글입니다. 재주문 고맙습니다...
              <button onClick={openComment}>코멘트 수정하기</button>
              {openCommentInput ?<div>
                여기는 코멘트 작성하기가 눌리면 보입니다.
                <input type="text" defaultValue={"재주문 고맙습니다..."}/>
                <button>코멘트 수정버튼</button>
              </div> : null}
            </div>
          ) : (
            <div>
              여기는 리뷰 댓글이 없으면 보일겁니다
              <button onClick={openComment}>코멘트 작성하기</button>
              {openCommentInput ?<div>
                여기는 코멘트 작성하기가 눌리면 보입니다.
                <input type="text" />
                <button>코멘트 작성버튼</button>
              </div> : null}
            </div>
          )}
        </div>
      </ReviewContainer>
    </>
  );
};

export default OwnerReviewPage;

const ReviewContainer =  styled.div`
    button {
        background-color: red;
    }
`