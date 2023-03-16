import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";

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
