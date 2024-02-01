
import React, { useEffect } from "react";
import './index.css';
import './Responsive.css';
import Login from "./compnents/Login";
import { UseStateProvider } from "./utilities/StateProvider";
import { reducerCases } from "./utilities/Constant";
import SpotifyApp from "./compnents/SpotifyApp"; // Fix typo in import path
import { useNavigate } from 'react-router-dom';
function App() {
  let navigate = useNavigate();
  const [{ token }, dispatch] = UseStateProvider();

  useEffect(() => {
    const hash = window.location.hash;

    const handleLogin = (hash) => {

      if (hash) {
        const token = hash.substring(1).split("&")[0].split("=")[1];
        sessionStorage.setItem("SpotifiToken", token); // Set the item with a key
        dispatch({ type: reducerCases.SET_TOKEN, token });
        navigate('/playlist');

      } else {
        const storedToken = sessionStorage.getItem("SpotifiToken"); // Retrieve the item with a key
        dispatch({ type: reducerCases.SET_TOKEN, token: storedToken });
       }
    }
    handleLogin(hash);
  }, [token, dispatch, navigate]);


  return (
    <>
      {token ? (<SpotifyApp />) : (<Login />)}
    </>
  );
}

export default App;