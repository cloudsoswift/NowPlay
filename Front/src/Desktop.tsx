import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import PrivateRoute from "./utils/PrivateRouter";

import DeskNavbar from "./components/Navbar/DeskNavBar";
import OwnerReservePage from "./pages/owner/OwnerReservePage";
import OwnerReviewPage from "./pages/owner/OwnerReviewPage";
import OwnerStorePage from "./pages/owner/OwnerStorePage";
import OwnerloginPage from "./pages/owner/authpage/OwnerLoginPage";
import OwnersignupPage from "./pages/owner/authpage/OwnerSignupPage";
import OwnerTopbar from "./components/Topbar/OwnerTopbar";

function Desktop() {
  return (
    <DeskBackground>
      <OwnerTopbar />
      <DesktopContainer>
        <Routes>
          <Route element={<PrivateRoute authentication={true} type="desktop" />}>
            <Route path="/" element={<OwnerStorePage />} />
          </Route>
          <Route element={<PrivateRoute authentication={true} type="desktop" />}>
            <Route path="/reserve" element={<OwnerReservePage />} />
          </Route>
          <Route element={<PrivateRoute authentication={true} type="desktop" />}>
            <Route path="/review" element={<OwnerReviewPage />} />
          </Route>
          <Route element={<PrivateRoute authentication={false} type="desktop" />}>
            <Route path="/login" element={<OwnerloginPage />} />
          </Route>
          <Route element={<PrivateRoute authentication={false} type="desktop" />}>
            <Route path="/signup" element={<OwnersignupPage />} />
          </Route>
        </Routes>
      </DesktopContainer>
      <DeskNavbar />
    </DeskBackground>
  );
}

export default Desktop;

const DeskBackground = styled.div`
  background-color: var(--desk-body-color);
`

const DesktopContainer = styled.div`
  margin-left: 260px;
  padding-right: 20px;
  margin-top: 70px;
  min-height: calc(100vh - 50px);
  padding-bottom: 20px;
`;
