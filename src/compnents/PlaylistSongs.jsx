import React, { useEffect, useState } from 'react';
import '../index.css';
import { UseStateProvider } from '../utilities/StateProvider';
import styled from "styled-components";
import { reducerCases } from '../utilities/Constant';
import axios from 'axios';

function PlaylistSongs() {

    const [{ token, playlists }, dispatch] = UseStateProvider();
    const [selectedPlaylistId, setselectedPlaylistId] = useState(null);
    const [playlisttitle, setPlaylisttitle] = useState(null);

    if (playlisttitle) {
        document.title = `Spotifi- ${playlisttitle}`;
     }
    useEffect(() => {
        const getPlaylistData = async () => {
            try {
                const response = await axios.get(
                    'https://api.spotify.com/v1/me/playlists',
                    {
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json',
                        },
                    }
                )
                const { items } = response.data;
                const playlists = items.map(({ name, id, images, owner }) => {
                    const listImages = images[0].url;
                    const createBy = owner.display_name;

                    return { name, id, listImages, createBy }
                })


                dispatch({
                    type: reducerCases.SET_PLALISTS,
                    playlists
                })
            } catch (error) {


                // For other errors, log to console
                console.error('Error fetching playlists:', error);

            };
        };

        getPlaylistData();

    }, [token, dispatch]);

    const changeCurrentPlaylist = (selectedPlaylistId, playlistName) => {
        dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
        setselectedPlaylistId(selectedPlaylistId)
        setPlaylisttitle(playlistName)

    };

    return (
        <Container>

            {playlists.map(({ name, id, listImages, createBy }) => (
                <li
                    className={`playlist_list ${selectedPlaylistId === id ? 'selected' : ''}`}
                    key={id}
                    onClick={() => changeCurrentPlaylist(id, name)}
                    title={name}
                >
                    <img src={listImages} alt={name} />
                    <p className='playlist_content'>
                        <span className='name'>{name}</span>
                        <span className='Createby'> {createBy}</span>
                    </p>
                </li>
            ))}

        </Container>
    )
}
const Container = styled.div`
    .playlist_list{
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 200ms color ease-in;
        color: gray;
        align-items: center;
        padding: 5px;
        img{
            height: 40px;
            width: 40px;
            border-radius: 5px;
        }
        p{
            flex-direction: column;
            display: flex;
            gap: 3px;
            overflow: hidden;
            .Createby{
                font-size: 12px;
            }
          span{
             overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;  
          }
          }
        &:hover{
            color: white;
        }
        &.selected {
            color: #00ff00;  
        }
    }
    @media only screen and (max-width:1120px){
        .playlist_list{
    justify-content: center;
    .playlist_content{
    display: none;
 }
 }
    }
`
export default PlaylistSongs