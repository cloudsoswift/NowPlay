import styled from "styled-components";
import MainBox from "../../components/HomePage/MainBox";
import Recommend from "../../components/HomePage/Recommend";
import UserRecommend from "../../components/HomePage/UserRecommend";
import { Suspense, useState } from "react";
import Title from "../../components/HomePage/Title";

const HomePage = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalBox, setIsOpenModalBox] = useState<boolean>(false);
  const [selectAddress, setSelectAddress] = useState<string | null>("");
  const [selectLocation, setSelectLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  return (
    <HomeBox isOpenModal={isOpenModal}>
      <TitleBox>
        <Title
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          selectAddress={selectAddress}
          setSelectAddress={setSelectAddress}
          isOpenModalBox={isOpenModalBox}
          setIsOpenModalBox={setIsOpenModalBox}
          selectLocation={selectLocation}
          setSelectLocation={setSelectLocation}
          textBoolean={true}
        />
      </TitleBox>
      <hr />
      <Suspense fallback={<div>로딩중...</div>}>
        <MainBox />
      </Suspense>
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
  height: 100%;
  overflow: ${(props) => (props.isOpenModal ? "hidden" : "auto")};
  > hr {
    background: var(--gray-color);
    height: 1px;
    border: 0;
    margin-inline: 16px;
  }
`;

const TitleBox = styled.div`
  width: 100%;
`;
