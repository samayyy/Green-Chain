import { ConnectButton } from "web3uikit";
import "./login.css";
import welcomeImage from "../../images/welcoming.svg";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/auth-context";

function Login() {
  const authCtx = useContext(AuthContext);
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
    <div className="text-center pt-5">
      <h2 className="login-desc">
        Welcome to the Decentralized Complaint Management Portal
      </h2>
      <div className="login">
        <img
          src={welcomeImage}
          alt="welcome"
          className="welcomeImage mx-auto"
        />
        <ConnectButton moralisAuth={false} className="mx-auto" />{" "}
      </div>
    </div>
  );
}

export default Login;
