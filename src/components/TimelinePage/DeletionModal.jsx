import Modal from "react-modal";
import styled from "styled-components";
import { Button } from "./PublishForm";

const DeletionModal = ({ isOpen, setIsOpen }) => {
  const customStyles = {
    content: {
      width: "500px",
      height: "262px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#333333",
      borderRadius: "50px",
    },
  };
  return (
    <Modal
      onRequestClose={() => setIsOpen(false)}
      isOpen={isOpen}
      ariaHideApp={false}
      style={customStyles}
    >
      <ModalContainer>
        <div className="modal-header">
          Are you sure you want to delete this post?
        </div>
        <div className="button-container">
          <Button onClick={() => setIsOpen(false)}>No, go back</Button>
          <Button>Yes, delete it </Button>
        </div>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .modal-header {
    font-family: "Lato";
    font-weight: 700;
    font-size: 34px;
    text-align: center;
    color: #ffffff;
  }
  .button-container {
    display: flex;
    margin-top: 70px;
    column-gap: 20px;
  }
`;
export { DeletionModal };
