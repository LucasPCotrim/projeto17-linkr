import { useState } from "react";
import { PublishForm } from "./PublishForm";
import { PostsContainer } from "./PostsContainer";
import styled from "styled-components";
import { getToken, publishPost } from "../../services/LinkrAPI";
import HashtagContainer from "./HashtagContainer";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";

const TimelinePage = () => {
  const [status, setStatus] = useState("idle");
  const formHandler = (e) => {
    e.preventDefault();
    const { url, content } = e.target.elements;
    setStatus("loading");
    const token = getToken();
    publishPost({ url: url.value, content: content.value }, token).then(
      () => {
        setStatus("sucess");
        url.value = null;
        content.value = null;
      },
      (error) => {
        setStatus("error");
        console.log(error);
      }
    );
  };

  return (
    <MainContainer>
      <ContentContainter>
        <Wrapper>
          <header>timeline</header>

          <PublishForm status={status} handleForm={formHandler} />
          <PostsContainer setStatus={setStatus} status={status} />
        </Wrapper>
        <div className="rightside">
          <HashtagContainer status={status} />
        </div>
      </ContentContainter>
    </MainContainer>
  );
};

const MainContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const ContentContainter = styled.header`
  display: flex;
  width: 915px;
  overflow: hidden;
  gap: 25px;
  .rightside {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 150px;
    margin-bottom: 100px;
    padding-top: 50px;
    width: 35%;
    @media (max-width: 820px) {
      display: none;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 150px;
  margin-bottom: 100px;
  width: min(100vw, 614px);
  header {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
    margin-left: 17px;
    margin-bottom: 19px;
  }
`;

export default TimelinePage;
