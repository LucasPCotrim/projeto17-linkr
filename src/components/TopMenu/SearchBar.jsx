import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import { getUsersList } from "../../services/LinkrAPI";

function ResultSearch({ user, ...otherProps }) {
  return (
    <BoxResultuser {...otherProps}>
      <img src={user.profilePic} alt="profilePic" />
      {user?.name}
    </BoxResultuser>
  );
}

export default function SearchBar() {
  const [stringSearch, setStringSearch] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (stringSearch !== "" && stringSearch.length > 2) {
      const promise = getUsersList(stringSearch);
      promise
        .then((res) => {
          console.log(res.data);
          setListUsers(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      setStringSearch("");
      setListUsers([]);
    }
  }, [stringSearch]);

  return (
    <ContainerSearch>
      <StyledDebounce
        debounceTimeout={300}
        onChange={(e) => setStringSearch(e.target.value)}
        placeholder="Search for people and friends"
        value={stringSearch}
      />
      <ContainerResultSearch>
        {listUsers.length > 0 ? (
          listUsers.map((user, index) => (
            <ResultSearch
              key={index}
              user={user}
              onClick={() => {
                navigate(`/user/${user.id}`);
                setListUsers([]);
                setStringSearch("");
              }}
            />
          ))
        ) : (
          <></>
        )}
      </ContainerResultSearch>
    </ContainerSearch>
  );
}

const StyledDebounce = styled(DebounceInput)`
  width: 50vw;
  height: 45px;

  background: #ffffff;
  border-radius: 8px;
  padding: 0 16px;

  font-family: "Lato";
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  ::placeholder {
    color: #c6c6c6;
  }
  outline: 0;
  z-index: 1;
`;
const ContainerSearch = styled.div`
  position: relative;
  @media screen and (max-width: 614px) {
    display: none;
  }
`;

const ContainerResultSearch = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  background: #e7e7e7;
  border-radius: 8px;
  padding-top: 45px;
  div {
    height: 66px;
  }
`;

const BoxResultuser = styled.div`
  height: 66px;
  display: flex;
  align-items: center;
  padding: 0 18px;
  img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 18px;
  }
  cursor: pointer;
  font-family: "Lato";
  font-weight: 400;
  font-size: 19px;
  color: #515151;
  &:hover {
    background-color: #cecaca;
  }
`;
