import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { logout, getUser } from '../../services/LinkrAPI';

export default function TopMenu() {
  const navigate = useNavigate();
  const [turnArrow, setTurnArrow] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('linkr'));
    if (!user?.profilePic && !!localUser?.profilePic) {
      const promise = getUser();
      promise
        .then((res) => {
          if (res.data === 'token expirado') {
            localStorage.removeItem('linkr');
          }
        })
        .catch((res) => {
          console.log(res);
        });
      setUser(localUser);
    }
  }, []);

  function resetUser() {
    logout()
      .then(() => {
        localStorage.removeItem('linkr');
        navigate('/');
      })
      .catch(() => {
        alert('Ops... não foi possível deslogar, tente novamente mais tarde.');
      });
  }

  return (
    <>
      <ContainerTop>
        <Linkr>
          <h1 onClick={() => navigate('/')}>linkr</h1>
        </Linkr>
        <ContainerUserPic onClick={() => setTurnArrow(!turnArrow)}>
          {turnArrow ? <FiChevronUp /> : <FiChevronDown />}

          <UserPic
            src={!!user.profilePic ? user.profilePic : 'https://http.cat/404'}
            alt={user.name}
          />
        </ContainerUserPic>
      </ContainerTop>
      <BoxLogout active={turnArrow}>
        <h3 onClick={() => resetUser()}>logout</h3>
      </BoxLogout>
    </>
  );
}

const ContainerTop = styled.div`
  position: fixed;
  width: 100%;
  height: 72px;
  left: 0px;
  top: 0px;
  z-index: 1;

  background: #151515;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
`;

const ContainerUserPic = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 78px;
  z-index: 4;

  color: #ffffff;
  font-size: 28px;
  cursor: pointer;
`;

const BoxLogout = styled.div`
  position: fixed;
  width: 150px;
  height: 47px;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #171717;
  border-radius: 0px 0px 20px 20px;
  transition: all 1s;

  h3 {
    font-family: 'Lato';
    font-weight: 700;
    font-size: 17px;
    letter-spacing: 0.05em;

    color: #ffffff;
    cursor: pointer;
  }
  ${(props) => {
    if (props.active) {
      return `
        transform: translateY(72px);
      `;
    }
  }}
`;

const UserPic = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 26px;
  object-fit: cover;
`;

const Linkr = styled.div`
  h1 {
    font-size: 45px;
    font-weight: 700;
    color: #ffffff;
    font-family: 'Passion One';
    letter-spacing: 0.05em;
    cursor: pointer;
  }
`;
