import { useState } from "react";
import { Form, Button, Col, Row, Modal, Container } from "react-bootstrap";

function AddComplaint(props) {
  const handleClose = () => props.setShow(false);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);

  const handleIssueTypeChange = (event) => {
    setIssueType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleTownChange = (event) => {
    setTown(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      issueType,
      description,
      state,
      city,
      town,
      date,
    };
    // Handle form submission here
    console.log(formData);
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
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              {/* <Form.File
                id="custom-file"
                label="Choose an image"
                onChange={handleImageChange}
                custom
                required
              /> */}
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
                    placeholder="State"
                    onChange={handleStateChange}
                    value={state}
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="City"
                    onChange={handleCityChange}
                    value={city}
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Town"
                    onChange={handleTownChange}
                    value={town}
                    required
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label className="my-2">Date</Form.Label>
              <Form.Control
                type="date"
                onChange={handleDateChange}
                value={date}
                required
              />
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
