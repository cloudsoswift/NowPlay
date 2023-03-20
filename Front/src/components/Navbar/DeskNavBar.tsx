import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { BiSearch, BiStar, BiHome, BiMapPin, BiUser } from "react-icons/bi";

const DeskNavbar = () => {
  const [navActive, setNavActive] = useState<number>(0);

  const navLocation = useLocation();

  const moveIndicator = () => {
    switch (true) {
      case /^\/search/.test(navLocation.pathname):
        setNavActive(0);
        break;
      case /^\/signup/.test(navLocation.pathname):
        setNavActive(1);
        break;
      case /^\/around/.test(navLocation.pathname):
        setNavActive(3);
        break;
      case /^\/mypage/.test(navLocation.pathname):
        setNavActive(4);
        break;
      case /^\/$/.test(navLocation.pathname):
        setNavActive(2);
        break;
      default:
        setNavActive(-1);
    }
  };

  useEffect(moveIndicator, [navLocation.pathname]);

  return (
    <NavBox>
      <NavStyle to='/search'>
        <BiSearch />
        <span>검색</span>
      </NavStyle>
      <NavStyle to='/signup'>
        <BiStar />
        <span>즐겨찾기</span>
      </NavStyle>
      <NavStyle to='/'>
        <BiHome />
        <span>홈</span>
      </NavStyle>
      <NavStyle to='/around'>
        <BiMapPin />
        <span>주변</span>
      </NavStyle>
      <NavStyle to='/mypage'>
        <BiUser />
        <span>마이페이지</span>
      </NavStyle>
      <Indicatior movement={navActive}></Indicatior>
    </NavBox>
  );
};

export default DeskNavbar;

const NavBox = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  background-color: var(--gray-color-light);
  width: 10vw;
  height: 100vh;

  justify-content: space-evenly;
`;

const NavStyle = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  width: 10vw;
  z-index: 1;

  svg {
    transition: 0.1s;
    font-size: var(--title-1);
    margin-bottom: 8px;
  }

  &.active > svg {
    color: white;
    font-size: var(--large-text);
  }

  span {
    font-size: var(--navigation-text);
    height: 20px;
  }

  &.active > span {
    color: white;
    font-size: var(--navigation-text);
  }
`;

const Indicatior = styled.div<{ movement: number }>`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 80px;
  width: 20vw;
  z-index: 0;
  background-color: var(--primary-color);
  border-radius: 10px;
  /* border: var(--gray-color-light) 17px solid; */

  transition: 0.5s;
  transform: ${(props) => `translateY(${props.movement * 20}vw)`};
`;
