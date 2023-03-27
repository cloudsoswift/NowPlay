import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const OwnerReviewModal = ({ modalclose }: { modalclose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const modalClosehandler = () => {
    document.body.style.overflow = "auto";
    modalclose();
  };

  return (
    <>
      <ReviewModal>
        <div>123</div>
        <div>123</div>
      </ReviewModal>
      <ModalBackground onClick={modalClosehandler} />
    </>
  );
};

export default OwnerReviewModal;

const modalbgOpening = keyframes`
  0%{
    opacity: 0;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #dcdcdc90;
  z-index: 10;

  transition: 0.5s all;

  animation: ${modalbgOpening} 0.5s;
`;

const modalOpening = keyframes`
  0%{
    transform: translateY(10px);
    opacity: 0;
  }
  100%{}
`;

const ReviewModal = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 20vh;
  left: 20vw;
  width: 60vw;
  height: 60vh;

  transition: 0.5s all;

  background-color: white;
  border-radius: 10px;

  z-index: 11;

  animation: ${modalOpening} 0.5s;
`;
