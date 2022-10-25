import { IoChatbubblesOutline } from "react-icons/io5";
import styled from "styled-components";

const CommentIcon = () => {
  return (
    <IconContainer>
      <IoChatbubblesOutline color="#FFFFFF" size={"25px"} />
      <p>? comments</p>
    </IconContainer>
  );
};

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

export { CommentIcon };
