import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import PrivateRoute from "./utils/PrivateRouter";

import DeskNavbar from "./components/Navbar/DeskNavBar";
import OwnerReservePage from "./pages/owner/OwnerReservePage";
import OwnerReviewPage from "./pages/owner/OwnerReviewPage";
import OwnerStorePage from "./pages/owner/OwnerStorePage";
import OwnerloginPage from "./pages/owner/OwnerLoginPage";
import OwnersignupPage from "./pages/owner/OwnerSignupPage";

function Desktop() {
  return (
    <>
      <DesktopContainer>
        <Routes>
          <Route
            element={<PrivateRoute authentication={true} type="desktop" />}
          >
            <Route path="/" element={<OwnerStorePage />} />
          </Route>
          <Route
            element={<PrivateRoute authentication={true} type="desktop" />}
          >
            <Route path="/reserve" element={<OwnerReservePage />} />
          </Route>
          <Route
            element={<PrivateRoute authentication={true} type="desktop" />}
          >
            <Route path="/review" element={<OwnerReviewPage />} />
          </Route>
          <Route
            element={<PrivateRoute authentication={false} type="desktop" />}
          >
            <Route path="/login" element={<OwnerloginPage />} />
          </Route>
          <Route
            element={<PrivateRoute authentication={false} type="desktop" />}
          >
            <Route path="/signup" element={<OwnersignupPage />} />
          </Route>
        </Routes>
      </DesktopContainer>
      <DeskNavbar />
    </>
  );
}

export default Desktop;

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 240px;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;
