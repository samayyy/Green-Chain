import React, { useEffect, useContext } from "react";
import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

function Layout2(props) {
  const navigate = useNavigate();
  const { isWeb3Enabled, account } = useMoralis();
//   const authCtx = useContext(AuthContext);



  return (
    <div>
      <NavBar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
export default Layout2;
