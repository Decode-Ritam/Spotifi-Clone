
import React, { useEffect } from "react";
import './index.css';
import './Responsive.css';
import Login from "./compnents/Login";
import { UseStateProvider } from "./utilities/StateProvider";
import { reducerCases } from "./utilities/Constant";
import SpotifyApp from "./compnents/SpotifyApp"; // Fix typo in import path
import { useNavigate } from 'react-router-dom';
function App() {
  let navigate = useNavigate(); const [{ token }, dispatch] = UseStateProvider();

  useEffect(() => {
    const hash = window.location.hash;


    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      navigate('/artists');
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }

  }, [token, dispatch, navigate]);


  return (
    <>
      {token ? (<SpotifyApp />) : (<Login />)}
    </>
  );
}

export default App;