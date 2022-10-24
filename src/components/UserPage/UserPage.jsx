import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PostsContainer } from "../TimelinePage/PostsContainer";
import { useParams } from "react-router-dom";
import HashtagContainer from "../TimelinePage/HashtagContainer";

export default function UserPage() {
  const { id } = useParams();
  const [status, setStatus] = useState("idle");
  const [pageName, setPageName] = useState({});

  return (
    <MainContainer>
      <ContentContainter>
        <Wrapper>
          {!!pageName?.name ? (
            <header>
              <img src={pageName?.profilePic} alt="profilePic" />
              {pageName?.name} posts
            </header>
          ) : (
            ""
          )}
          <PostsContainer
            setStatus={setStatus}
            status={status}
            userId={id}
            setPageName={setPageName}
          />
        </Wrapper>
        <HashtagContainer status={status} />
      </ContentContainter>
    </MainContainer>
  );
}

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
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 18px;
    }
  }
`;