import { getToken, getUser } from "../services/LinkrAPI";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import TopMenu from "./TopMenu/TopMenu";
import Loading from "../commons/Loading";

export default function PrivatePage({ children }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [loadingUser, setLoadingUser] = useState(false);

  function redirctLogin() {
    localStorage.removeItem("linkr");
    window.location.assign("/");
  }

  useEffect(() => {
    const token = getToken();
    if (!token) {
      redirctLogin();
    } else {
      const localUser = JSON.parse(localStorage.getItem("linkr"));
      if (!user?.profilePic || !!localUser?.profilePic) {
        const promise = getUser();
        promise
          .then((res) => {
            if (res.data === "token expirado" || res.status !== 200) {
              redirctLogin();
            }
            setLoadingUser(true);
          })
          .catch((res) => {
            redirctLogin();
          });
        setUser(localUser);
      } else {
        setLoadingUser(true);
      }
    }
  }, []);

  return (
    <>
      {loadingUser ? (
        <>
          <TopMenu />
          {children}
        </>
      ) : (
        <>
          <Wrapper>
            <WarningMessage color={"white"}>Loading</WarningMessage>
            <Loading color={"white"} />
          </Wrapper>
        </>
      )}
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
  gap: 25px;
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
