import { Form, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import UploadImage from "../../components/UploadImage";

export default function LostDog({ onHide }) {
  const [location, setLocation] = useState();

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation([position.coords.latitude, position.coords.longitude]);
    });
  }
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Your Lost Dog's Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Dog's Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter dog's name" />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Description of Dog:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Describe your lost dog and it's location"
            />
            <div className="d-flex flex-row mt-2">
              <Button
                variant="primary"
                className="mr-2"
                onClick={() => getCurrentLocation()}
              >
                Use Current Location
              </Button>
              <Button variant="primary">Select Location on Map</Button>
              <input
                type="hidden"
                id="location"
                name="location"
                value={location}
              />
            </div>
          </Form.Group>
          <UploadImage />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide}>Submit</Button>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </>
  );
}
