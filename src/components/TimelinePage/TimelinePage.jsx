import { useState } from 'react';
import { PublishForm } from './PublishForm';
import { PostsContainer } from './PostsContainer';
import styled from 'styled-components';
import { getToken, publishPost } from '../../services/LinkrAPI';
import HashtagContainer from './HashtagContainer';
import FollowButton from './FollowButton';

const TimelinePage = () => {
  const [status, setStatus] = useState('idle');

  const formHandler = (e) => {
    e.preventDefault();
    const { url, content } = e.target.elements;
    setStatus('loading');
    const token = getToken();
    publishPost({ url: url.value, content: content.value }, token).then(
      () => {
        setStatus('sucess');
        url.value = null;
        content.value = null;
      },
      (error) => {
        setStatus('error');
        console.log(error);
      }
    );
    console.log({ url: url.value, content: content.value });
  };

  return (
    <MainContainer>
      <ContentContainter>
        <Wrapper>
          <nav>
          <header>timeline</header>
          <span> <FollowButton/> </span>
          </nav>
          <PublishForm status={status} handleForm={formHandler} />
          <PostsContainer setStatus={setStatus} status={status} />
        </Wrapper>
        <HashtagContainer status={status} />
      </ContentContainter>
    </MainContainer>
  );
};

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
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 150px;
  margin-bottom: 100px;
  width: min(100vw, 614px);
  nav{
    display:flex;
    align-items: center;
    justify-content: space-between;

    span{

      @media (min-width: 820px) {
       display: none;
  }
    }
  }
  header {
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
    margin-left: 17px;
    margin-bottom: 19px;
  }
`;

export default TimelinePage;
