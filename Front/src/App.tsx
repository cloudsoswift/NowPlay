import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import GlobalStyle from "./assets/GlobalStyle";
import styled from "styled-components";

import Mobile from "./Mobile";
import Desktop from "./Desktop";

declare global {
  interface Window {
    naver: { LoginWithNaverId: any; map: naver.maps.Map };
    Kakao: any;
    google: any;
  }
}

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/mobile/*" element={<Mobile />} />
        <Route path="/owner/*" element={<Desktop />} />
        <Route path="/" element={<Navigate to={"/mobile/homepage"} />} />
      </Routes>
    </>
  );
}

export default App;

