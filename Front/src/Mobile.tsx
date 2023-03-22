import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRouter";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import MyPage from "./pages/user/MyPage";
import MobileNavbar from "./components/Navbar/MobileNavbar";

import styled from "styled-components";
import { PlacesPage } from "./pages/places/PlacesPage";
import { PlaceDetailPage } from "./pages/places/PlaceDetailPage";
import { PlaceReviewWritePage } from "./pages/places/PlaceReviewWritePage";

function Mobile() {
  return (
    <>
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
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/places/:id" element={<PlaceDetailPage />} />
          {/* <Route element={<PrivateRoute authentication={true} type="mobile" />}> */}
            <Route path="/places/:id/review" element={<PlaceReviewWritePage />} />
          {/* </Route> */}
        </Routes>
      </MobileContainer>
      <MobileNavbar />
    </>
  );
}

export default Mobile;

const MobileContainer = styled.div`
  padding-bottom: 80px;
`;
