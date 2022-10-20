import styled from 'styled-components';

function LinkPreview({ url, metadata }) {
  return (
    <>
      <LinkPreviewWrapper>
        <div className='info-container'>
          <div className='title'>{metadata.title}</div>
          <div className='description'>{metadata.description}</div>
          <div className='link'>{url}</div>
        </div>
        <img src={metadata.image} alt='post preview' />
      </LinkPreviewWrapper>
    </>
  );
}

export default function Post({ user, postUrl, postDescription, urlMetadata }) {
  return (
    <Wrapper>
      <img src={user.profilePic} alt='profilePic' />
      <PostContent>
        <div className='profile-name'>{user.name}</div>
        <div className='post-description'>{postDescription}</div>
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
  margin-bottom: 100px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const PostContent = styled.div`
  width: 100%;
  .profile-name {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
    margin-bottom: 7px;
  }
  .post-description {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
    margin-bottom: 12px;
  }
`;

const LinkPreviewWrapper = styled.div`
  width: 100%;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  .info-container {
    width: 69.38%;
    padding-top: 24px;
    padding-left: 19.31px;
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
    height: 155px;
  }
`;
