import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PostsContainer } from "../TimelinePage/PostsContainer";
import { useParams } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";

export default function SearchBar() {
  return (
    <div>
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        onChange={() => console.log("is alive")}
      />

      <p>Value: {""}</p>
    </div>
  );
}
