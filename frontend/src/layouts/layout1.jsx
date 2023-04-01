import React, { useEffect } from "react";
import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";

function Layout1(props) {
  const navigate = useNavigate();
  const { isWeb3Enabled, account } = useMoralis();

// to check login
  useEffect(() => {
    if (isWeb3Enabled) {
      setTimeout(() => {
        navigate("/user-home");
      }, 500);
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Enabled]);

  return (
    <div>
      <NavBar />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
export default Layout1;
