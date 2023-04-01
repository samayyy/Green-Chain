import { useState, useEffect, useContext } from "react";
import { Form, Button, Col, Row, Modal, Container } from "react-bootstrap";
import AlertContext from "../../../context/alert-context";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function AddComplaint(props) {
  let yourDate = new Date();
  const handleClose = () => props.setShow(false);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [navError, setNavError] = useState(false);
  const date = new Date(yourDate).toISOString().split("T")[0];

  const alertContext = useContext(AlertContext);

  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (props.show) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation(position.coords);
            // console.log(position);
          },
          (error) => {
            setNavError(true);
            console.log(error.message);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  }, [props.show]);

  useEffect(() => {
    if (navError) {
      alertContext.showAlert(
        "danger",
        "Error!",
        `Please provide location permission to use the app!`
      );
      props.setShow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navError, props.show]);

  const handleIssueTypeChange = (event) => {
    setIssueType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      issueType,
      description,
      address,
      date,
      location,
      image,
    };
    // Handle form submission here
    console.log(formData);
    props.setShow(false);
    alertContext.showAlert(
      "success",
      "Thank You!",
      `Complain registered successfully`
    );
  };

  return (
    <Modal
      show={props.show}
      fullscreen
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <Container>Register Complaint</Container>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="issueType">
              <Form.Label className="my-2">Issue Type</Form.Label>
              <Form.Control
                as="select"
                onChange={handleIssueTypeChange}
                value={issueType}
                required
              >
                <option value="">Select an issue type</option>
                <option value="pothole">Pothole</option>
                <option value="crime">Crime</option>
                <option value="garbage">Garbage</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Image Proof</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label className="my-2">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleDescriptionChange}
                value={description}
                required
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label className="my-2">Address</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    onChange={handleAddressChange}
                    value={address}
                    required
                  />
                </Col>
              </Row>
            </Form.Group>
            <p className="my-2"> Your Current Location:</p>
            {location && location?.latitude && <div className="my-2"><MapContainer
              center={[location?.latitude, location?.longitude]}
              zoom={50}
              style={{ height: "400px", width: "100%"}}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[location?.latitude, location?.longitude]}>
                <Popup>Your current location</Popup>
              </Marker>
            </MapContainer>
            </div>}

            <Form.Group controlId="date">
              <Form.Label className="my-2">Date</Form.Label>
              <Form.Control type="date" disabled value={date} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="my-2">
              Submit
            </Button>
          </Form>
        </Container>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default AddComplaint;
