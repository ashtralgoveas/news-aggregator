import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import '../PopModal/PopModal.css';
import { ReactNode } from 'react';

interface PopModalI {
  showModal: boolean;
  setShowModal: (data: boolean) => void;
  modalTitle: string;
  children: ReactNode;
  handleSubmit: () => void;
  handleCancel: () => void;
  isApplyButtonDisabled: boolean;
}

const PopModal = ({
  showModal,
  setShowModal,
  modalTitle,
  children,
  handleSubmit,
  handleCancel,
  isApplyButtonDisabled,
}: PopModalI) => {
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="sm"
      >
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title
            style={{ fontSize: '18px', fontWeight: 600 }}
            className="custom-modal-header"
          >
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
          {children}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between modal-footer">
          <Button
            id="button-addon2"
            variant="light"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            id="button-addon2"
            className="apply-button"
            onClick={handleSubmit}
            disabled={isApplyButtonDisabled}
          >
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopModal;
