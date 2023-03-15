import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { PlacesPage } from "./pages/places/PlacesPage";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/map" element={<PlacesPage />} />
        </Routes>
        <Navbar />
      </Router>
    </>
  );
}

export default App;
