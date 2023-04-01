import { useEffect, useContext } from "react";
import { Modal, Container } from "react-bootstrap";
// import AlertContext from "../../../context/alert-context";
import AuthContext from "../../../context/auth-context";

import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "web3uikit";

function AuthorityModal(props) {
  const handleClose = () => props.setShow(false);
  const authCtx = useContext(AuthContext);
//   const alertContext = useContext(AlertContext);
  const navigate = useNavigate();
  const { isWeb3Enabled, account } = useMoralis();

  // to check login
  useEffect(() => {
    if (isWeb3Enabled && props.show) {
      authCtx.setUserData("authority");
      setTimeout(() => {
        navigate("/authority-home");
      }, 500);
    } else {
      navigate("/");
    //   authCtx.setUserData("user");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Enabled, authCtx.userType, props.show]);

  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <h5>Connect your wallet to continue as authority</h5>
      </Modal.Header>
      <Modal.Body>
        <Container className="d-flex justify-content-center">
          <ConnectButton moralisAuth={false} className="mx-auto my-2" />{" "}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default AuthorityModal;
