import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import { getHashtag } from "../../services/LinkrAPI";
import Loading from "../../commons/Loading";
import { useParams } from "react-router-dom";
import Post from "../TimelinePage/Post";
import InfiniteScroll from "react-infinite-scroller";
import useInterval from "use-interval";

const N_POSTS_PER_PAGE = 10;
const TIMELINE_REFRESH_INTERVAL = 15000;

const getNumberNewPosts = (posts, newPosts) => {
  const newPostsIndexes = newPosts.map((post) => post.id);
  const postsIndexes = posts.map((post) => post.id);
  return newPostsIndexes.reduce(
    (prev, curr) => (postsIndexes.indexOf(curr) == -1 ? prev + 1 : prev),
    0
  );
};

function LoadNewPostsButton({
  numberNewPosts,
  status,
  setStatus,
  reRender,
  setReRender,
}) {
  const handleRefresh = () => {
    setReRender(!reRender);
    setStatus("Loaded new posts");
  };

  return (
    <>
      {numberNewPosts > 0 && status !== "deleted" ? (
        <NewPostsButtonStyle onClick={() => handleRefresh()}>
          <h2>{`${numberNewPosts} new ${
            numberNewPosts > 1 ? "posts" : "post"
          }, load more!`}</h2>
          <BiRefresh className="icon" />
        </NewPostsButtonStyle>
      ) : (
        <></>
      )}
    </>
  );
}

function HashtagPostsContainer({ hashtagName, status, setStatus }) {
  const [posts, setPosts] = useState([]);
  const [newLoadedPosts, setNewLoadedPosts] = useState([]);
  const [failedToLoadPosts, setFailedToLoadPosts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [postsPage, setPostsPage] = useState(1);

  let { hashtag } = useParams();
  hashtag = hashtagName;

  useInterval(() => {
    const promise = getHashtag({ hashtag });
    promise
      .then((res) => {
        setNewLoadedPosts(res.data);
      })
      .catch((res) => {
        console.log(res);
        setNewLoadedPosts([]);
        setFailedToLoadPosts(true);
      });
  }, TIMELINE_REFRESH_INTERVAL);

  useEffect(() => {
    setLoading(true);
    const promise = getHashtag({ hashtag, limit: N_POSTS_PER_PAGE, offset: 0 });
    promise
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((res) => {
        console.log(res);
        setPosts([]);
        setFailedToLoadPosts(true);
      });
  }, [hashtag, status, reRender]);

  const fetchItems = useCallback(async () => {
    if (fetching) {
      return;
    }
    setFetching(true);
    try {
      const { data: fetchedPosts } = await getHashtag({
        hashtag,
        limit: N_POSTS_PER_PAGE,
        offset: N_POSTS_PER_PAGE * postsPage,
      });
      setPosts([...posts, ...fetchedPosts]);

      if (fetchedPosts.length < N_POSTS_PER_PAGE) {
        setHasMore(false);
      } else {
        setPostsPage(postsPage + 1);
        setHasMore(true);
      }
    } finally {
      setFetching(false);
    }
  }, [posts, fetching, postsPage]);

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
  const loader = (
    <>
      <Wrapper key={0}>
        <WarningMessage color={"white"}>Loading</WarningMessage>
        <Loading color={"white"} />
      </Wrapper>
    </>
  );
  if (loading) {
    return loader;
  }
  if (posts.length === 0) {
    return (
      <>
        <Wrapper>
          <WarningMessage color={"white"}>
            There are no posts yet
          </WarningMessage>
        </Wrapper>
      </>
    );
  }

  const numberNewPosts = getNumberNewPosts(posts, newLoadedPosts);

  return (
    <>
      <Wrapper>
        <LoadNewPostsButton
          numberNewPosts={numberNewPosts}
          status={status}
          setStatus={setStatus}
          reRender={reRender}
          setReRender={setReRender}
        />
        <InfiniteScroll
          loadMore={fetchItems}
          hasMore={hasMore}
          loader={loader}
          className="infinite-scroll"
        >
          {posts.map((post, index) => {
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
                repostedBy={post.userWhoRepost}
                nameRepostedBy={post.nameUserWhoRepost}
                reRender={reRender}
                setReRender={setReRender}
              />
            );
          })}
        </InfiniteScroll>
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
  .infinite-scroll {
    width: 100%;
  }
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

export { HashtagPostsContainer };
