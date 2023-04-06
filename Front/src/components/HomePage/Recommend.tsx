import styled from "styled-components";
import RecommendDistance from "./RecommendDistance";
import UserRecommend from "./UserRecommend";
import { NavLink, Routes, Route } from "react-router-dom";

const Recommend = () => {
  

  return (
    <>
      <HomePageRecommend>
        <NavLink to="" end>
          <li>추천</li>
        </NavLink>
        <NavLink to="recent">
          <li>거리순</li>
        </NavLink>
      </HomePageRecommend>
      <HomePageContent>
        <Routes>
          <Route path="" element={<UserRecommend />} />
          <Route path="recent" element={<RecommendDistance />} />
        </Routes>
      </HomePageContent>
    </>
  );
};

export default Recommend;

const HomePageRecommend = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 16px;

  > a {
    width: 30%;
    padding: 10px;
    font-size: var(--body-text);
    text-align: center;
    border-radius: 10px;
    box-shadow: 2px 2px 2px gray;
    transition: 0.2s all;
    margin-inline: 5px;
  }

  > a.active {
    color: white;
    box-shadow: 0px 0px 0px gray;
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
