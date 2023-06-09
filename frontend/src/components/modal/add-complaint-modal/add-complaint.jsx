import { useState, useEffect, useContext } from "react";
import { Form, Button, Col, Row, Modal, Container } from "react-bootstrap";
import AlertContext from "../../../context/alert-context";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import dataContext from "../../../context/DataContext/dataContext";
// Backend
// import {createNewCampaign} from ""
import { create } from "ipfs-http-client";

const INFURA_ID = "2Np7iR6NoQwDpRffHt1obWRquWr";
const INFURA_SECRET_KEY = "8bc34689eecdc653d9f4db3aa24935bb";


function AddComplaint(props) {
  let yourDate = new Date();
  const handleClose = () => props.setShow(false);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [image, setImage] = useState(null);
  const [navError, setNavError] = useState(false);
  const date = new Date(yourDate).toISOString().split("T")[0];
  const { createNewCampaign } = useContext(dataContext);
  const [imageResult, setImageResult] = useState(null);

  const DefaultIcon = leaflet.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  leaflet.Marker.prototype.options.icon = DefaultIcon;

  const alertContext = useContext(AlertContext);

  const [location, setLocation] = useState(null);
  useEffect(() => {
    if (props.show) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation(position.coords);

            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;

            fetch(apiUrl)
              .then((response) => response.json())
              .then((data) => {
                setCompleteAddress(data);
                const address = data.display_name;
                setAddress(address);
              })
              .catch((error) => console.error(error));

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

  const auth =
    "Basic " +
    Buffer.from(INFURA_ID + ":" + INFURA_SECRET_KEY).toString("base64");

  async function ipfsClient() {
    const ipfs = await create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth, // infura auth credentails
      },
    });
    return ipfs;
  }
  async function saveFile(data) {
    console.log("save file input: ", data);
    let ipfs = await ipfsClient();

    let options = {
      wrapWithDirectory: false,
      progress: (prog) => console.log(`Saved :${prog}`),
    };
    let result = await ipfs.add(data, options);
    console.log("save file output: ", result);
    return result;
  }

  async function getData(hash) {
    console.log("getData input: ", hash);
    let data = "https://ipfs.io/ipfs/" + hash.toString();
    data = await fetch(data).then((res) => res.text());
    console.log("get data output: ", data);
    return data;
  }

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
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  useEffect(() => {
    if (image) {
      saveFile(image).then((res) => {
        getData(res["path"]).then((res) => {
          setImageResult(res);
        });
      });
    }
  }, [image]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const locationArray = [location?.latitude.toString(), location?.longitude.toString()];
    const formData = {
      "_name": "garbage collection",
      "_issueType": issueType,
      "_description": description,
      "_addressString": completeAddress.address.city,
      "_location": locationArray,
      "_imageProof": image,
    };
    // Authorities _authoritiesContract
    // Handle form submission here
    console.log("fD", formData);
    // dataCtx.createNewCampaign
    createNewCampaign(formData);

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
            {location && location?.latitude && (
              <div className="my-2">
                <MapContainer
                  center={[location?.latitude, location?.longitude]}
                  zoom={50}
                  style={{ height: "400px", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[location?.latitude, location?.longitude]}>
                    <Popup>Your current location</Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}

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
