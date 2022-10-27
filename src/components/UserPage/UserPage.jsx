import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PostsContainer } from '../TimelinePage/PostsContainer';
import { useParams } from 'react-router-dom';
import HashtagContainer from '../TimelinePage/HashtagContainer';
import FollowButton from '../TimelinePage/FollowButton';
import UserContext from '../../contexts/UserContext';
import { checkFollow } from '../../services/LinkrAPI';

export default function UserPage() {
  const { id } = useParams();
  const [status, setStatus] = useState('idle');
  const [pageName, setPageName] = useState({});
  const [follows, setFollows] = useState(null);
  const [load, setLoad] = useState(null);
  const obj = useContext(UserContext);
  const userLogged = obj.user.id;
  const user = parseInt(id);
  let visibility;

  userLogged === user ? (visibility = 'hidden') : (visibility = 'visible');

  useEffect(() => {
    if (userLogged) {
      const promise = checkFollow(user, userLogged);
      promise
        .then((res) => {
          setFollows(res.data.follows);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }, [load, userLogged]);

  if (follows === null) {
    return <h1>Loading</h1>;
  }

  return (
    <MainContainer>
      <ContentContainter>
        <Wrapper>
          {!!pageName?.name ? (
            <>
              <header>
                <img src={pageName?.profilePic} alt='profilePic' />
                {pageName?.name} posts
              </header>
              <nav>
                <FollowButton
                  load={load}
                  setLoad={setLoad}
                  visibility={visibility}
                  follows={follows}
                  user={user}
                  userLogged={userLogged}
                />
              </nav>
            </>
          ) : (
            ''
          )}
          <PostsContainer
            setStatus={setStatus}
            status={status}
            userId={id}
            setPageName={setPageName}
          />
        </Wrapper>
        <RightWrap>
          <div className='right'>
            <FollowButton
              load={load}
              setLoad={setLoad}
              visibility={visibility}
              follows={follows}
              user={user}
              userLogged={userLogged}
            />
          </div>
          <HashtagContainer status={status} />
        </RightWrap>
      </ContentContainter>
    </MainContainer>
  );
}

const RightWrap = styled.div``;

const MainContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const ContentContainter = styled.header`
  display: flex;
  width: 915px;
  overflow: hidden;
  gap: 25px;
  @media (max-width: 820px) {
    gap: 0;
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    width: 301px;
    overflow: hidden;
    padding-bottom: 42px;

    @media (max-width: 820px) {
      display: none;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 150px;
  margin-bottom: 100px;
  width: min(100vw, 614px);
  header {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
    margin-left: 17px;
    margin-bottom: 19px;
    @media (max-width: 821px) {
      margin-bottom: 8px;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 18px;
      margin-top: 10px;
    }
  }

  nav {
    margin-left: 17px;

    @media (min-width: 821px) {
      display: none;
    }
  }
`;
