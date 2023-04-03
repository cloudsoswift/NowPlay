import styled from "styled-components";
import Vector from "../../svg/vector.svg";
import { BiArrowBack } from "react-icons/bi";
import React from "react";

const Topbar = () => {
  return (
    <>
      <TopbarBox>
        <div
          onClick={(e: React.MouseEvent) => {
            history.back();
          }}
        >
          <BiArrowBack />
        </div>
      </TopbarBox>
    </>
  );
};

export default Topbar;

const TopbarBox = styled.div`
  z-index: 2;
  position: fixed;
  width: 100vw;
  top: 0px;
  background-color: var(--gray-color-light);
  height: 42px;
  /* border-bottom: 1px solid var(--gray-color); */
  > div {
    margin-left: 10px;
    padding: 5px;
    height: 100%;
    width: 50px;
    text-align: center;
    > svg {
      /* background-color: var(--primary-color); */
      width: 30px;
      height: 30px;
      fill: var(--primary-color);
    }
  }
`;
