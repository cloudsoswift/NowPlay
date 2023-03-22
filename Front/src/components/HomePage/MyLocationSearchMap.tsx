import styled, { keyframes } from "styled-components";
import { PropsWithChildren } from "react";
import Vector from "../../svg/vector.svg";
import Pin2 from "../../svg/pin2.svg";
import Map from "./Map";

interface ModalType {
  onClickToggleMap: () => void;
  onClickToggleModal: () => void;
  isMap: boolean;
}

const MyLocationSearchMap = ({
  onClickToggleMap,
  onClickToggleModal,
  isMap,
  children,
}: PropsWithChildren<ModalType>) => {
  return (
    <MyMap isMap={isMap}>
      <TopArea>
        <img
          src={Vector}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            if (onClickToggleMap) {
              onClickToggleMap();
            }
          }}
        />
        <div>지도에서 위치 확인</div>
      </TopArea>
      <MapArea>
        <Map />
      </MapArea>
      <LocationArea>
        <img src={Pin2} />
        <div>지역 위치</div>
      </LocationArea>
      <ButtonArea
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      >
        이 위치로 주소 설정
      </ButtonArea>
    </MyMap>
  );
};

export default MyLocationSearchMap;

const Slide = keyframes`
  0%{
    opacity: 0;
    transform: translateX(30px);
  }
  100%{
    opacity: 1;
    transform: translateX(0px);
  }
`;

const MyMap = styled.div<{ isMap: boolean }>`
  width: 100%;
  height: 100%;
  animation-name: ${(props) => (!props.isMap ? null : Slide)};
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  > hr {
    background: var(--gray-color);
    height: 1px;
    border: 0;
    margin-inline: 16px;
  }
`;

const TopArea = styled.div`
  display: flex;
  height: 30px;
  margin: 15px;
  align-items: center;
  > img {
    width: 20px;
    height: 20px;
    transform: scaleX(-1);
  }
  > div {
    font-size: var(--body-text);
    margin-left: 50px;
  }
`;

const MapArea = styled.div`
  margin-inline: auto;
  width: 100%;
  height: 64%;
  background-color: var(--primary-color);
`;

const LocationArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  > img {
    margin: auto 0px;
    width: 20px;
    height: 20px;
  }
  > div {
    font-size: var(--body-text);
    margin: auto 7px;
  }
`;

const ButtonArea = styled.div`
  margin-inline: auto;
  text-align: center;
  width: 80%;
  height: 40px;
  background-color: var(--primary-color);
  font-size: var(--title-2);
  color: var(--body-color);
  line-height: 43px;
  border-radius: 20px;
`;