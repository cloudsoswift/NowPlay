import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRouter";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import MyPage from "./pages/user/MyPage";

import GlobalStyle from "./assets/GlobalStyle";
import styled from "styled-components";
import DeskNavbar from "./components/Navbar/DeskNavBar";
import { PlaceDetailPage } from "./pages/places/PlaceDetailPage";
import { PlacesPage } from "./pages/places/PlacesPage";
import { PlaceReviewWritePage } from "./pages/places/PlaceReviewWritePage";
declare global {
  interface Window {
    naver: { map: naver.maps.Map; LoginWithNaverId: any };
    Kakao: any;
    google: any;
  }
}
function App() {
  const location = useLocation();

  if (location.pathname.includes("owner")) {
    return (
      <>
        오너페이지입니당
        <GlobalStyle />
        <Routes></Routes>
        <DeskNavbar />
      </>
    );
  } else {
    return (
      <>
        <GlobalStyle />
        <MobileContainer>
          <Routes>
            <Route element={<PrivateRoute authentication={false} />}>
              <Route path="/mypage/login" element={<LoginPage />} />
            </Route>
            <Route element={<PrivateRoute authentication={false} />}>
              <Route path="/mypage/signup" element={<SignupPage />} />
            </Route>
            <Route element={<PrivateRoute authentication={true} />}>
              <Route path="/mypage/*" element={<MyPage />} />
            </Route>
            <Route path="/places" element={<PlacesPage />} />
            <Route path="/places/:id" element={<PlaceDetailPage />} />
            <Route path="/places/:id/review" element={<PlaceReviewWritePage />} />
          </Routes>
        </MobileContainer>
        <MobileNavbar />
      </>
    );
  }
}

export default App;

const MobileContainer = styled.div`
  padding-bottom: 80px;
`;
