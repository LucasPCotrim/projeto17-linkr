import React from "react";
import styled from "styled-components";
import Loading from "../../commons/Loading";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/LinkrAPI";

export default function LoginPage() {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("linkr") !== null) {
      navigate("/timeline");
    }
  }, [navigate]);

  function logIn(e) {
    e.preventDefault();
    setSending(true);
    const body = { email: email, password: password };
    login(body)
      .then((response) => {
        localStorage.setItem(
          "linkr",
          JSON.stringify({
            token: response.data.token,
          })
        );
        navigate("/timeline");
      })
      .catch((erro) => {
        alert(
          "Não foi possível logar, email ou senha incorretos, tente novamente"
        );
        console.log(erro);
        setEmail("");
        setPassword("");
        setSending(false);
      });
  }

  return (
    <Wrapper>
      <Header>
        <h1>linkr</h1>
        <h2>save, share and discover the best links on the web</h2>
      </Header>
      <Forms on onSubmit={logIn}>
        <Input
          disabled={sending}
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <Input
          disabled={sending}
          required
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <Button type="submit" disabled={sending}>
          {sending ? <Loading /> : "Log In"}
        </Button>

        <Link to="/sign-up">
          <h5>First time? Create an account!</h5>
        </Link>
      </Forms>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
  }
`;
const Header = styled.div`
  width: 100%;
  height: 20vh;
  background-color: #151515;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  h1 {
    font-family: "Passion One", cursive;
    font-weight: bold;
    font-size: 76px;
  }
  h2 {
    width: 280px;
    height: 70px;
    font-family: "Oswald", sans-serif;
    font-weight: bold;
    font-size: 23px;
  }
  @media screen and (min-width: 1024px) {
    width: 150%;
    height: 100vh;
  }
`;
const Forms = styled.form`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 40px;
  h5 {
    font-size: 17px;
    color: white;
    font-family: "Lato", sans-serif;
    text-decoration: underline;
    margin-top: 20px;
  }
`;
const Input = styled.input`
  width: 80%;
  height: 55px;
  font-size: 22px;
  font-weight: bold;
  color: #000000;
  padding: 10px;
  border-radius: 5px;
  &::placeholder {
    color: #9f9f9f;
    opacity: 0.8;
  }
  &:disabled {
    background-color: #f2f2f2;
    color: #d4d4d4;
  }
`;
const Button = styled.button`
  background-color: #1877f2;
  width: 80%;
  height: 55px;
  border: none;
  border-radius: 5px;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    filter: brightness(1.2);
    cursor: pointer;
  }
  &:disabled {
    filter: brightness(0.7);
    cursor: default;
  }
`;
