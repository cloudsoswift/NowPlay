import styled, { keyframes } from "styled-components";
import { PropsWithChildren } from "react";
import Search from "../SearchPage/Search";
import Aim from "../../svg/aim.svg";
import Vector from "../../svg/vector.svg";

interface ModalType {
  onClickToggleMap: () => void;
  isMap: boolean;
}

const MyLocationSearchBar = ({
  onClickToggleMap,
  isMap,
  children,
}: PropsWithChildren<ModalType>) => {
  return (
    <MyBar isMap={isMap}>
      <Search />
      <GoToMap
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleMap) {
            onClickToggleMap();
          }
        }}
      >
        <div>
          <img src={Aim} />
          현재 위치로 설정
        </div>
        <img src={Vector} />
      </GoToMap>
      <hr />
    </MyBar>
  );
};

export default MyLocationSearchBar;

const Slide = keyframes`
  0%{
    opacity: 0;
    transform: translateX(-30px);
  }
  100%{
    opacity: 1;
    transform: translateX(0px);
  }
`;

const MyBar = styled.div<{ isMap: boolean }>`
  width: 100%;
  animation-name: ${(props) => (!props.isMap ? Slide : null)};
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

const GoToMap = styled.div`
  display: flex;
  justify-content: space-around;
  height: 30px;
  align-items: center;
  margin-bottom: 15px;
  > div {
    display: flex;
    font-size: var(--body-text);
    > img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
  > img {
    width: 20px;
    height: 20px;
  }
`;
