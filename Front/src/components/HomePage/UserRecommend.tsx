import MiniCard from "./MiniCard";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";

const UserRecommend = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);

  const isLogin = cookie.accessToken;

  const userRecommendContent = isLogin ? (
    <LoggedIn>
      <Font>지금 여기 어때?</Font>
      <CardList>
        <MiniCard />
        <MiniCard />
        <MiniCard />
      </CardList>
    </LoggedIn>
  ) : (
    <NavLink to="/mobile/mypage/login">
      <ButtonArea>로그인하고 추천을 받아보세요</ButtonArea>
    </NavLink>
  );

  return (
    <UserRecommendBox>
      {userRecommendContent}
    </UserRecommendBox>
  );
};

export default UserRecommend;

const UserRecommendBox = styled.div`
  padding: 16px;
`;

const CardList = styled.div`
  display: flex;
  max-width: 100%;
  overflow-y: hidden;
`;

const Font = styled.div`
  font-size: var(--title-2);
  margin-left: 16px;
`;

const LoggedIn = styled.div``;

const ButtonArea = styled.div`
  margin-inline: auto;
  margin-bottom: 15px;
  text-align: center;
  width: 80%;
  height: 40px;
  background-color: var(--primary-color);
  font-size: var(--title-2);
  color: var(--body-color);
  line-height: 43px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px gray;
`;