import styled, { keyframes } from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { toggleLikePost } from '../../services/LinkrAPI';
import ReactTooltip from 'react-tooltip';

const getToolTipText = (usersWhoLiked, loggedUser) => {
  const nLikes = usersWhoLiked.length;
  const liked = usersWhoLiked.find((user) => user.email === loggedUser.email);
  let tooltipText = '';
  if (nLikes === 0) return tooltipText;

  if (liked) {
    if (nLikes === 1) {
      tooltipText = 'You liked this';
      return tooltipText;
    }
    if (nLikes === 2) {
      const otherUser = usersWhoLiked.filter((user) => user.email !== loggedUser.email)[0];
      tooltipText = `You and ${otherUser.name}`;
      return tooltipText;
    } else {
      const otherUsers = usersWhoLiked.filter((user) => user.email !== loggedUser.email);
      const nOthers = otherUsers.length;
      if (nOthers > 0)
        tooltipText = `You, ${otherUsers[nOthers - 1].name} and ${nOthers - 1} other people`;
    }
  } else {
    if (nLikes === 1) {
      tooltipText = `${usersWhoLiked[0].name} liked this`;
      return tooltipText;
    }
    if (nLikes === 2) {
      tooltipText = `${usersWhoLiked[0].name} and ${usersWhoLiked[1].name}`;
      return tooltipText;
    }
    tooltipText = `${usersWhoLiked[nLikes - 1].name}, ${usersWhoLiked[nLikes - 2].name} and ${
      nLikes - 2
    } other people`;
  }
  return tooltipText;
};

function LikeButton({ likes, postId }) {
  const { user: loggedUser } = useContext(UserContext);
  const [usersWhoLiked, setUsersWhoLiked] = useState(likes);
  const nLikes = usersWhoLiked.length;
  const liked = usersWhoLiked.find((user) => user.email === loggedUser.email);
  const tooltipText = getToolTipText(usersWhoLiked, loggedUser);

  const handleLike = () => {
    const promise = toggleLikePost(postId);
    promise
      .then(() => {
        if (liked) {
          setUsersWhoLiked(usersWhoLiked.filter((user) => user.email !== loggedUser.email));
        } else {
          setUsersWhoLiked([...usersWhoLiked, { name: loggedUser.name, email: loggedUser.email }]);
        }
      })
      .catch((res) => {
        console.log(res);
      });
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
      <h2 data-tip={tooltipText}>
        {nLikes}
        {nLikes === 1 ? ' like' : ' likes'}
      </h2>
      <ReactTooltip place={'bottom'} />
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
