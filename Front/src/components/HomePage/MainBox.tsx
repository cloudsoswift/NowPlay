import Sports from "../../svg/main-sports.svg";
import Theme from "../../svg/main-theme.svg";
import Healing from "../../svg/main-healing.svg";
import Game from "../../svg/main-game.svg";
import Culture from "../../svg/main-culture.svg";
import Leisure from "../../svg/main-leisure.svg";
import styled from "styled-components";
import { TSubCategory, TFilter } from "../Places/Types";
import { Link, Route, Router } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { categoriesSelector } from "../Places/Map";
import { THobbyMainCategory, THobbySubCategory } from "../../utils/api/graphql";
import { Suspense, useEffect } from "react";

const MainBox = () => {
  const categories = useRecoilValue(categoriesSelector);
  const cultureFilter: THobbySubCategory[] = categories.find(c=>c.mainCategory==="문화생활")?.subcategories;
  const gameFilter: THobbySubCategory[] = categories.find(c=>c.mainCategory==="오락")?.subcategories;
  const healingFilter: THobbySubCategory[] = categories.find(c=>c.mainCategory==="힐링")?.subcategories;
  const leisureFilter: THobbySubCategory[] = categories.find(c=>c.mainCategory==="레저")?.subcategories;
  const sportsFilter: THobbySubCategory[] = categories.find(c=>c.mainCategory==="체육")?.subcategories;
  const themeFilter: THobbySubCategory[] = categories.find(c=>c.mainCategory==="테마")?.subcategories;
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <MainFilter>
        <div>
          <Link to={`/mobile/places`} state={cultureFilter}>
            <img src={Culture} />
            <div>문화</div>
          </Link>
          <Link to={`/mobile/places`} state={gameFilter}>
            <img src={Game} />
            <div>오락</div>
          </Link>
          <Link to={`/mobile/places`} state={healingFilter}>
            <img src={Healing} />
            <div>힐링</div>
          </Link>
        </div>
        <div>
          <Link to={`/mobile/places`} state={leisureFilter}>
            <img src={Leisure} />
            <div>레저</div>
          </Link>
          <Link to={`/mobile/places`} state={sportsFilter}>
            <img src={Sports} />
            <div>체육</div>
          </Link>
          <Link to={`/mobile/places`} state={themeFilter}>
            <img src={Theme} />
            <div>테마</div>
          </Link>
        </div>
      </MainFilter>
    </Suspense>
  );
};

export default MainBox;

const MainFilter = styled.div`
  padding: 16px;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  > div {
    display: flex;
    justify-content: space-around;
    > a {
      padding: 3px;
      max-width: 100px;
      text-align: center;
      > img {
        height: 60px;
        width: 60px;
      }
      > div {
        font-size: var(--title-2);
        margin-top: 5px;
      }
    }
  }
`;
