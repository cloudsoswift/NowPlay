import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import MyRecent from "../../components/MyPage/MyRecent";
import MyReview from "../../components/MyPage/MyReview";
import MyReservation from "../../components/MyPage/MyReservation";
import CustomerService from "../../components/MyPage/CustomerService";
import {
  UserInfoCard,
  MyPageCategory,
} from "../../components/MyPage/MyPageHeader";


const MyPage = () => {
  return (
    <>
      <UserInfoCard />
      <MyPageCategory />
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

const MyPageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
`;
