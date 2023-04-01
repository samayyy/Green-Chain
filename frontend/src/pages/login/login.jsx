import { ConnectButton } from "web3uikit";
import "./login.css";
import welcomeImage from "../../images/welcoming.svg";
import { useMoralis } from "react-moralis";

function Login() {

  const { isWeb3Enabled, account } = useMoralis();
  if (isWeb3Enabled) {
    console.log("signer: ", account);
  }

  return (
    <div className="text-center pt-5">
      <h2 className="login-desc">Welcome to the Decentralized Complaint Management Portal</h2>
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
