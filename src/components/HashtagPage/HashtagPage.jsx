import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHashtag } from "../../services/LinkrAPI";
import HashtagContainer  from "../TimelinePage/HashtagContainer";
import { HashtagPostsContainer } from "./HashtagPostsContainer";

export default function HashtagPage(){
  const [reload, setReload] = useState(null);
  const location = useLocation();

  console.log(location.state)
    return (
        <MainContainer>
          <ContentContainter>
            <Wrapper> 
              <header>#  {location.state.name}</header>
             <HashtagPostsContainer hashtagName={location.state.name} reload={reload} setReload={setReload}/>
            </Wrapper>
            <HashtagContainer reload={reload}/>

          </ContentContainter>
       </MainContainer>
    )
}

const MainContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`
const ContentContainter = styled.header`
  display: flex;
  width: 915px;
  //overflow-x: scroll;
  gap: 25px;

`

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