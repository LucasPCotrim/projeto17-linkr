import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import { RiContactsBookUploadFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const PublishForm = ({ handleForm, status }) => {
  const { user: loggedUser } = useContext(UserContext);
  const isLoading = status === "loading";
  const isError = status === "error";
  const navigate = useNavigate();

  return (
    <Container>
      <ContainerHeader>
        <img
          onClick={() => navigate(`/user/${loggedUser.id}`)}
          src={loggedUser.profilePic}
          alt="logged in user profile pic"
        />
        <h3>What are you going to share today?</h3>
      </ContainerHeader>
      <Form onSubmit={handleForm}>
        <input
          id="url"
          placeholder="http://..."
          required
          disabled={isLoading}
        />
        <input
          id="content"
          placeholder="Awesome article about #javascript"
          disabled={isLoading}
        />
        <ButtonContainer>
          {isError && (
            <p>
              An error occured while publishing your post, please try again!
            </p>
          )}
          <Button disabled={isLoading} type="submit">
            {isLoading ? "Publishing..." : "Publish"}
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 10px 14px 10px 10px;
  display: flex;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  row-gap: 5px;
  flex-direction: column;
  height: 225px;
  @media screen and (max-width: 614px) {
    border-radius: 0;
  }
`;

const ContainerHeader = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }
  h3 {
    width: 100%;
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
  }
  @media screen and (max-width: 614px) {
    h3 {
      text-align: center;
    }
    img {
      display: none;
    }
  }
`;

const Form = styled.form`
  display: flex;
  padding-left: 45px;
  width: 90%;
  flex-direction: column;
  row-gap: 8px;

  input {
    background: #efefef;
    border-radius: 5px;
    padding: 10px;
  }
  input#id {
    height: 30px;
  }
  input#content {
    text-align: left;
    vertical-align: top;
    height: 66px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 80px;
  p {
    color: crimson;
  }
`;

const Button = styled.button`
  width: 112px;
  color: #ffffff;
  height: 31px;
  cursor: pointer;
  background: #1877f2;
  border-radius: 5px;
  &:hover {
    filter: brightness(1.5);
  }
`;
export { PublishForm, Button };
