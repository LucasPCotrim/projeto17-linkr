import { useEffect } from 'react';
import { getToken } from '../services/LinkrAPI';
import { useNavigate } from 'react-router-dom';

export default function PrivatePage({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <h1>TopMenu</h1>
      {children}
    </>
  );
}
