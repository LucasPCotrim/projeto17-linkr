import Modal from "react-modal";
import styled from "styled-components";
import Loading from "../../commons/Loading";
import { deletePost, getToken } from "../../services/LinkrAPI";
import { Button } from "../TimelinePage/PublishForm";

const HashDeletionModal = ({ isOpen, setIsOpen, id, reload, setReload }) => {
  console.log(reload)
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
  const token = getToken();
  const postDeletion = (id, token) => {
    setReload("loading");
    deletePost(id, token).then(
      (response) => {
        console.log(response);
        setReload("deleted");
      },
      (error) => {
        console.log(error);
        setReload("deletionError");
        setIsOpen(false);
        alert("Error while deleting your post, please try again!");
      }
    );
  };
  const isLoading = reload === "loading";

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
          {isLoading ? (
            <Loading color={"white"} />
          ) : (
            <>
              <Button onClick={() => setIsOpen(false)}>No, go back</Button>
              <Button onClick={() => postDeletion(id, token)}>
                Yes, delete it
              </Button>
            </>
          )}
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
    align-items: center;
    margin-top: 70px;
    column-gap: 20px;
  }
`;
export { HashDeletionModal };
