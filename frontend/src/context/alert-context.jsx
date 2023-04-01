import React, { createContext, useState } from "react";
import { Modal, Alert } from "react-bootstrap";
// Code for global alert modal

const AlertContext = createContext({
  showAlert: () => {},
});

export const AlertContextProvider = ({ children }) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [variant, setVariant] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleClose = () => setShowAlertModal(false);

  const showAlert = (variant, title, desc) => {
    setVariant(variant);
    setTitle(title);
    setDesc(desc);
    setShowAlertModal(true);
  };

  return (
    <>
      <AlertContext.Provider value={{ showAlert }}>
        {children}
      </AlertContext.Provider>

      <Modal
        show={showAlertModal}
        onHide={handleClose}
        dialogClassName="modal-40w"
      >
          <Alert variant={variant} onClose={() => handleClose()} dismissible className="mb-0">
            <Alert.Heading>{title}</Alert.Heading>
            <hr />
            <p>{desc}</p>
          </Alert>
      </Modal>
    </>
  );
};

export default AlertContext;
