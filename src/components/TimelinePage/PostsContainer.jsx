import styled from 'styled-components';
import Post from './Post';
import { useEffect, useState } from 'react';
import { getPosts, getPageUser } from '../../services/LinkrAPI';
import Loading from '../../commons/Loading';
import useInterval from 'use-interval';
import { BiRefresh } from 'react-icons/bi';

const TIMELINE_REFRESH_INTERVAL = 15000;

const getNumberNewPosts = (posts, newPosts) => {
  const newPostsIndexes = newPosts.map((post) => post.id);
  const postsIndexes = posts.map((post) => post.id);
  return newPostsIndexes.reduce(
    (prev, curr) => (postsIndexes.indexOf(curr) == -1 ? prev + 1 : prev),
    0
  );
};

function LoadNewPostsButton({ numberNewPosts, setPosts, newLoadedPosts }) {
  const handleRefresh = () => {
    setPosts([...newLoadedPosts]);
  };

  return (
    <>
      {numberNewPosts > 0 ? (
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

function PostsContainer({ status, setStatus, userId = 0, setPageName }) {
  const [posts, setPosts] = useState([]);
  const [newLoadedPosts, setNewLoadedPosts] = useState([]);
  const [failedToLoadPosts, setFailedToLoadPosts] = useState(false);
  const [loading, setLoading] = useState(false);

  useInterval(() => {
    if (userId === 0) {
      const promise = getPosts();
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
          <WarningMessage color={'#853232'}>
            An error occured while trying to fetch the posts, please refresh the page
          </WarningMessage>
        </Wrapper>
      </>
    );
  }
  if (loading) {
    return (
      <>
        <Wrapper>
          <WarningMessage color={'white'}>Loading</WarningMessage>
          <Loading color={'white'} />
        </Wrapper>
      </>
    );
  }
  if (posts.length === 0) {
    return (
      <>
        <Wrapper>
          <WarningMessage color={'white'}>There are no posts yet</WarningMessage>
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
          setPosts={setPosts}
          newLoadedPosts={newLoadedPosts}
        />
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
            />
          );
        })}
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
