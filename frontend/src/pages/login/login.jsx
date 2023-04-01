import { ConnectButton } from "web3uikit";
import "./login.css";
import welcomeImage from "../../images/welcoming.svg";

function Login() {
  return (
    <div className="text-center pt-5">
      <h2 class="login-desc">Welcome to the Decentralized Complaint Management Portal</h2>
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
