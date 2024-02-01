import React, { useEffect, useRef, useState } from 'react'
import { reducerCases } from '../utilities/Constant';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Playlist from './Playlist';
import Footer from './Footer'
import Search from './Search';
import Home from './Home';
import { UseStateProvider } from '../utilities/StateProvider'
import Artists from './Artists';
import Progressbar from './Progressbar.jsx';

function SpotifyApp() {

  const [{ token, selectedArtistBackgroundColor }, dispatch] = UseStateProvider();

  const [navbackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();

  const bodyScrolled = () => {
    // console.log(bodyRef.current.scrollTop)
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 349
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };


  useEffect(() => {
    const getUserData = async () => {

      try {
        const { data } = await axios.get(
          'https://api.spotify.com/v1/me',
          {
            headers: {
              Authorization: 'Bearer ' + token,
              "Content-Type": "application/json",
            }
          })

        const userinfo = {
          name: data.display_name,
          userId: data.id,
          userurl: data.external_urls.spotify,
          userImg: data.images[1].url,
        }

        // console.log(userinfo)
        dispatch({
          type: reducerCases.SET_USER,
          userinfo
        })


      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }
    getUserData()


  }, [token, dispatch])


  // Assuming --gradient-color1 is a CSS variable
  const bodycolor = selectedArtistBackgroundColor;

 


  return (
    <Container bodycolor={bodycolor} >
      <Progressbar />
      <div className="spotify__body">
        <Sidebar />

        <div className="body" ref={bodyRef} onScroll={bodyScrolled} >
          <Navbar navbackground={navbackground} navbarcolor={bodycolor} />

          <div className="body__content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/playlist" element={<Playlist headerBackground={headerBackground} />} />
              <Route path="/artists" element={<Artists headerBackground={headerBackground} />} />
            </Routes>
          </div>

        </div>
      </div>

      <div className="spotifi__footer">
        <Footer />
      </div>

    </Container>
  )
}


const Container = styled.div`
background-color:white;
   max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows:1vh 87vh 12vh;
  background:black;
 

.spotify__body{
   height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns:15vw 84vw;
  background-color: black;
 }
.body{
   height: 100%;
    width: 100%;
    border-top: 10px solid black;
    overflow: auto;
    border-radius: 16px;
    background: linear-gradient(${props => props.bodycolor}, rgb(17 17 17));

 /* Scrollbar */
&::-webkit-scrollbar {
  width: 0.7rem;
  border-radius: 10px;  
  background-color: rgb(186, 186, 186);
}

/* Scrollbar Thumb */
&::-webkit-scrollbar-thumb {
  background-color: rgb(109, 109, 109);
   height: 19rem;


  &:hover {
    background-color: #393737;
  }
}

}

@media only screen and (max-width:1120px){

  .spotify__body{
    grid-template-columns: 10vw 90vw;
 }
}
  @media only screen and (max-width:734px){
    .body{
    
      &::-webkit-scrollbar {
      width: 0.4rem;
     }
  }
  grid-template-rows:85vh 15vh ;

 }
  @media only screen and (max-width:537px){
   grid-template-rows:81vh 19vh ;
  .spotify__body{
   grid-template-columns:17vw 80vw;
 }

 }
`


export default SpotifyApp