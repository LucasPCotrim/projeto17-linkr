import { useState } from "react";
import GlobalStyle from "./global/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import PrivatePage from "./components/PrivatePage";
import { Timeline } from "./components/TimelinePage/Timeline";

function App() {
  const [user, setUser] = useState({});

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}></UserContext.Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>LoginPage</h1>} />
          <Route path="/sign-up" element={<h1>SignUpPage</h1>} />
          <Route path="/timeline" element={<Timeline />} />
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
    </>
  );
}

export default App;
