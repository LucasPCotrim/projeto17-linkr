import styled from "styled-components";
import { RiPencilFill } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import { useState, useRef, useEffect, useContext } from "react";
import { updatePost } from "../../services/LinkrAPI";
import { DeletionModal } from "./DeletionModal";
import { LikeButton } from "./LikeButton";
import UserContext from "../../contexts/UserContext";

function LinkPreview({ url, metadata }) {
  return (
    <>
      <a href={url} target="_blank">
        <LinkPreviewWrapper>
          <div className="info-container">
            <div className="title">{metadata.title}</div>
            <div className="description">{metadata.description}</div>
            <div className="link">{url}</div>
          </div>
          <img src={metadata.image} alt="post preview" />
        </LinkPreviewWrapper>
      </a>
    </>
  );
}

export default function Post({
  user,
  postUrl,
  id,
  postDescription,
  urlMetadata,
  usersWhoLiked,
}) {
  const [editing, setEditing] = useState(false);
  const [descriptionEdition, setDescriptionEdition] = useState("teste");
  const [waiting, setWaiting] = useState(false);
  const [postDescriptionSave, setPostDescriptionSave] =
    useState(postDescription);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const obj = useContext(UserContext);
  const userLogged = obj.user;

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  function editingText() {
    setEditing(true);
    setDescriptionEdition(postDescriptionSave);
  }

  return (
    <Wrapper>
      <ProfilePicAndLikeButton>
        <img src={user.profilePic} alt="profilePic" />
        <LikeButton likes={usersWhoLiked} postId={id} />
      </ProfilePicAndLikeButton>
      <PostContent>
        <div className="conteiner">
          <div className="profile-name">{user.name}</div>
          <EditingDelete
            display={userLogged.email === user.email ? "true" : "false"}
          >
            <RiPencilFill className="icon" onClick={editingText} />
            <BsFillTrashFill className="icon" onClick={() => setIsOpen(true)} />
          </EditingDelete>
          <DeletionModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="post-description">
          {editing ? (
            <input
              disabled={waiting}
              ref={inputRef}
              type="text"
              value={descriptionEdition}
              onChange={(e) => {
                setDescriptionEdition(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setEditing(false);
                  return;
                }
                if (event.key === "Enter") {
                  const body = { postId: id, content: descriptionEdition };
                  updatePost(body)
                    .then((response) => {
                      setWaiting(true);
                      setPostDescriptionSave(descriptionEdition);
                    })
                    .catch((erro) => {
                      alert("Não foi possivel salvar as alterações");
                      console.log(erro);
                      setEditing(true);
                      setWaiting(false);
                      setDescriptionEdition(postDescriptionSave);
                    })
                    .finally(() => {
                      setWaiting(false);
                      setEditing(false);
                    });
                }
              }}
            ></input>
          ) : (
            postDescriptionSave
          )}
        </div>
        <LinkPreview url={postUrl} metadata={urlMetadata} />
      </PostContent>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #171717;
  width: 100%;
  padding: 20px;
  border-radius: 16px;
  display: flex;
  gap: 18px;

  @media screen and (max-width: 614px) {
    border-radius: 0;
  }
`;

const ProfilePicAndLikeButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 19px;
  > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const PostContent = styled.div`
  width: 90%;

  .conteiner {
    display: flex;
    color: white;
    justify-content: space-between;
    font-size: 19px;
    .icon {
      margin-right: 10px;
    }
  }
  .profile-name {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    color: #ffffff;
    margin-bottom: 7px;
  }
  .post-description {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
    margin-bottom: 12px;
    input {
      width: 100%;
      height: 40px;
      border-radius: 7px;
      line-break: auto;
    }
    textarea:focus,
    input:focus {
      box-shadow: 0 0 0 0;
      outline: 0;
    }
  }
  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .trash {
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
`;

const LinkPreviewWrapper = styled.div`
  width: 100%;
  height: 70%;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  overflow: hidden;
  .info-container {
    width: 69.38%;
    height: 100%;
    padding-top: 24px;
    padding-left: 19.31px;
    margin-bottom: 15px;
    .title {
      font-size: 16px;
      line-height: 19px;
      color: #cecece;
      margin-bottom: 5px;
    }
    .description {
      font-size: 11px;
      line-height: 13px;
      color: #9b9595;
      margin-bottom: 13px;
    }
    .link {
      font-size: 11px;
      line-height: 13px;
      color: #cecece;
    }
  }
  img {
    width: 155px;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    background-color: #2c2c2c;
    border: 1px solid #bebebe;
  }
`;

const EditingDelete = styled.div`
  display: flex;
  color: white;
  padding-right: 5px;
  justify-content: space-between;
  font-size: 19px;
  gap: 10px;
  .icon {
    margin: 0;
    cursor: pointer;
    &:hover {
      color: #a6a6a6;
    }
  }
  display: ${(props) => (props.display === "true" ? "initial" : "none")};
`;
