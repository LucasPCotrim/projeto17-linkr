import { useEffect } from "react";
import { getToken } from "../services/LinkrAPI";
import { useNavigate } from "react-router-dom";
import TopMenu from "./TopMenu/TopMenu";

export default function PrivatePage({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <TopMenu />
      {children}
    </>
  );
}
