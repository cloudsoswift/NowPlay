import Sports from "../../svg/main-sports.svg";
import Theme from "../../svg/main-theme.svg";
import Healing from "../../svg/main-healing.svg";
import Game from "../../svg/main-game.svg";
import Culture from "../../svg/main-culture.svg";
import Leisure from "../../svg/main-leisure.svg";
import styled from "styled-components";
import { TSubCategory, TFilter } from "../Places/Types";
import { Link, Route, Router } from "react-router-dom";

const MainBox = () => {
  const cultureFilter: TSubCategory[] = [
    { category: "공연장", imageURL: "sub(culture)-concert.svg", type: "Sub" },
    { category: "미술관", imageURL: "sub(culture)-gallery.svg", type: "Sub" },
    { category: "박물관", imageURL: "sub(culture)-museum.svg", type: "Sub" },
    { category: "연극장", imageURL: "sub(culture)-theater.svg", type: "Sub" },
  ];
  const gameFilter: TSubCategory[] = [
    { category: "오락실", imageURL: "sub(game)-arcade.svg", type: "Sub" },
    { category: "보드게임방", imageURL: "sub(game)-boardgame.svg", type: "Sub" },
    { category: "동전노래방", imageURL: "sub(game)-coinkaraoke.svg", type: "Sub" },
    { category: "인형뽑기", imageURL: "sub(game)-dolldrawing.svg", type: "Sub" },
    { category: "PC방", imageURL: "sub(game)-pcroom.svg", type: "Sub" },
    { category: "플스방", imageURL: "sub(game)-playstation.svg", type: "Sub" },
  ];
  const healingFilter: TSubCategory[] = [
    { category: "수목원", imageURL: "sub(healing)-arboretum.svg", type: "Sub" },
    { category: "목욕탕", imageURL: "sub(healing)-baths.svg", type: "Sub" },
    { category: "세차장", imageURL: "sub(healing)-carwash.svg", type: "Sub" },
    { category: "화원", imageURL: "sub(healing)-flowergarden.svg", type: "Sub" },
    { category: "온천", imageURL: "sub(healing)-spa.svg", type: "Sub" },
  ];
  const leisureFilter: TSubCategory[] = [
    { category: "클라이밍", imageURL: "sub(leisure)-climbing.svg", type: "Sub" },
    { category: "낚시", imageURL: "sub(leisure)-fishing.svg", type: "Sub" },
    { category: "래프팅", imageURL: "sub(leisure)-rafting.svg", type: "Sub" },
    { category: "승마", imageURL: "sub(leisure)-riding.svg", type: "Sub" },
    { category: "스쿠버다이빙", imageURL: "sub(leisure)-scubadiving.svg", type: "Sub" },
    { category: "스킨다이빙", imageURL: "sub(leisure)-skindiving.svg", type: "Sub" },
    { category: "서핑장", imageURL: "sub(leisure)-surfing.svg", type: "Sub" },
    { category: "수상스키", imageURL: "sub(leisure)-waterski.svg", type: "Sub" },
    { category: "양궁장", imageURL: "sub(leisure)-archery.svg", type: "Sub" },
    { category: "사격장", imageURL: "sub(leisure)-shooting.svg", type: "Sub" },
    { category: "요트장", imageURL: "sub(leisure)-yacht.svg", type: "Sub" },
  ];
  const sportsFilter: TSubCategory[] = [
    { category: "배드민턴", imageURL: "sub(sports)-badminton.svg", type: "Sub" },
    { category: "농구", imageURL: "sub(sports)-basketball.svg", type: "Sub" },
    { category: "당구", imageURL: "sub(sports)-billiards.svg", type: "Sub" },
    { category: "풋살", imageURL: "sub(sports)-futsal.svg", type: "Sub" },
    { category: "아이스링크장", imageURL: "sub(sports)-icerink.svg", type: "Sub" },
    { category: "탁구", imageURL: "sub(sports)-pingpong.svg", type: "Sub" },
    { category: "롤러장", imageURL: "sub(sports)-rollerskates.svg", type: "Sub" },
    { category: "스크린 골프", imageURL: "sub(sports)-screengolf.svg", type: "Sub" },
    { category: "축구", imageURL: "sub(sports)-soccer.svg", type: "Sub" },
    { category: "스쿼시", imageURL: "sub(sports)-squash.svg", type: "Sub" },
    { category: "테니스", imageURL: "sub(sports)-tennis.svg", type: "Sub" },
    { category: "야구장", imageURL: "sub(sports)-baseball.svg", type: "Sub" },
  ];
  const themeFilter: TSubCategory[] = [
    { category: "놀이공원", imageURL: "sub(theme)-amusementpark.svg", type: "Sub" },
    { category: "방탈출", imageURL: "sub(theme)-escape.svg", type: "Sub" },
    { category: "민속촌", imageURL: "sub(theme)-folkvillage.svg", type: "Sub" },
    { category: "글램핑", imageURL: "sub(theme)-glamping.svg", type: "Sub" },
    { category: "등산로", imageURL: "sub(theme)-hiking.svg", type: "Sub" },
    { category: "공원", imageURL: "sub(theme)-park.svg", type: "Sub" },
    { category: "VR방", imageURL: "sub(theme)-vrroom.svg", type: "Sub" },
    { category: "동물원", imageURL: "sub(theme)-zoo.svg", type: "Sub" },
  ];

  return (
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
