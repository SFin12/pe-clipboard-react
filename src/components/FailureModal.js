import React from "react";
import { Modal } from "react-bootstrap";
import "./FailureModal.scss";

function FailureModal({ showFailure, title, messageString }) {
    return (
        <>
            <Modal
                show={showFailure}
                dialogClassName="failureModal"
                centered
                size="sm"
            >
                <Modal.Header
                    bsPrefix="failureModalHeader"
                    className="bg-tranparent"
                >
                    <Modal.Title bsPrefix="failureModalTitle">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body bsPrefix="failureModalBody">
                    {messageString}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default FailureModal;
