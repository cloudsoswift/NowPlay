import Pin2 from "../../svg/pin2.svg";
import styled from "styled-components";
import Sports from "../../svg/main-sports.svg";
import Theme from "../../svg/main-theme.svg";
import Healing from "../../svg/main-healing.svg";
import Game from "../../svg/main-game.svg";
import Culture from "../../svg/main-culture.svg";
import Leisure from "../../svg/main-leisure.svg";
import DistanceRecommend from "../../components/HomePage/DistanceRecommend";
import PopularRecommend from "../../components/HomePage/PopularRecommend";
import UserRecommend from "../../components/HomePage/UserRecommend";
import MyLocationModal from "../../components/HomePage/MyLocationModal";
import { NavLink, Routes, Route } from "react-router-dom";
import { useCallback, useState } from "react";

const HomePage = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalBox, setIsOpenModalBox] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    if (isOpenModal) {
      setIsOpenModalBox(!isOpenModalBox)
      setTimeout(() => setIsOpenModal(!isOpenModal), 500)
    } else {
      setIsOpenModalBox(!isOpenModalBox)
      setIsOpenModal(!isOpenModal);
    }
  }, [isOpenModal])

  return (
    <HomeBox isOpenModal={isOpenModal}>
      {isOpenModal && (<MyLocationModal onClickToggleModal={onClickToggleModal} isOpenModal={isOpenModalBox}/>)}
      <TitleBox onClick={onClickToggleModal}>
        <img src={Pin2} />
        <div>지역 위치</div>
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
      <HomePageRecommend>
        <NavLink to="popular">
          <li>인기순</li>
        </NavLink>
        <NavLink to="recent">
          <li>거리순</li>
        </NavLink>
      </HomePageRecommend>
      <HomePageContent>
        <Routes>
          <Route path="/" element={<PopularRecommend />}></Route>
          <Route path="popular" element={<PopularRecommend />}></Route>
          <Route path="recent" element={<DistanceRecommend />}></Route>
        </Routes>
      </HomePageContent>
      <hr />
      <UserRecommend />
    </HomeBox>
  );
};

export default HomePage;

const HomeBox = styled.div<{ isOpenModal: boolean }>`
  justify-content: center;
  height: 88vh;
  overflow: ${(props) => (props.isOpenModal ? 'hidden' : 'auto')};
  > hr {
    background: var(--gray-color);
    height: 1px;
    border: 0;
    margin-inline: 16px
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  > img {
    margin: auto 0px;
    width: 24px;
    height: 24px;
  }
  > div {
    font-size: var(--title-2);
    margin: auto 7px;
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

const HomePageRecommend = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 16px;

  /* border-left: 2px solid var(--primary-color);
  border-right: 2px solid var(--primary-color);
  border-bottom: 2px solid var(--primary-color); */

  > a {
    width: 25%;
    padding: 10px;
    font-size: var(--body-text);
    text-align: center;
    border-radius: 10px;

    transition: 0.2s all;
  }

  > a.active {
    color: white;
    background-color: var(--primary-color);
  }
`;

const HomePageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 16px;
`;
