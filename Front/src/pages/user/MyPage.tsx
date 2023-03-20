import styled from "styled-components";
import { Link, NavLink, Routes, Route, useNavigate } from "react-router-dom";

import { GrUserSettings } from "react-icons/gr";
import MyRecent from "../../components/MyPage/MyRecent";
import MyReview from "../../components/MyPage/MyReview";
import MyReservation from "../../components/MyPage/MyReservation";
import CustomerService from "../../components/MyPage/CustomerService";
// import { usePushLogin } from '../../utils/hooks/usePushLogin';

import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../../utils/recoil/userAtom";
import { useEffect } from "react";

const MyPage = () => {
  const userInfo = useRecoilValue(userInfoAtom);
  
  return (
    <>
      <UserInfoCard>
        <NameCard>
          <div>
            <span className="user-name">{userInfo.userName}</span>
            <span className="user-id">{userInfo.userNickname}</span>
          </div>
          <Link to="/signup">
            <GrUserSettings />
          </Link>
        </NameCard>
        <div className="image-box">
          <img
            src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-08/220805-border-collie-play-mn-1100-82d2f1.jpg"
            alt=""
          />
        </div>
      </UserInfoCard>

      <MyPageCategory>
        <NavLink to="/mypage/recent"><li>최근 내역</li></NavLink>
        <NavLink to="/mypage/my-review"><li>내 리뷰</li></NavLink>
        <NavLink to="/mypage/my-reservation"><li>예약 내역</li></NavLink>
        <NavLink to="/mypage/customer-service"><li>고객 센터</li></NavLink>
      </MyPageCategory>
      <MyPageContent>
        <Routes>
            <Route path="/" element={<MyRecent />}></Route>
            <Route path="recent" element={<MyRecent />}></Route>
            <Route path="my-review" element={<MyReview />}></Route>
            <Route path="my-reservation" element={<MyReservation />}></Route>
            <Route path="customer-service" element={<CustomerService />}></Route>
        </Routes>
      </MyPageContent>
    </>
  );
};

export default MyPage;

const UserInfoCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 10px 0px 10px;
  padding: 10px;

  border-top: 2px solid var(--primary-color);
  border-left: 2px solid var(--primary-color);
  border-right: 2px solid var(--primary-color);
  border-radius: 10px 10px 0 0;

  img {
    width: 100px;
    height: 100px;

    object-fit: fill;
    border-radius: 100%;
    border: 2px solid var(--primary-color);
  }
`;

const NameCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .user-name {
    font-size: var(--large-text);
  }

  .user-id {
    font-size: var(--title-1);
    color: var(--gray-color);
  }

  > div {
    display: flex;
    flex-direction: column;
  }

  svg {
    margin-left: 20px;
    font-size: 30px;
  }
`;

const MyPageCategory = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0px 10px;

  border-left: 2px solid var(--primary-color);
  border-right: 2px solid var(--primary-color);
  border-bottom: 2px solid var(--primary-color);

  > a {
    width: 25%;
    padding: 10px;
    font-size: var(--body-text);
    text-align: center;
    border-radius: 10px 10px 0px 0px;

    transition: 0.2s all;
  }

  > a.active {
    color: white;
    background-color: var(--primary-color);
  }
`;

const MyPageContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
`;
