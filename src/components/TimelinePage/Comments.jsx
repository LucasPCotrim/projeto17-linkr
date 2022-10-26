import { IoChatbubblesOutline } from "react-icons/io5";
import { SlPaperPlane } from "react-icons/sl";
import { insertComment } from "../../services/LinkrAPI";
import styled from "styled-components";

const CommentIcon = ({ setIsOpen, isOpen }) => {
  return (
    <IconContainer onClick={() => setIsOpen(!isOpen)}>
      <IoChatbubblesOutline color="#FFFFFF" size={"25px"} />
      <p>? comments</p>
    </IconContainer>
  );
};

const CommentForm = ({ user, id }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { content } = e.target.elements;

    insertComment({ content: content.value }, id).then(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    content.value = null;
  };
  return (
    <FormContainer>
      <img src={user.profilePic} />
      <Form onSubmit={handleSubmit}>
        <input id="content" placeholder="write a comment..." />
        <button>
          <SlPaperPlane color="#FFFFFF" />
        </button>
      </Form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  min-height: 85px;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  width: 100%;
  margin-left: 15px;
  input#content {
    background: #252525;
    width: 100%;
    color: #ffffff;
    padding: 5px;
    border-radius: 8px 0 0 8px;
    height: 40px;
    border: none;
  }
  input:focus {
    outline: none;
  }
  button {
    cursor: pointer;
    background-color: #252525;
    padding-right: 10px;
    border-radius: 0 8px 8px 0px;
  }
`;
const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  row-gap: 5px;
  justify-content: center;
  cursor: pointer;
  p {
    font-family: "Lato";
    font-size: 11px;
    color: #ffffff;
  }
`;

const CommentWrapper = styled.div`
  background-color: #1e1e1e;
  width: 100%;
  padding: 0 20px 0 20px;
  border-radius: 0 0 16px 16px;
  display: flex;
  margin-bottom: 18px;
  flex-direction: column;
  img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-comment-container {
    display: flex;
    align-items: center;
    min-height: 70px;
    border-bottom: 1px solid #353535;
  }
  .comment-content-container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    padding: 10px;
    row-gap: 5px;
    flex-direction: column;

    h2 {
      font-family: "Lato";
      font-weight: 700;
      font-size: 14px;
      color: #f3f3f3;
    }
    p {
      font-family: "Lato";
      font-size: 14px;
      color: #acacac;
    }
  }
  .comment-header {
    display: flex;
    column-gap: 8px;
    font-family: "Lato";
    font-size: 14px;
    color: #565656;
  }
`;

export { CommentIcon, CommentWrapper, CommentForm };
