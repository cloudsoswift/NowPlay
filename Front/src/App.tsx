import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import GlobalStyle from "./assets/GlobalStyle";
import styled from "styled-components";

import Mobile from "./Mobile";
import Desktop from "./Desktop";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/owner/*" element={<Desktop />} />
        <Route path="/*" element={<Mobile />} />
      </Routes>
    </>
  );
}

export default App;

