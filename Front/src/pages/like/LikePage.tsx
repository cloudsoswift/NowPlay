import styled from "styled-components";
import LikeContent from "../../components/LikePage/LikeContent";

const LikePage = () => {

  return (
    <LikeBox>
      <LikeContent />
    </LikeBox>
  );
};

export default LikePage;

const LikeBox = styled.div`
  width: 100%;
`;