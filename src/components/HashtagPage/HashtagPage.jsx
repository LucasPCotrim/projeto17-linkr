import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import HashtagContainer from "../TimelinePage/HashtagContainer";
import { HashtagPostsContainer } from "./HashtagPostsContainer";

export default function HashtagPage() {
  const location = useLocation();
  const [status, setStatus] = useState("idle");
  return (
    <MainContainer>
      <ContentContainter>
        <Wrapper>
          {location.state ? (
            <>
              <header># {location.state.name}</header>

              <HashtagPostsContainer
                hashtagName={location.state.name}
                status={status}
                setStatus={setStatus}
              />
            </>
          ) : (
            <LoadingImg>
              <img src="https://bit.ly/3FrQj8L" alt="Not found" />
            </LoadingImg>
          )}
        </Wrapper>
        <div className="rightside">
          <HashtagContainer status={status} />
        </div>
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

  .rightside {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 180px;
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
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
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

const LoadingImg = styled.div`
  min-width: 375px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 375px;
    width: 90%;
  }
`;
