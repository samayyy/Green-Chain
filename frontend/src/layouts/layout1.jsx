import React, { useEffect, useContext } from "react";
import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

function Layout1(props) {
  const navigate = useNavigate();
  const { isWeb3Enabled, account } = useMoralis();
  const authCtx = useContext(AuthContext);

  // to check login
  useEffect(() => {
    if (isWeb3Enabled && authCtx.userType === "user") {
      setTimeout(() => {
        navigate("/user-home");
      }, 500);
    } else if (isWeb3Enabled && authCtx.userType === "authority") {
      setTimeout(() => {
        navigate("/authority-home");
      }, 500);
    } else {
      navigate("/");
      // authCtx.setUserData("user");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Enabled, authCtx.userType]);

  return (
    <div>
      <NavBar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
export default Layout1;
