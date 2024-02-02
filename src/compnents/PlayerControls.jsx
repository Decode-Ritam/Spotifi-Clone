import React, { useEffect, useState } from 'react'
import Tooltip from './TooltipFile';
import axios from 'axios';
import styled from 'styled-components'
import { UseStateProvider } from '../utilities/StateProvider'
import { FaShuffle } from "react-icons/fa6";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { MdOutlinePauseCircleFilled } from "react-icons/md";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { RiRepeatLine } from "react-icons/ri";
import { reducerCases } from '../utilities/Constant';


function PlayerControls() {
    const [{ token, playerState }, dispatch] = UseStateProvider();
    const [ShuffleState, setShuffleState] = useState(false)
    const [Repeat, setRepeatState] = useState(false)


    const changeState = async () => {

        try {
            const state = playerState ? "pause" : "play";
            await axios.put(
                `https://api.spotify.com/v1/me/player/${state}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
            dispatch({
                type: reducerCases.SET_PLAYER_STATE,
                playerState: !playerState,
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 error here
                sessionStorage.removeItem('SpotifiToken');
                alert("Your Session is out!");
                window.location.reload();
            } else if (error.response && error.response.status === 404) {
                // Device status update to reducerCases..
                dispatch({
                    type: reducerCases.SET_DEVICE_STATUS,
                    deviceStatus: false
                })// Handle 404 error here
                alert(`Play Request Failed: No Active Spotify Account Found!`);
            } else {
                console.error('Error fetching artist info:', error);
            }
        }
    };

    const changeTrack = async (type) => {
        try {
            await axios.post(
                `https://api.spotify.com/v1/me/player/${type}`, {},
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                }
            );
            dispatch({
                type: reducerCases.SET_PLAYER_STATE,
                playerState: !playerState,
            });
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });

            // Introduce a delay before fetching the updated player state
            setTimeout(async () => {
                const response = await axios.get(
                    "https://api.spotify.com/v1/me/player/currently-playing ",
                    {
                        headers: {
                            Authorization: 'Bearer ' + token,
                            "Content-Type": "application/json",
                        }
                    }
                );

                if (response.status === 401) {
                    sessionStorage.removeItem('SpotifiToken')
                    dispatch({
                        type: reducerCases.SET_TOKEN,
                        token: false,
                    });
                    return;
                }

                if (response.data !== "") {
                    const currentPlaying = {
                        Duration: response.data.item.duration_ms,
                        SongProgress: response.data.progress_ms,
                        id: response.data.item.id,
                        name: response.data.item.name,
                        artists: response.data.item.artists.map((artist) => artist.name),
                        image: response.data.item.album.images[2].url,
                    };

                    dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });


                } else {
                    dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
                }
            }, 1000);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 error here
                sessionStorage.removeItem('SpotifiToken');
                alert("Your Session is out!");
                window.location.reload();
            } else if (error.response && error.response.status === 404) {

                // Device status update to reducerCases..
                dispatch({
                    type: reducerCases.SET_DEVICE_STATUS,
                    deviceStatus: false
                })// Handle 404 error here
                alert(`Play Request Failed: No Active Spotify Account Found!`);
            } else {
                console.error('Error fetching artist info:', error);
            }
        }
    };

    const PlaybackShuffle = async (currentState) => {
        try {
            setShuffleState((prevState) => !prevState); // Toggle the shuffle state

            await axios.put(
                ` https://api.spotify.com/v1/me/player/shuffle?state=${currentState}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 error here
                sessionStorage.removeItem('SpotifiToken');
                alert("Your Session is out!");
                window.location.reload();
            } else if (error.response && error.response.status === 404) {
                // Device status update to reducerCases..
                dispatch({
                    type: reducerCases.SET_DEVICE_STATUS,
                    deviceStatus: false
                })
                // Handle 404 error here
                setShuffleState(false)
                alert(`Play Request Failed: No Active Spotify Account Found!`);
            } else {
                console.error('Error fetching artist info:', error);
            }
        }

    }

    const setRepeatMode = async (state) => {

        try {
            if (state === "track") {
                setRepeatState(true)
            }
            if (state === "off") {
                setRepeatState(false)
            }

            await axios.put(
                `https://api.spotify.com/v1/me/player/repeat?state=${state}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            )
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 error here
                sessionStorage.removeItem('SpotifiToken');
                alert("Your Session is out!");
                window.location.reload();
            } else if (error.response && error.response.status === 404) {
                // Device status update to reducerCases..
                dispatch({
                    type: reducerCases.SET_DEVICE_STATUS,
                    deviceStatus: false
                })
                // Handle 404 error here
                setRepeatState(false)
                alert(`Play Request Failed: No Active Spotify Account Found!`);
            } else {
                console.error('Error fetching artist info:', error);
            }
        }

    }

    useEffect(() => {


        const handleKeyDown = (e) => {
            const tagName = document.activeElement.tagName.toLowerCase();
            if (tagName === "input") return;

            switch (e.key.toLowerCase()) {

                case 'p':
                    changeState();
                    break;
                case ' ':
                    changeState();
                    break;
                case "s":
                    PlaybackShuffle(!ShuffleState);
                    break;
                case 'r':
                    setRepeatMode("track");
                    break;
                case "o":
                    setRepeatMode("off");
                    break;
                case 'j': // Fixed syntax issue here
                    changeTrack('next');
                    break;
                case 'f': // Fixed syntax issue here
                    changeTrack('previous');
                    break;
                default:
                    break;



            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [changeState, PlaybackShuffle, ShuffleState, changeTrack]);

    return (
        <Container>
            <div className="playercontroll">
                <div className="shuffle" onClick={() => PlaybackShuffle(!ShuffleState)} >
                    <Tooltip text="Shuffle Toggle (s)" >
                        {ShuffleState ?
                            <FaShuffle style={{ color: '#1ed760' }} />
                            : <FaShuffle />
                        }
                    </Tooltip>
                </div>
                <div className="previous">
                    <Tooltip text=" Previous  (f)"  >
                        <MdSkipPrevious onClick={() => changeTrack("previous")} />
                    </Tooltip>
                </div>
                <div className="state">
                    <Tooltip text={playerState ? "Pause (p)" : "Play (p)"}>
                        {playerState ? (
                            <MdOutlinePauseCircleFilled onClick={changeState} className='playicon' />

                        ) : (
                            <BsFillPlayCircleFill onClick={changeState} />
                        )}
                    </Tooltip>
                </div>
                <div className="next">
                    <Tooltip text="Next (j)">
                        <MdSkipNext onClick={() => changeTrack("next")} />
                    </Tooltip>
                </div>
                <Tooltip text={Repeat ? "Repeat Moode Off (o)" : "Repeat Moode On (r)"}>
                    {Repeat ?
                        (<div className="repeat" onClick={() => setRepeatMode("off")}  >
                            <RiRepeatLine style={{ color: '#1ed760' }} />
                        </div>
                        )
                        : (<div className="repeat" onClick={() => setRepeatMode("track")} >
                            <RiRepeatLine />
                        </div>)
                    }
                </Tooltip>
            </div>
            <div className="playerProgressbar" style={{ display: 'none' }}>
                <div className="songProgresstime"> </div>
                <div className="progressbar"></div>
                <div className="totalTime"> 0:00</div>
            </div>
        </Container>
    )
}
const Container = styled.div`
  width: 40%;
.playercontroll{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
    color: white;
    transition: transform 0.2s ease-in-out;
    transform: scale(1.2) !important;
    }
  }
  .state {
    .playicon{
         font-size: 3rem;
        color:#1ed760 ;
    }
    svg {
      color: white;
      font-size: 3rem;
     }

  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
}
.playerProgressbar{
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 7px;
   margin-bottom: 1rem;
   font-size: 12px;

    .progressbar{ 
    width: 100%;
    height: 2px;
    background-color: white;
    }


}

@media only screen and (max-width:760px){
      width: 60%;

 }
@media only screen and (max-width:610px){
      width: 90%;
 
 }
 @media only screen and (max-width:965px){
    .playerProgressbar{
   display: none;
 }     
 }

   
`
export default PlayerControls