import React from "react";
import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

function Layout1(props) {
  return (
    <div>
      <NavBar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
export default Layout1;
