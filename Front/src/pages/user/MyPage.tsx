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
import { useEffect, useRef } from "react";

import SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";


const socket = new SockJS("http://j8d110.p.ssafy.io:9092")

const MyPage = () => {

  const client = new StompJS.Client({
    brokerURL: 'ws://j8d110.p.ssafy.io:9092',
    connectHeaders: {
      login: 'user',
      password: 'password'
  },
    
  })

  client.activate()

  

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
