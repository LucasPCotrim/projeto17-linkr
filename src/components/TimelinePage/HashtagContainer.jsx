import styled from "styled-components";
import { Link } from "react-router-dom";
import { getHashtagList } from "../../services/LinkrAPI";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHashtag } from "../../services/LinkrAPI";

export default function HashtagContainer(){
 const [hashtagId, setHashtagId] = useState(null);
 const { hashtag } = useParams();

 useEffect(() => {
    const promise = getHashtagList();
    getHashtag(hashtag)
    promise.then((res) => {
        setHashtagId(res.data);
    });
    }, []);

    return(
        <OutterBox> 
            <span><h1>trending</h1></span>
            <div>
            
                {hashtagId === null ? <h2>Loading...</h2>: hashtagId.map((i,index) => <Link to={`/hashtag/${i.name}`} state= {i} key= {index}> <h2># {i.name}</h2> </Link> )}
          
            </div>
        </OutterBox>
    )
}

const OutterBox = styled.main`
  display: auto;
  max-width: 301px;
  width: 100%;
  height: 406px;
  background-color: #171717;
  border-radius: 16px;
  margin: 0 auto;
  margin-top: 228px;
  margin-bottom: 100px;

  @media (max-width: 670px) {
    display: none;
  }

  span {
    width: 100%;
    height: 61px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #484848;
    padding-left: 16px;

    h1 {
      font-size: 27px;
      font-weight: 700;
      color: #ffffff;
      font-family: "Oswald", sans-serif;
      cursor: default;
    }
  }

  div {
    width: 100%;
    padding-left: 16px;
    padding-top: 20px;

    h2 {
      font-size: 19px;
      font-weight: 700;
      color: #ffffff;
      font-family: "Lato", sans-serif;
      padding: 5px 0;
      cursor: pointer;
    }
  }
`;
