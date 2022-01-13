import React from "react";
import { Modal } from "react-bootstrap";
import "./SuccessModal.scss";

function SuccessModal({ showSuccess, title, messageString }) {
    return (
        <>
            <Modal
                show={showSuccess}
                dialogClassName="successModal"
                centered
                size="sm"
            >
                <Modal.Header
                    bsPrefix="successModalHeader"
                    className="bg-tranparent"
                >
                    <Modal.Title bsPrefix="successModalTitle">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body bsPrefix="successModalBody">
                    {messageString}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SuccessModal;
