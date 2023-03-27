import MiniCard from "./MiniCard";
import styled from "styled-components";

const UserRecommend = () => {
  return (
    <UserRecommendBox>
      <Font>
        여기 가라
      </Font>
      <CardList>
        <MiniCard />
        <MiniCard />
        <MiniCard />
      </CardList>
    </UserRecommendBox>
  )
};

export default UserRecommend

const UserRecommendBox = styled.div`
  padding: 16px;
`

const CardList = styled.div`
  display: flex;
  max-width: 100%;
  overflow-y: hidden;
`

const Font = styled.div`
  font-size: var(--title-2);
  margin-left: 16px;

`