import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { BiSearch, BiStar, BiHome, BiMapPin, BiUser } from "react-icons/bi";

const MobileNavbar = () => {
  const [navActive, setNavActive] = useState<number>(0);

  const navLocation = useLocation();

  const moveIndicator = () => {
    switch (true) {
      case /^\/mobile\/search/.test(navLocation.pathname):
        setNavActive(0);
        break;
      case /^\/mobile\/like/.test(navLocation.pathname):
        setNavActive(1);
        break;
      case /^\/mobile\/places/.test(navLocation.pathname):
        setNavActive(3);
        break;
      case /^\/mobile\/mypage/.test(navLocation.pathname):
        setNavActive(4);
        break;
      case /^\/mobile\/homepage/.test(navLocation.pathname):
        setNavActive(2);
        break;
      default:
        setNavActive(-1);
    }
  };

  useEffect(moveIndicator, [navLocation.pathname]);

  return (
    <NavBox>
      <NavStyle to='search'>
        <BiSearch />
        <span>검색</span>
      </NavStyle>
      <NavStyle to='like'>
        <BiStar />
        <span>즐겨찾기</span>
      </NavStyle>
      <NavStyle to='homepage'>
        <BiHome />
        <span>홈</span>
      </NavStyle>
      <NavStyle to='places'>
        <BiMapPin />
        <span>주변</span>
      </NavStyle>
      <NavStyle to='mypage'>
        <BiUser />
        <span>마이페이지</span>
      </NavStyle>
      <Indicatior movement={navActive}></Indicatior>
    </NavBox>
  );
};

export default MobileNavbar;

const NavBox = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: row;
  bottom: 0;
  left: 0;
  background-color: var(--gray-color-light);
  width: 100vw;
  height: 80px;
  z-index: 100;
  justify-content: space-evenly;
`;

const NavStyle = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  width: 20vw;
  z-index: 100;

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
  bottom: 0px;
  left: 0px;
  height: 80px;
  width: 20vw;
  z-index: 99;
  background-color: var(--primary-color);
  border-radius: 10px;
  /* border: var(--gray-color-light) 17px solid; */

  transition: 0.5s;
  transform: ${(props) => `translateX(${props.movement * 20}vw)`};
`;
