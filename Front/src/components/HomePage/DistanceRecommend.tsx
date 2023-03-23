import MiniCard from "./MiniCard";
import styled from "styled-components";

const DistanceRecommend = () => {
  return (
    <CardList>
      <MiniCard />
      <MiniCard />
      <MiniCard />
    </CardList>
  )
};

export default DistanceRecommend

const CardList = styled.div`
  display: flex;
  max-width: 100%;
  overflow-y: hidden;
`