import React, { useEffect, useState } from 'react';
import '../index.css';
import { UseStateProvider } from '../utilities/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utilities/Constant';
import styled from 'styled-components'
import ArtistSongs from './ArtistSongs';
import { useLocation } from "react-router-dom";
import { IoLibrarySharp } from "react-icons/io5";



function PlayListComponent(props) {

    const [{ token, playlists }, dispatch] = UseStateProvider();
    const [isCollapsed, setIsCollapsed] = useState(false);

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

    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
        // console.log(selectedPlaylistId)
    };

    let location = useLocation();
    const currentPath = location.pathname;
    const defaultText = 'Top';

    const pathNameMappings = {
        '/search': 'Search',
        '/playlist': 'Play',
        '/artists': 'Following Artist',
        '/library': 'Library',
    };



    // useEffect to update isCollapsed on window resize
    const toggleLibrary = (isSmallScreen) => {

        console.log("Library collapse successful...");


        // Get references to the elements
        let sidebarToggle = document.querySelector(".spotify__body");
        let listItems = document.getElementById("listItems");
        let librarylistContent = document.querySelectorAll(".librarylistContent");
        let listofArtist = document.querySelectorAll(".listof__artist");
        let libraryText = document.querySelector(".library_text span");
        let libraryTextPadding = document.querySelector(".library_text ");
        let listofItems = document.querySelectorAll(".listofItems span");
        let listoficons = document.querySelectorAll(".listoficons");
        let playlistContent = document.querySelectorAll(".playlist_content");
        let playlistList = document.querySelectorAll(".playlist_list");
        let TooltipJustifyContent = document.querySelectorAll(".Tooltip");

        // Toggle gridTemplateColumns for sidebarToggle
        sidebarToggle.style.gridTemplateColumns = isCollapsed ? "15vw 85vw" : "6vw 94vw";

        listItems.style.padding = isCollapsed ? "1.1rem" : "0.1rem";
        libraryText.style.display = isCollapsed ? "flex" : "none";
        libraryTextPadding.style.margin = isCollapsed ? "1rem" : "2.3rem 0 1rem 0";
        libraryTextPadding.style.justifyContent = isCollapsed ? "left" : "center";


        // Loop through the NodeList and toggle the display property for each element
        TooltipJustifyContent.forEach(element => {
            element.style.justifyContent = isCollapsed ? "flex-start" : "center";

        });
        librarylistContent.forEach(element => {
            element.style.display = isCollapsed ? "flex" : "none";

        });
        playlistList.forEach(element => {
            element.style.justifyContent = isCollapsed ? "flex-start" : "center";

        });
        playlistContent.forEach(element => {
            element.style.display = isCollapsed ? "flex" : "none";

        });
        listofArtist.forEach(element => {
            element.style.justifyContent = isCollapsed ? "left" : "center";
        });
        listofItems.forEach(element => {
            element.style.display = isCollapsed ? "flex" : "none";
        });
        listoficons.forEach(element => {
            element.style.justifyContent = isCollapsed ? "flex-start" : "center";
            // Add more styles if needed
        });

        // Toggle isCollapsed state
        setIsCollapsed((prevCollapsed) => !prevCollapsed);
        props.getData(isCollapsed)
    };



    const displayText = pathNameMappings[currentPath] || defaultText;

    return <Container>
        <div className='library_text' id='toggle__library' onClick={toggleLibrary} title={!isCollapsed ? "Collapse Your Library" : "Expand Your Library"}   ><IoLibrarySharp /><span> Your Library</span></div>
        <hr />
        {!isCollapsed ?
            (<h3 className='listheadline'>Your {displayText} List</h3>)
            : (<h3 className='listheadline'>List</h3>
            )
        }

        <ul id='listItems' className='libraryList__items'>
            {location.pathname === "/artists" && <ArtistSongs />}
            {location.pathname === "/playlist" && (
                playlists.map(({ name, id, listImages, createBy }) => {
                    return (
                        <li className='playlist_list' key={id} onClick={() => changeCurrentPlaylist(id)} title={name}>
                            <img src={listImages} alt={name} />
                            <p className='playlist_content'>
                                <span className='name'>{name}</span>
                                <span className='Createby'> {createBy}</span>
                            </p>
                        </li>

                    )
                })
            )}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />



        </ul>

    </Container>;
}

const Container = styled.div`
background: #2a2a2a;
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  border: 10px solid black;
    border-radius: 19px;
    border-top:none;
  .library_text{
    display: flex;
    align-items: center;
    justify-content: left;
    margin: 1rem;
    gap: 1rem;
    font-size: 1.4rem;
    color: #b3b3b3;
    transition: 200ms color ease-in;
    &:hover{
        color: white;
        cursor: pointer;
    }
}
h3{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    color: white;
    font-size: 16px;
}
hr{
    border: 1px solid #393737;
    width: 90%;
    margin: 0px auto;
}

.libraryList__items{
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.1rem;
    height: 55vh;
     max-height: 100%;
    overflow: auto;
 
    /* margin-bottom: 12rem; */
    &::-webkit-scrollbar {
      width: 0.2rem;
      border-radius: 90%;
      &-thumb {
        background-color: rgba(232, 232, 232, 0.6);
        &:hover{
            background-color: #393737;
        }
      }
    }
    li{
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 200ms color ease-in;
        color: gray;
        align-items: center;
        /* overflow: hidden; */
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
    }
}
/* This is Responsive Style */
@media only screen and (max-width:1170px){
 .library_text{
    font-size: 1rem;
    margin: 1rem 0;
    gap: 5px;

}

}
@media only screen and (max-width:1120px){
  
 #listItems{
    padding: 1rem 0;
 }
  .library_text span{
    display: none;
 }
 .library_text{
    margin:2.3rem 0 1rem 0;
    justify-content: center;
 }
   

.playlist_list{
    justify-content: center;
    .playlist_content{
    display: none;
 }
 }
.libraryList__items{
    li{
       gap: 0;
   }
   &::-webkit-scrollbar {
      width: 0.1rem;
      border-radius: 90%;
   }

}
.listof__artist{
    gap: 0;
    justify-content: center;
}

.listheadline{
    display: none;
}
.library_text {
    pointer-events: none;
   }
}
@media only screen and (max-width:768px){
    border: 2px solid black;
}
 
`

export default PlayListComponent;
