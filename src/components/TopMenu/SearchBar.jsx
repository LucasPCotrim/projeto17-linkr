import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { getUsersList } from "../../services/LinkrAPI";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiXCircle } from "react-icons/fi";

function ResultSearch({ user, ...otherProps }) {
  return (
    <BoxResultuser {...otherProps}>
      <img src={user.profilePic} alt="profilePic" />
      {user.name}
      {parseInt(user.follow) ? <p>• following</p> : ""}
    </BoxResultuser>
  );
}

export default function SearchBar() {
  const [stringSearch, setStringSearch] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const navigate = useNavigate();
  let controllerGetAll = true;

  function getAllUsers() {
    const promise = getUsersList("allusers");
    promise
      .then((res) => {
        setListUsers(res.data);
        controllerGetAll = true;
      })
      .catch((res) => {
        console.log(res);
        controllerGetAll = true;
      });
  }

  function clickSearch() {
    if (stringSearch === "" && controllerGetAll) {
      controllerGetAll = false;
      getAllUsers();
    } else if (stringSearch !== "") {
      setStringSearch("");
    }
  }

  useEffect(() => {
    if (stringSearch !== "" && stringSearch.length > 2) {
      const promise = getUsersList(stringSearch);
      promise
        .then((res) => {
          setListUsers(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
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
      <StyledSearch>
        {stringSearch === "" ? (
          <FiSearch onClick={() => clickSearch()} />
        ) : (
          <FiXCircle onClick={() => clickSearch()} />
        )}
      </StyledSearch>
      <ContainerResultSearch>
        {listUsers?.length > 0 ? (
          listUsers?.map((user, index) => (
            <ResultSearch
              key={index}
              user={user}
              onClick={() => {
                setListUsers([]);
                setStringSearch("");
                /* navigate(`/user/${user.id}`); */
                window.location.assign(`/user/${user.id}`);
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
  position: relative;
  z-index: 3;
  background: #ffffff;
  border-radius: 8px;
  padding: 0 38px 0 16px;
  font-family: "Lato";
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  ::placeholder {
    color: #c6c6c6;
  }
  outline: 0;
  @media screen and (max-width: 614px) {
    width: 100%;
    position: relative;
    z-index: 3;
  }
`;

const ContainerSearch = styled.div`
  position: relative;
  @media screen and (max-width: 614px) {
    position: absolute;
    width: 96%;
    top: 82px;
    left: 10px;
    z-index: 10;
  }
`;

const ContainerResultSearch = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: #e7e7e7;
  border-radius: 8px;
  padding-top: 45px;
  div {
    height: 66px;
  }
  max-height: 600px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
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
  border-radius: 8px;
  transition: all 0.6s;
  &:hover {
    transform: scale(1.04);
  }
  p {
    margin-left: 6px;
    color: #c5c5c5;
  }
`;

const StyledSearch = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 4;

  font-size: 19px;
  color: #c6c6c6;
  font-size: 28px;
  cursor: pointer;
`;
