import React, {useState } from 'react';
import '../index.css';
   import styled from 'styled-components'
import ArtistSongs from './ArtistSongs';
import { useLocation } from "react-router-dom";
import { IoLibrarySharp } from "react-icons/io5";
import PlaylistSongs from './PlaylistSongs';



function PlayListComponent(props) {

     const [isCollapsed, setIsCollapsed] = useState(false);
 
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
    const toggleLibrary = () => {

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

    return (
        <Container>
            <div className='library_text' id='toggle__library' onClick={toggleLibrary} title={!isCollapsed ? "Collapse Your Library" : "Expand Your Library"}   ><IoLibrarySharp /><span> Your Library</span></div>
            <hr />
            {!isCollapsed ?
                (<h3 className='listheadline'>Your {displayText} List</h3>)
                : (<h3 className='listheadline'>List</h3>
                )
            }

            <ul id='listItems' className='libraryList__items'>
                {location.pathname === "/artists" && <ArtistSongs />}
                {location.pathname === "/playlist" && <PlaylistSongs /> }
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

        </Container>
    ) 

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
    padding: 0.8rem;
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
   
//..................

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
