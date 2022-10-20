import { useState } from "react";
import GlobalStyle from "./global/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import PrivatePage from "./components/PrivatePage";
import LoginPage from "./components/SignIn/LoginPage";
import { Timeline } from "./components/TimelinePage/Timeline";
import SignUp from "./components/SignUp/SignUp";

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
                  <Timeline />
                </PrivatePage>
              }
            />
            <Route
              path="/hashtag"
              element={
                <PrivatePage>
                  <h1>HashtagPage</h1>
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
