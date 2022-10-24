import styled from "styled-components";
import Post from "./Post";
import { useEffect, useState } from "react";
import { getPosts, getPageUser } from "../../services/LinkrAPI";
import Loading from "../../commons/Loading";

function PostsContainer({ status, setStatus, userId = 0, setPageName }) {
  const [posts, setPosts] = useState([]);
  const [failedToLoadPosts, setFailedToLoadPosts] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const promise = userId === 0 ? getPosts() : getPageUser(userId);
    promise
      .then((res) => {
        setPosts(res.data);
        if (userId !== 0) {
          setPageName(res.data[0].user);
        }
        setLoading(false);
      })
      .catch((res) => {
        console.log(res);
        setPosts([]);
        setFailedToLoadPosts(true);
      });
  }, [status]);

  if (failedToLoadPosts) {
    return (
      <>
        <Wrapper>
          <WarningMessage color={"#853232"}>
            An error occured while trying to fetch the posts, please refresh the
            page
          </WarningMessage>
        </Wrapper>
      </>
    );
  }
  if (loading) {
    return (
      <>
        <Wrapper>
          <WarningMessage color={"white"}>Loading</WarningMessage>
          <Loading color={"white"} />
        </Wrapper>
      </>
    );
  }

  return (
    <>
      <Wrapper>
        {posts.length === 0 ? (
          <WarningMessage color={"white"}>
            There are no posts yet
          </WarningMessage>
        ) : (
          posts.map((post, index) => {
            return (
              <Post
                key={index}
                user={post.user}
                id={post.id}
                postUrl={post.url}
                postDescriptionText={post.content}
                urlMetadata={post.metadata}
                usersWhoLiked={post.usersWhoLiked}
                status={status}
                setStatus={setStatus}
                hashtagsList={post.hashtagsList}
              />
            );
          })
        )}
        {}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin: 29px auto 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;

const WarningMessage = styled.div`
  width: 100%;
  height: 100px;
  padding: 18px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 40px;
  color: ${(props) => props.color || "ffffff"};
`;

export { PostsContainer };
