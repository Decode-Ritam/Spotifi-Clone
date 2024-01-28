import React, { useEffect } from 'react'
import axios from 'axios';
import { UseStateProvider } from '../utilities/StateProvider'
import styled from 'styled-components';
import { reducerCases } from '../utilities/Constant';
import { MdTimer } from "react-icons/md";




function Artists({ headerBackground }) {

    const [{ token, selectedArtistId, artistDetails, artistPlaylist }, dispatch] = UseStateProvider();
    useEffect(() => {
        const fetchArtistPlaylist = async () => {
            try {

                const id = selectedArtistId;
                // This Request for artist Information.......................................

                const artistData = await axios.get(
                    `https://api.spotify.com/v1/artists/${id}`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const artistDetails = {
                    artistId: artistData.data.id,
                    artistName: artistData.data.name,
                    artistImage: artistData.data.images[0].url,
                    followers: artistData.data.followers.total,

                }
                console.log(artistDetails)

                // Dispatch the artistDetails data to the state
                dispatch({
                    type: reducerCases.SET_ARTIST_DATA,
                    artistDetails,
                });

                // This Request for artist top Track......................................
                const response = await axios.get(
                    `https://api.spotify.com/v1/artists/${id}/top-tracks?market=in`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                const { tracks } = response.data;
                const artistPlaylist = tracks.map(({ name, id, artists, duration_ms, track_number, album }) => {
                    let artistNames = artists.map((artist) => artist.name).join(", ");
                    const albumName = album.name;
                    const context_uri = album.uri;
                    const image = album.images[2].url;

                    return { name, id, artistNames, image, duration_ms, track_number, albumName, context_uri };



                });

                // console.log(artistPlaylist);

                // Dispatch the fetched data to the state
                dispatch({
                    type: reducerCases.SET_PLAY_ARTIST,
                    artistPlaylist,
                });
            } catch (error) {
                console.error('Error fetching artist info:', error);
            }
        };

        fetchArtistPlaylist();
    }, [token, selectedArtistId, dispatch]);


    const playTrack = async (name, id, artistNames, image, duration_ms, track_number, albumName, context_uri) => {

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
                artistNames,
                image,
                duration_ms,
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
    // console.log(artistPlaylist)
    return (
        <Container className='artist' backgroundstate={headerBackground.toString()}>
            {artistPlaylist && (

                <>
                    {/*............... This si body Playlist Theme ..................*/}
                    <div className="playlist" id='artist__playlist'>
                        <div className="image">
                            <img src={artistDetails.artistImage} alt="selected playlist" />
                        </div>
                        <div className="details">
                            <span className="type">PLAYLIST</span>
                            <h1 className="title">{artistDetails.artistName}</h1>
                            <p className="description">Present Followers : {artistDetails.followers.toLocaleString()}</p>
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
                            {artistPlaylist.map(
                                ({ name, id, artistNames, image, duration_ms, track_number, albumName, context_uri },
                                    index
                                ) => {
                                    return (
                                        <div className="row" key={id} onClick={() => playTrack(name, id, artistNames, image, duration_ms, track_number, albumName, context_uri)} >
                                            <div className="col">
                                                <span>{index + 1}</span>
                                            </div>
                                            <div className="col detail">
                                                <div className="image">
                                                    <img src={image} alt="track" />
                                                </div>
                                                <div className="info">
                                                    <span className="name">{name}</span>
                                                    <span className='artistName'>{artistNames}</span>
                                                </div>
                                            </div>
                                            <div className="col albumeContent">
                                                <span>{albumName}</span>
                                            </div>
                                            <div className="col">
                                                <span>{msToMinutesAndSeconds(duration_ms)}</span>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>

                </>
            )}
        </Container>)

}
const Container = styled.div`
.playlist {
    margin: 0px 4rem;
    display: flex;
    align-items: center;
    gap: 5rem;
    margin-bottom: 4rem;
    background-color: transparent;
  .image {
      img {
        height: 16rem;
    width: 15rem;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12p
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
      grid-template-columns: 1.3fr 3fr 2.2fr 0.1fr;
      /* margin: 4rem 0 0 0; */
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

    .playlist {
        flex-direction: column;
gap: 2rem;
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
    .list .tracks {
        margin: 0;
    }
      .list .tracks .row{
        .albumeContent{
        display: none;
       } 

       grid-template-columns: 1fr 6fr 0fr 0.2fr;
      } 

 .tracks {
      margin: 0;

 }
}
`
export default Artists