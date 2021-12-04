import React, {useState} from "react";
import { Modal, Button } from 'react-bootstrap';


function Confirm({item, showModal, handleModal}) {

    return (
      <>
        <Modal show={showModal} centered size='lg'>
          <Modal.Header closeButton className="bg-warning">
            <Modal.Title className="text-black">Delete {item}?</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-dark" >You will also lose the student roster associated with the class</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" name="cancel" onClick={handleModal}>
              Cancel
            </Button>
            <Button variant="danger" name="delete" onClick={handleModal}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default Confirm;