import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Pages
import Home from "./pages/home/home";

// Components
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Doc from "./pages/doc";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doc" element={<Doc />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
