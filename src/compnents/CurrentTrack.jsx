import React, { useEffect } from 'react'
import styled from 'styled-components';
import { UseStateProvider } from '../utilities/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utilities/Constant';
import { IoIosHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";



function CurrentTrack() {
  const [{ token, currentPlaying }, dispatch] = UseStateProvider();

  useEffect(() => {


    const getCurrentTrack = async () => {

      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing ",
        {
          headers: {
            Authorization: 'Bearer ' + token,
            "Content-Type": "application/json",

          }
        }
      )
      if (response.data !== "") {
        const currentPlaying = {
          Duration: response.data.item.duration_ms,
          SongProgress: response.data.progress_ms,
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
        };

        // console.log(currentPlaying)
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });

      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
      }


    }

    getCurrentTrack();

  }, [token, dispatch])



  return (
    <Container>
      {currentPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentPlaying.image} alt="currentPlaying" />
          </div>
          <div className="track__info">
            <h4 className="track__info__track__name">{currentPlaying.name}</h4>
            <h6 className="track__info__track__artists">
              {currentPlaying.artists || currentPlaying.artistNames}
            </h6>
          </div>
          <div className="like">
            {currentPlaying ? (
              <IoIosHeartEmpty className="unSelected" />
            ) : (
              <FaHeart className="Selected" />
            )}
          </div>
        </div>
      )}
    </Container>
  )
}


const Container = styled.div`
    width: 30%;
    padding:1rem;
   .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content:flex-start;
    width: 95%;
&__image{
     img{
      height: 3rem;
      width: 3rem;
    }
}
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      overflow: hidden;
      &__track__name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis; /* Add this property */
        color: white;
      }
      &__track__artists {
        overflow: hidden;
        color: #b3b3b3;
        display: inline-block;
        white-space: nowrap;
        animation: track__info__track__artists 18s linear infinite alternate;  
        animation-play-state: running;
        transition: all 0.3s ease;

        &:hover {
          animation-play-state: paused;
        }
      }
    }
  }

  @keyframes track__info__track__artists {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(50%);
    }
  }

  .like {
    display: flex;
    gap: 1rem;

    .unSelected {
      height: 25px;
      width: 25px;
      color: #ffffff;
    }

    .Selected {
      height: 25px;
      width: 25px;
      color: #1ed760;
    }
  }
  @media only screen and (max-width:760px){
      width: 40%;
    }
    @media only screen and (max-width:734px){
      width: 90%;
      padding: 0;
      .track {
     justify-content: center;
     }
 
}
    @media only screen and (max-width:610px){
    
      .track {
        gap: 2rem;
    align-items: center;
    justify-content: center;
       .track__info{
        width: 50%;
      }
    }

  }
  @media only screen and (max-width:537px){
width: 60vw;

  }
`;



export default CurrentTrack