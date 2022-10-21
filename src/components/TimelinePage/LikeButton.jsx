import styled, { keyframes } from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';

function LikeButton({ usersWhoLiked }) {
  const { user: loggedUser } = useContext(UserContext);
  const [liked, setLiked] = useState(usersWhoLiked.find((user) => user.email === loggedUser.email));
  const nLikes = usersWhoLiked.length;
  console.log(usersWhoLiked);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <LikeButtonWrapper>
      <div className='like-button'>
        {liked ? (
          <FaHeart className='icon liked' onClick={() => handleLike()} />
        ) : (
          <FaRegHeart className='icon not-liked' onClick={() => handleLike()} />
        )}
      </div>
      <h2>
        {nLikes}
        {nLikes === 1 ? ' like' : ' likes'}
      </h2>
    </LikeButtonWrapper>
  );
}

const likeAnimation = keyframes`
  0% { transform: scale(1);}
  50% { transform: scale(1.3);}
  100% { transform: scale(1);}
`;

const LikeButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  .like-button {
    .icon {
      font-size: 20px;
      cursor: pointer;
    }
    .liked {
      color: red;
      animation: ${likeAnimation} 600ms;
    }
    .not-liked {
      color: white;
    }
  }
  h2 {
    color: white;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
  }
`;

export { LikeButton };
