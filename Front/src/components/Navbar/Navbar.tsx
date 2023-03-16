import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { BiSearch, BiStar, BiHome, BiMapPin, BiUser } from "react-icons/bi";

const Navbar = () => {
  const [navActive, setNavActive] = useState<number>(0);

  return (
    <NavBox>
      <NavStyle to="/">
        {({ isActive }) => {
          if (isActive) {
            setNavActive(0);
          }
          return (
            <>
              <BiSearch />
              <span>검색</span>
            </>
          );
        }}
      </NavStyle>
      <NavStyle to="/signup">
        {({ isActive }) => {
          if (isActive) {
            setNavActive(1);
          }
          return (
            <>
              <BiStar />
              <span>즐겨찾기</span>
            </>
          );
        }}
      </NavStyle>
      <NavStyle to="/404">
        {({ isActive }) => {
          if (isActive) {
            setNavActive(2);
          }
          return (
            <>
              <BiHome />
              <span>홈</span>
            </>
          );
        }}
      </NavStyle>
      <NavStyle to="/unknown">
        {({ isActive }) => {
          if (isActive) {
            setNavActive(3);
          }
          return (
            <>
              <BiMapPin />
              <span>주변</span>
            </>
          );
        }}
      </NavStyle>
      <NavStyle to="/wtf">
        {({ isActive }) => {
          if (isActive) {
            setNavActive(4);
          }
          return (
            <>
              <BiUser />
              <span>마이페이지</span>
            </>
          );
        }}
      </NavStyle>
      <Indicatior movement={navActive}></Indicatior>
    </NavBox>
  );
};

export default Navbar;

const NavBox = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: row;
  bottom: 0;
  left: 0;
  background-color: var(--gray-color-light);
  width: 100vw;
  height: 80px;

  justify-content: space-evenly;
`;

const NavStyle = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  width: 20vw;
  z-index: 1;

  svg {
    transition: 0.1s;
    font-size: var(--title-1);
    height: 35px;
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
  z-index: 0;
  background-color: var(--primary-color);
  border-radius: 10px;
  /* border: var(--gray-color-light) 17px solid; */

  transition: 0.5s;
  transform: ${(props) => `translateX(${props.movement * 20}vw)`};
`;
