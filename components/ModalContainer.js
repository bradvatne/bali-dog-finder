import {Modal, Button} from 'react-bootstrap'

export default function ModalContainer(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {props.children}
      </Modal>
    );
  }