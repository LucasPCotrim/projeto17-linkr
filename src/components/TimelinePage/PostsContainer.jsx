import styled from 'styled-components';
import Post from './Post';

const sampleProfilePic =
  'https://aldeiaconteudo.com.br/wp-content/uploads/2019/06/ciclo-de-vida-do-meme-aldeia-marketing-de-conteudo.jpg';

function PostsContainer() {
  return (
    <>
      <Wrapper>
        <Post
          profilePic={sampleProfilePic}
          profileName={'Lele'}
          postDescription={'Muito maneiro esse tutorial de Material UI com React, deem uma olhada!'}
        />
        <Post
          profilePic={sampleProfilePic}
          profileName={'Lele'}
          postDescription={'Muito maneiro esse tutorial de Material UI com React, deem uma olhada!'}
        />
        <Post
          profilePic={sampleProfilePic}
          profileName={'Lele'}
          postDescription={'Muito maneiro esse tutorial de Material UI com React, deem uma olhada!'}
        />
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

export { PostsContainer };
