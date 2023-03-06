import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import GraphQLPage from "./pages/GraphQLPage";
import NaverCallBackPage from "./pages/NaverCallBackPage";
import NavBar from "./components/NavBar";
import Welcome from "./pages/WelcomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/NaverCallBack" element={<NaverCallBackPage />} />
          <Route path="/GraphQLPage" element={<GraphQLPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
