import { Form, Modal, Button } from "react-bootstrap";

export default function LostDog({ onHide }) {
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
              <Button variant="primary" className="mr-2">Use Current Location</Button>
              <Button variant="primary">Select Location</Button>
            </div>
          </Form.Group>
        </Form>

        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </>
  );
}
