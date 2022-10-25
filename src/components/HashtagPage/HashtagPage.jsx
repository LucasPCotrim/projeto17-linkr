import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import HashtagContainer from "../TimelinePage/HashtagContainer";
import { HashtagPostsContainer } from "./HashtagPostsContainer";

export default function HashtagPage() {
  const [reload, setReload] = useState(null);
  const location = useLocation();

  return (
    <MainContainer>
      <ContentContainter>
        <Wrapper>
          {location.state ? (
            <>
              <header># {location.state.name}</header>
              <HashtagPostsContainer
                hashtagName={location.state.name}
                reload={reload}
                setReload={setReload}
              />
            </>
          ) : (
            <LoadingImg>
              <img src="https://bit.ly/3gDOJX0" alt="Not found" />
            </LoadingImg>
          )}
        </Wrapper>
        <HashtagContainer reload={reload} />
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
  //overflow-x: scroll;
  gap: 25px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 150px;
  margin-bottom: 100px;
  max-width: 614px;
  min-width: 500px;
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
