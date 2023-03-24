import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { BiHighlight, BiHome, BiCalendarCheck } from "react-icons/bi";

const DeskNavbar = () => {
  const [navActive, setNavActive] = useState<number>(0);

  const navLocation = useLocation();

  const moveIndicator = () => {
    switch (true) {
      case /^\/owner\/reserve/.test(navLocation.pathname):
        setNavActive(1);
        break;
      case /^\/owner\/review/.test(navLocation.pathname):
        setNavActive(2);
        break;
      case /^\/owner$/.test(navLocation.pathname):
        setNavActive(0);
        break;
      default:
        setNavActive(-2);
    }
  };

  useEffect(moveIndicator, [navLocation.pathname]);

  return (
    <NavContainer>
      <NavBox>
        <NavHeader>여가어때</NavHeader>
        <NavStyle to="" end>
          <BiHome />
          <span>가게 정보/관리</span>
        </NavStyle>
        <NavStyle to="reserve">
          <BiCalendarCheck />
          <span>예약 관리</span>
        </NavStyle>
        <NavStyle to="review">
          <BiHighlight />
          <span>리뷰 관리</span>
        </NavStyle>
        <Indicatior movement={navActive}></Indicatior>
      </NavBox>
    </NavContainer>
  );
};

export default DeskNavbar;

const NavContainer = styled.div`
  position: relative;
  min-width: 240px;
  
`;

const NavBox = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  background-color: var(--body-color);
  min-width: 240px;
  height: 100vh;
  box-shadow: 3px 3px 10px var(--gray-color-light);
`;

const NavHeader = styled.div`
  font-family: LINESeedKRBd;
  text-align: center;
  height: 100px;
  font-size: 55px;
  color: var(--primary-color)
`;

const NavStyle = styled(NavLink)`
  display: flex;
  flex-direction: row;
  height: 90px;
  min-width: 240px;
  padding: 20px;
  margin-bottom: 20px;
  align-items: center;
  color: var(--gray-color);
  width: 10vw;
  z-index: 1;

  svg {
    margin-right: 20px;
    transition: 0.1s;
    font-size: var(--title-2);
  }

  &.active > svg {
    color: var(--text-color);
    font-size: calc(var(--title-2) + 5px);
  }

  span {
    font-size: var(--title-2);
  }

  &.active > span {
    color: var(--text-color);
    font-size: calc(var(--title-2) + 5px);
  }
`;

const Indicatior = styled.div<{ movement: number }>`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 80px;
  width: 10px;
  z-index: -1;
  background-color: var(--primary-color);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  /* border: var(--gray-color-light) 17px solid; */

  transition: 0.5s;
  transform: ${(props) => `translateY(${105 + props.movement * 110}px)`};
`;
