import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHashtag } from "../../services/LinkrAPI";
import HashtagContainer  from "../TimelinePage/HashtagContainer";

export default function HashtagPage(){
  const [hashtagData, setHashtagData] = useState(null)
  const location = useLocation();
  let { hashtag } = useParams();
  hashtag = location.state.name
 
  
  useEffect(() => {
    const promise = getHashtag(hashtag);
    promise.then((res) => {
        setHashtagData(res.data);
    });
    }, [hashtag]);

    return (
        <MainContainer>
          <ContentContainter>
            <Wrapper> 
              <header>#  {location.state.name}</header>
              {hashtagData === null || hashtagData.length === 0 ? <header>Loading...</header> : ""}
             
            </Wrapper>
            <HashtagContainer/>

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