import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Pages
import Login from "./pages/login/login";
import Home from "./pages/home/home";

// Components
// import NavBar from "./components/navbar/navbar";
// import Footer from "./components/footer/footer";

// Layouts
import Layout1 from "./layouts/layout1";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Layout 1 */}
            <Route path="/home" element={<Layout1 ><Home /></Layout1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
