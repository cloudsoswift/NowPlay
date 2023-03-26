import MiniCard from "./MiniCard";
import styled from "styled-components";

const RecommendDistance = () => {
  return (
    <CardList>
      <MiniCard />
      <MiniCard />
      <MiniCard />
    </CardList>
  )
};

export default RecommendDistance

const CardList = styled.div`
  display: flex;
  max-width: 100%;
  overflow-y: hidden;
`