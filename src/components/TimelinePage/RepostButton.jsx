import styled from "styled-components";
import { BiRepost } from "react-icons/bi";
import { repost } from "../../services/LinkrAPI";

function RepostModal({ setReposting, rePost }) {
  return (
    <RepostWraper>
      <h1>Do you want to re-post this link?</h1>
      <div className="button-div">
        <Button
          color="#1877F2"
          background="white"
          onClick={() => setReposting(false)}
        >
          No, cancel
        </Button>
        <Button color="white" background="#1877F2" onClick={rePost}>
          Yes, share!
        </Button>
      </div>
    </RepostWraper>
  );
}

export default function RepostButton({ reposting, setReposting, postId }) {
  function startReposting() {
    setReposting(true);
  }

  function acceptRepost() {
    setReposting(false);
    repost(postId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Wraper>
      <BiRepost className="icon" onClick={startReposting} />
      <h6>0 re-posts</h6>
      {reposting ? (
        <RepostModal setReposting={setReposting} rePost={acceptRepost} />
      ) : (
        ""
      )}
    </Wraper>
  );
}

const Wraper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  .icon {
    font-size: 30px;
    cursor: pointer;
  }
  font-size: 12px;
`;

const RepostWraper = styled.div`
  width: 500px;
  height: 250px;
  position: fixed;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  background-color: #333333;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    width: 70%;
    height: 70px;
    font-family: "Lato";
    font-weight: 700;
    font-size: 34px;
    text-align: center;
    color: #ffffff;
    @media (max-width: 500px) {
      font-size: 26px;
    }
  }
  .button-div {
    display: flex;
    align-items: center;
    margin-top: 50px;
    column-gap: 20px;
    @media (max-width: 500px) {
      font-size: 26px;
      margin-top: 20px;
    }
  }

  @media (max-width: 600px) {
    width: 80%;
  }
`;

const Button = styled.button`
  width: 112px;
  color: ${(props) => props.color};
  height: 31px;
  cursor: pointer;
  background: ${(props) => props.background};
  border-radius: 5px;
  &:hover {
    filter: brightness(1.5);
  }
`;
