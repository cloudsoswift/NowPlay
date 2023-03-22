import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRouter";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import MyPage from "./pages/user/MyPage";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import HomePage from "./pages/home/HomePage";
import SearchPage from "./pages/search/SearchPage";
import Topbar from "./components/Topbar/Topbar";

import styled from "styled-components";

function Mobile() {
  return (
    <>
      <Topbar />
      <MobileContainer>
        <Routes>
          <Route element={<PrivateRoute authentication={false} type="mobile"/>}>
            <Route path="/mypage/login" element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoute authentication={false} type="mobile"/>}>
            <Route path="/mypage/signup" element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRoute authentication={true} type="mobile"/>}>
            <Route path="/mypage/*" element={<MyPage />} />
          </Route>
          <Route element={<PrivateRoute authentication={true} type="mobile"/>}>
            <Route path="/homepage/*" element={<HomePage />} />
          </Route>
          <Route element={<PrivateRoute authentication={true} type="mobile"/>}>
            <Route path="/search/*" element={<SearchPage />} />
          </Route>
        </Routes>
      </MobileContainer>
      <MobileNavbar />
    </>
  );
}

export default Mobile;

const MobileContainer = styled.div`
  padding-bottom: 80px;
  padding-top: 42px;
`;
