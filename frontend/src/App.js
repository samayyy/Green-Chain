import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Pages
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import AuthorityHome from "./pages/authority-home/authority-home";

// Components
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Doc from "./pages/doc";
import Layout1 from "./layouts/layout1";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Layout 1 */}
          <Route
            path="/user-home"
            element={
              <Layout1>
                <Home />
              </Layout1>
            }
          />
          <Route
            path="/authority-home"
            element={
              <Layout1>
                <AuthorityHome />
              </Layout1>
            }
          />
          <Route path="/doc" element={<Doc />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
