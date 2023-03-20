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

function App() {
  const location = useLocation();

  if (location.pathname.includes("owner")) {
    return (
      <>
        오너페이지입니당
        <GlobalStyle />
        <Routes>
        </Routes>
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
