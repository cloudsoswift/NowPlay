import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRouter";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import MyPage from "./pages/user/MyPage";

import GlobalStyle from "./assets/GlobalStyle";
import styled from "styled-components";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <MainContainer>
          <Routes>
            <Route element={<PrivateRoute authentication={false} />}>
              <Route path='/mypage/login' element={<LoginPage />} />
            </Route>
            <Route element={<PrivateRoute authentication={false} />}>
              <Route path='/mypage/signup' element={<SignupPage />} />
            </Route>
            <Route element={<PrivateRoute authentication={true} />}>
              <Route path='/mypage/*' element={<MyPage />} />
            </Route>
          </Routes>
        </MainContainer>
        <Navbar />
      </Router>
    </>
  );
}

export default App;

const MainContainer = styled.div`
  padding-bottom: 80px;
`;
