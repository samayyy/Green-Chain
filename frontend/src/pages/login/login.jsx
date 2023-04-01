import { ConnectButton } from "web3uikit";
import "./login.css";
import welcomeImage from "../../images/welcoming.svg";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth-context";
import { Button } from "react-bootstrap";
import AuthorityModal from "../../components/modal/authority-login-modal/authority-login";

function Login() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const { isWeb3Enabled, account } = useMoralis();
  const [show, setShow] = useState(false);

  function showAuthorityModal() {
    setShow(true);
  }

  function setUserAsUser (){
    authCtx.setUserData("user");
  }

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
    <div className="text-center pt-5">
      <AuthorityModal show={show} setShow={setShow} />
      <h2 className="login-desc">
        Welcome to Eco-Sustain
      </h2>
      <div className="login">
        <img
          src={welcomeImage}
          alt="welcome"
          className="welcomeImage mx-auto"
        />
        <div onClick={setUserAsUser}><ConnectButton moralisAuth={false} className="mx-auto my-2" />{" "}</div>
        <Button
          variant="outline-primary"
          type="submit"
          className="my-2"
          onClick={showAuthorityModal}
        >
          Continue as a authority ?
        </Button>
      </div>
    </div>
  );
}

export default Login;
