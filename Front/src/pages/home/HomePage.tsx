import styled from "styled-components";
import Sports from "../../svg/main-sports.svg";
import Theme from "../../svg/main-theme.svg";
import Healing from "../../svg/main-healing.svg";
import Game from "../../svg/main-game.svg";
import Culture from "../../svg/main-culture.svg";
import Leisure from "../../svg/main-leisure.svg";
import Recommend from "../../components/HomePage/Recommend";
import UserRecommend from "../../components/HomePage/UserRecommend";
import { useState } from "react";
import Title from "../../components/HomePage/Title";

const HomePage = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <HomeBox isOpenModal={isOpenModal}>
      <TitleBox>
        <Title isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      </TitleBox>
      <hr />
      <MainBox>
        <div>
          <div>
            <img src={Sports} />
            <div>체육</div>
          </div>
          <div>
            <img src={Culture} />
            <div>문화</div>
          </div>
          <div>
            <img src={Game} />
            <div>오락</div>
          </div>
        </div>
        <div>
          <div>
            <img src={Leisure} />
            <div>레저</div>
          </div>
          <div>
            <img src={Theme} />
            <div>테마</div>
          </div>
          <div>
            <img src={Healing} />
            <div>힐링</div>
          </div>
        </div>
      </MainBox>
      <hr />
      <Recommend />
      <hr />
      <UserRecommend />
    </HomeBox>
  );
};

export default HomePage;

const HomeBox = styled.div<{ isOpenModal: boolean }>`
  justify-content: center;
  height: 88vh;
  overflow: ${(props) => (props.isOpenModal ? "hidden" : "auto")};
  > hr {
    background: var(--gray-color);
    height: 1px;
    border: 0;
    margin-inline: 16px;
  }
`;

const MainBox = styled.div`
  padding: 16px;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  > div {
    display: flex;
    justify-content: space-around;
    > div {
      padding: 3px;
      max-width: 100px;
      text-align: center;
      > img {
        height: 75px;
      }
      > div {
        font-size: var(--title-2);
        margin-top: 5px;
      }
    }
  }
`;

const TitleBox = styled.div`
  width: 100%;
`;

