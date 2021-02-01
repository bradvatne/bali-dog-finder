import { Form, Modal, Button } from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useForm} from 'react-use-form'

export default function AdoptionDog({onHide}) {
  const [formProgress, setFormProgress] = useState(1);

  return (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Tell us about the pupper who needs a home
        </Modal.Title>
      </Modal.Header>
      {formProgress == 1 && 
      <Modal.Body>
        <h4>Name</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>}
      {formProgress == 2 && 
      <Modal.Body>
        <h4>Description</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in.
        </p>
      </Modal.Body>}
      {formProgress == 3 && 
      <Modal.Body>
        <h4>Images</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam.
        </p>
      </Modal.Body>}
      {formProgress == 4 && 
      <Modal.Body>
        <h4>Location</h4>
        <p>
          Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. 
        </p>
      </Modal.Body>}
      <Modal.Footer>
        <Button onClick={()=> setFormProgress(formProgress + 1)}>Next</Button>
        <div className="d-flex flex-row justify-content-center w-100">
          <div className="progress-container">
            <div className="bg-primary progress-bar"/>
            <div className={formProgress > 1 ? "bg-primary progress-bar" : "bg-secondary progress-bar"}/>
            <div className={formProgress > 2 ? "bg-primary progress-bar" : "bg-secondary progress-bar"}/>
            <div className={formProgress > 3 ? "bg-primary progress-bar" : "bg-secondary progress-bar"}/>
          </div>
        </div>
      </Modal.Footer>
      </>
  );
}
