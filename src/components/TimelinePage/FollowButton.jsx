import { useEffect, useState } from "react";
import styled from "styled-components";
import { followUser, unfollowUser } from "../../services/LinkrAPI";
import { ThreeDots } from "react-loader-spinner";

export default function FollowButton({
  setLoad,
  visibility,
  follows,
  user,
  userLogged,
}) {
  const [disable, setDisable] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(follows ? "#ffffff" : "#1877f2");
  const [color, setColor] = useState(follows ? "#1877f2" : "#ffffff");
  
  function following() {
    setDisable(true);
    const body = {
      userId: user,
      followerId: userLogged,
    };

    if (follows) {
      const promise = unfollowUser(user, userLogged);
      promise.then((res) => setLoad("Unfollowed"), setDisable(false), setBackgroundColor("#1877f2"),
      setColor("#ffffff"));
      promise.catch((res) => alert("Requirement failed! Please try again later"))
    } else {
      const promise = followUser(body);
      promise.then((res) => setLoad("Following"), setDisable(false), setBackgroundColor("#ffffff"),
      setColor("#1877f2"));
      promise.catch((res) => alert("Requirement failed! Please try again later"))
    }
  }

  return (
    <OutterButton visibility={visibility} color={color} backgroundColor={backgroundColor}>
      <div onClick={following}>
        {disable ? (
          <ThreeDots
            height="80"
            width="70"
            radius="9"
            color="#FFFFFF"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        ) : follows ? (
          "Unfollow"
        ) : (
          "Follow"
        )}
      </div>
    </OutterButton>
  );
}

const OutterButton = styled.main`
  width: 112px;
  height: 31px;
  background-color: ${((props) => props.backgroundColor)};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 168px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    filter: brightness(1.5);
  }
  ${(props) => {
    return `visibility:${props.visibility};`;
  }};
  @media (max-width: 820px) {
    margin-top: 1px;
    margin-right: 5px;
    margin-bottom: 5px;
  }

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    color: ${((props) => props.color)};
    font-family: "Lato", sans-serif;
  }
`;
