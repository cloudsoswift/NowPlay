import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/mypage/*" element={<MyPage />} />
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
`