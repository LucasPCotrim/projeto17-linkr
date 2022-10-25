import styled from "styled-components";
import { Link } from "react-router-dom";
import { getHashtagList } from "../../services/LinkrAPI";
import { useEffect, useState } from "react";
import FollowButton from "./FollowButton";

export default function HashtagContainer({ status, reload}) {
  const [hashtagId, setHashtagId] = useState(null);

  useEffect(() => {
    const promise = getHashtagList();
    promise.then((res) => {
      setHashtagId(res.data);
    });
  }, [status, reload]);

  return (
    <Align>
    <FollowButton />
    <OutterBox>
      <span>
        <h1>trending</h1>
      </span>
      <div>
        {hashtagId === null ? (
          <h2>Loading...</h2>
        ) : (
          hashtagId?.map((i, index) => (
            <Link to={`/hashtag/${i.name}`} state={i} key={index}>
              {" "}
              <h2># {i.name}</h2>{" "}
            </Link>
          ))
        )}
      </div>
    </OutterBox>
    </Align>
  );
}

const Align = styled.div`
  max-width: 301px;
  width: 100%;
  //height: 406px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  /* border-radius: 16px;
  margin: 0 auto;
  margin-top: 228px;
  margin-bottom: 100px; */
  @media (max-width: 820px) {
    display: none;
  }

`

const OutterBox = styled.main`
  display: auto;
  max-width: 301px;
  width: 100%;
  height: 406px;
  background-color: #171717;
  border-radius: 16px;
  margin: 0 auto;
  margin-top: 28px;
  //margin-top: 228px;
  margin-bottom: 100px;
  @media (max-width: 820px) {
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
