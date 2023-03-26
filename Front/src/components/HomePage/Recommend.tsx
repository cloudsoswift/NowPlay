import styled from "styled-components";
import RecommendDistance from "./RecommendDistance";
import RecommendPopular from "./RecommendPopular";
import { NavLink, Routes, Route } from "react-router-dom";

const Recommend = () => {
  return (
    <>
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
          <Route path="/" element={<RecommendPopular />}></Route>
          <Route path="popular" element={<RecommendPopular />}></Route>
          <Route path="recent" element={<RecommendDistance />}></Route>
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
