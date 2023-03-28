import styled from "styled-components";
import ReviewCard from "../../components/OwnerReview/OwnerReviewCard";

const OwnerReviewPage = () => {

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
