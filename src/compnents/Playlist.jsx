import React, { useEffect } from 'react'
import axios from 'axios';
import { UseStateProvider } from '../utilities/StateProvider'
import styled from 'styled-components';
import { reducerCases } from '../utilities/Constant';
import { MdTimer } from "react-icons/md";




function Playlist({ headerBackground }) {
    const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = UseStateProvider();
    useEffect(() => {
        const getInitialPlaylist = async () => {


            const response = await axios.get(
                `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                }
            )
            const selectedPlaylist = {
                id: response.data.id,
                name: response.data.name,
                description: response.data.description.startsWith("<a")
                    ? ""
                    : response.data.description,
                image: response.data.images[0].url,
                tracks: response.data.tracks.items.map(({ track }) => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map((artist) => artist.name).join(", "),
                    image: track.album.images[2].url,
                    duration: track.duration_ms,
                    album: track.album.name,
                    context_uri: track.album.uri,
                    track_number: track.track_number,
                })),

            };

            // console.log(selectedPlaylist)
            dispatch({
                type: reducerCases.SET_PLALIST,
                selectedPlaylist
            })

        }
        getInitialPlaylist()
    }, [token, dispatch, selectedPlaylistId])
    // ------------------------------------------------
    const playTrack = async (id, name, artists, image, duration, context_uri, track_number) => {

        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/play`,
            {
                context_uri,
                offset: {
                    position: track_number - 1,
                },
                position_ms: 0,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        if (response.status === 204) {
            const currentPlaying = {
                id,
                name,
                artists,
                image,
                duration,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        } else {
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        }
    };

    const msToMinutesAndSeconds = (ms) => {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };


    return (
        <Container backgroundstate={headerBackground.toString()}>

            {selectedPlaylist && (
                <>
                    {/*............... This si body Playlist Theme ..................*/}
                    <div className="playlist">
                        <div className="image">
                            <img src={selectedPlaylist.image} alt="selected playlist" />
                        </div>
                        <div className="details">
                            <span className="type">PLAYLIST</span>
                            <h1 className="title">{selectedPlaylist.name}</h1>
                            <p className="description">{selectedPlaylist.description}</p>
                        </div>
                    </div>

                    <div className="list">
                        {/* ..................This is header............ */}
                        <div className="header-row">
                            <div className="col">
                                <span>#</span>
                            </div>
                            <div className="col">
                                <span>TITLE</span>
                            </div>
                            <div className="col">
                                <span>ALBUM</span>
                            </div>
                            <div className="col">
                                <span>
                                    <MdTimer style={{ height: '25px', width: '25px' }} />
                                </span>
                            </div>
                        </div>

                        {/*.................. This si track list.......................... */}

                        <div className="tracks">
                            {selectedPlaylist.tracks.map(
                                (
                                    {
                                        id,
                                        name,
                                        artists,
                                        image,
                                        duration,
                                        album,
                                        context_uri,
                                        track_number,
                                    },
                                    index
                                ) => {
                                    return (
                                        <div className="row" key={id} onClick={() => playTrack(id, name, artists, image, duration, context_uri, track_number)}  >
                                            <div className="col">  <span>{index + 1}</span> </div>

                                            <div className="col detail">
                                                <div className="image">
                                                    <img src={image} alt="track" />
                                                </div>
                                                <div className="info">
                                                    <span className="name">{name}</span>
                                                    <span className='artistName'>{artists}</span>
                                                </div>
                                            </div>
                                            <div className="col albumeContent">
                                                <span>{album}</span>
                                            </div>
                                            <div className="col">
                                                <span>{msToMinutesAndSeconds(duration)}</span>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>

                </>
            )}
        </Container>
    )
}
const Container = styled.div`
 
.playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 4rem;
 .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
   /* ..................This is list Style............ */ 
  .list {
    background: #00000047;
    padding: 0 0 15rem 0;
    border-radius: 5px;

       /* ..................This is header of list Style............ */ 
    .header-row {
      display: grid;
      grid-template-columns: 1fr 3fr 2.2fr 0.1fr;
       color: #dddcdc;
      padding: 15px 3rem;
      position: sticky;
      top: 65px;
      transition: 500ms ease-in;
      border-radius: 5px 5px 0 0;
      background-color: ${({ backgroundstate }) =>
        backgroundstate === "true" ? "#1b1616" : "none"};
    }
   
      /* ..................This is track of list Style............ */ 

    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
          border-radius: 5px;
        }
        .col {
          display: flex;
          align-items: center;
          color: #dddcdc;
          img {
            height: 40px;
            width: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          overflow: hidden;
          .info {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            width: 70%;
            .name{
                 overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .artistName{
                 overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
          }
        }
      }
 
    }
  }
  .albumeContent{
    width: 90%;
    overflow: hidden;
    span{
        overflow: hidden;
     white-space: nowrap;
     text-overflow: ellipsis;
    }
}
@media only screen and (max-width:1120px){

.list .tracks {
 margin:0;
 }

}
@media only screen and (max-width:765px){
    .playlist {
        flex-direction: column;

     .details{
        gap: 0.2rem;
    .type{
        font-size: 10px;
    }
     .title {
     font-size: 2rem;
     }

     .description{
      font-size: 12px;
     }
        
      } 
    }

    .list .header-row{
        display: none;
    }

      .list .tracks .row{
        .albumeContent{
        display: none;
       } 

       grid-template-columns: 1fr 6fr 0fr 0.2fr;
      } 
}
`
export default Playlist