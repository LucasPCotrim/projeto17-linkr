import styled from 'styled-components';
import Post from './Post';
import { useEffect, useState, useCallback } from 'react';
import { getPosts, getPageUser, getUsersList } from '../../services/LinkrAPI';
import Loading from '../../commons/Loading';
import useInterval from 'use-interval';
import { BiRefresh } from 'react-icons/bi';
import InfiniteScroll from 'react-infinite-scroller';

const TIMELINE_REFRESH_INTERVAL = 15000;
const N_POSTS_PER_PAGE = 10;

const getNumberNewPosts = (posts, newPosts) => {
  const newPostsIndexes = newPosts.map((post) => post.id);
  const postsIndexes = posts.map((post) => post.id);
  return newPostsIndexes.reduce(
    (prev, curr) => (postsIndexes.indexOf(curr) == -1 ? prev + 1 : prev),
    0
  );
};

function LoadNewPostsButton({ numberNewPosts, status, setStatus, reRender, setReRender }) {
  const handleRefresh = () => {
    setReRender(!reRender);
    setStatus('Loaded new posts');
  };

  return (
    <>
      {numberNewPosts > 0 && status !== 'deleted' ? (
        <NewPostsButtonStyle onClick={() => handleRefresh()}>
          <h2>{`${numberNewPosts} new ${numberNewPosts > 1 ? 'posts' : 'post'}, load more!`}</h2>
          <BiRefresh className='icon' />
        </NewPostsButtonStyle>
      ) : (
        <></>
      )}
    </>
  );
}

function PostsContainer({ status, setStatus, userId = 0 }) {
  const [posts, setPosts] = useState([]);
  const [newLoadedPosts, setNewLoadedPosts] = useState([]);
  const [failedToLoadPosts, setFailedToLoadPosts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [postsPage, setPostsPage] = useState(1);
  const [followedNoPosts, setFollowedNoPosts] = useState(false);

  useInterval(() => {
    if (userId === 0) {
      const promise = getPosts({});
      promise
        .then((res) => {
          setNewLoadedPosts(res.data);
        })
        .catch((res) => {
          console.log(res);
          setNewLoadedPosts([]);
          setFailedToLoadPosts(true);
        });
    }
  }, TIMELINE_REFRESH_INTERVAL);

  useEffect(() => {
    setLoading(true);
    const promise =
      userId === 0
        ? getPosts({ limit: N_POSTS_PER_PAGE, offset: 0 })
        : getPageUser({ userId, limit: N_POSTS_PER_PAGE, offset: 0 });
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
  }, [status, reRender]);

  const fetchItems = useCallback(async () => {
    if (fetching) {
      return;
    }
    setFetching(true);
    try {
      let fetchedPosts = null;
      if (userId === 0) {
        fetchedPosts = await getPosts({
          limit: N_POSTS_PER_PAGE,
          offset: N_POSTS_PER_PAGE * postsPage,
        });
      } else {
        fetchedPosts = await getPageUser({
          userId,
          limit: N_POSTS_PER_PAGE,
          offset: N_POSTS_PER_PAGE * postsPage,
        });
      }

      setPosts([...posts, ...fetchedPosts.data]);

      if (fetchedPosts.data.length < N_POSTS_PER_PAGE) {
        setHasMore(false);
      } else {
        setPostsPage(postsPage + 1);
        setHasMore(true);
      }
    } finally {
      setFetching(false);
    }
  }, [posts, fetching, postsPage]);

  useEffect(() => {
    const promise = getUsersList('allusers');
    promise
      .then((res) => {
        if (res.data.filter((user) => parseInt(user.follow) > 0).length > 0) {
          setFollowedNoPosts(true);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  if (failedToLoadPosts) {
    return (
      <>
        <Wrapper>
          <WarningMessage color={'#853232'}>
            An error occured while trying to fetch the posts, please refresh the page
          </WarningMessage>
        </Wrapper>
      </>
    );
  }
  const loader = (
    <>
      <Wrapper key={0}>
        <WarningMessage color={'white'}>Loading</WarningMessage>
        <Loading color={'white'} />
      </Wrapper>
    </>
  );
  if (loading) {
    return loader;
  }
  if (posts.length === 0) {
    function NotFoundPostUser() {
      return (
        <>
          {userId !== 0 ? (
            'User has no posts yet!'
          ) : (
            <>
              {followedNoPosts
                ? 'No posts found from your friends'
                : `You don't follow anyone yet. Search for new friends!`}
            </>
          )}
        </>
      );
    }

    return (
      <>
        <Wrapper>
          <WarningMessage color={'white'}>
            <NotFoundPostUser />
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
          className='infinite-scroll'>
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
  margin-top: 29px;
  margin: 29px auto 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 25px;
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
  font-family: 'Oswald';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 40px;
  color: ${(props) => props.color || 'ffffff'};
`;

const NewPostsButtonStyle = styled.div`
  width: 100%;
  height: 61px;
  background-color: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  h2 {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    margin-right: 10px;
  }
  .icon {
    font-size: 22px;
    color: #ffffff;
  }
`;

export { PostsContainer };
