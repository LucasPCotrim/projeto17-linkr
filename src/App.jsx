import { useState } from 'react';
import GlobalStyle from './global/GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import PrivatePage from './components/PrivatePage';
import SignUp from './components/SignUp/SignUp';

function App() {
  const [user, setUser] = useState({});

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}></UserContext.Provider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>LoginPage</h1>} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route
            path='/timeline'
            element={
              <PrivatePage>
                <h1>TimelinePage</h1>
              </PrivatePage>
            }
          />
          <Route
            path='/hashtag'
            element={
              <PrivatePage>
                <h1>HashtagPage</h1>
              </PrivatePage>
            }
          />
          <Route
            path='/user'
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

