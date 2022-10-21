import { useState } from "react";
import GlobalStyle from "./global/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import PrivatePage from "./components/PrivatePage";
import LoginPage from "./components/SignIn/LoginPage";
import SignUp from "./components/SignUp/SignUp";
import TimelinePage from "./components/TimelinePage/TimelinePage";
import HashtagPage from "./components/HashtagPage/HashtagPage";

function App() {
  const [user, setUser] = useState({});

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/timeline"
              element={
                <PrivatePage>
                  <TimelinePage />
                </PrivatePage>
              }
            />
            <Route
              path="/hashtag:hashtag"
              element={
                <PrivatePage>
                  <HashtagPage />
                </PrivatePage>
              }
            />
            <Route
              path="/user"
              element={
                <PrivatePage>
                  <h1>UserPage</h1>
                </PrivatePage>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
