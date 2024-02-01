import React, { useState } from 'react';
import { UseStateProvider } from '../utilities/StateProvider';
import styled from "styled-components";
import { reducerCases } from '../utilities/Constant';

// This is following artist playlist data...............
const artists = [
    {
        id: "3yMmYEklQ7gLOZXEFNd3xr",
        name: "Palak Muchhal",
        image: "https://i.scdn.co/image/ab6761610000517437d0a183ce70dd31008f5622",
        bodyColor: "var(--gradient-color1)",
    },
    {
        id: "4YRxDV8wJFPHPTeXepOstw",
        name: "Arijit Singh",
        image: "https://i.scdn.co/image/ab6761610000f1780261696c5df3be99da6ed3f3",
        bodyColor: "var(--gradient-color2)",
    },
    {
        id: "0oOet2f43PA68X5RxKobEy",
        name: "Shreya Ghosal",
        image: "https://i.scdn.co/image/ab6761610000f1780a5eed4eb7f69f500a3bacb9",
        bodyColor: "var(--gradient-color3)",
    },
    {
        id: "1mYsTxnqsietFxj1OgoGbG",
        name: "A.R Rahman",
        image: "https://i.scdn.co/image/ab6761610000e5ebb19af0ea736c6228d6eb539c",
        bodyColor: "var(--gradient-color4)",
    },
    {
        id: "4IKVDbCSBTxBeAsMKjAuTs",
        name: "Arman Malik",
        image: "https://i.scdn.co/image/ab6761610000f178c5911f22814f270d5004ae53",
        bodyColor: "var(--gradient-color5)",
    },
    {
        id: "7uIbLdzzSEqnX0Pkrb56cR",
        name: "YO YO Honey Singh",
        image: "https://i.scdn.co/image/ab6761610000f17829cf7f1a56f5ff1911f6a0ef",
        bodyColor: "var(--gradient-color6)",
    },
    {
        id: "5rQoBDKFnd1n6BkdbgVaRL",
        name: "Guru Randhawa",
        image: "https://i.scdn.co/image/ab6761610000f178763eb4c279c361127cd79700",
        bodyColor: "var(--gradient-color7)",
    },
    {
        id: "4fEkbug6kZzzJ8eYX6Kbbp",
        name: "K K",
        image: "https://i.scdn.co/image/ab6761610000e5ebb09a31f853166e721d4d46b2",
        bodyColor: "var(--gradient-color8)",
    },
    {
        id: "1dVygo6tRFXC8CSWURQJq2",
        name: "Sonu Nigam",
        image: "https://i.scdn.co/image/ab6761610000f178bc959d7569618ec2af2210f5",
        bodyColor: "var(--gradient-color9)",
    },
    {
        id: "1wRPtKGflJrBx9BmLsSwlU",
        name: "Pritam",
        image: "https://i.scdn.co/image/ab6761610000f178cb6926f44f620555ba444fca",
        bodyColor: "var(--gradient-color10)",
    },
];

function ArtistSongs() {

    const [{ token }, dispatch] = UseStateProvider();
    const [selectedId, setselectedId] = useState(null);
    const [artisttitle, setArtisttitle] = useState(null);

    if (artisttitle) {
       document.title = `Spotifi- ${artisttitle}`;
    }

    // console.log(token)
    const changeArtistPlaylist = (selectedArtistId, artistName, selectedArtistBackgroundColor) => {

        dispatch({ type: reducerCases.SET_ARTIST_ID, selectedArtistId });
        dispatch({ type: reducerCases.SET_ARTIST_UNIQUE_COLOR, selectedArtistBackgroundColor });
        setselectedId(selectedArtistId);
        setArtisttitle(artistName);

    };


    return (
        <Container>

            {artists.map((artist) => (
                <div
                    className={`listof__artist ${selectedId === artist.id ? 'selected' : ''}`}
                    key={artist.id}
                    onClick={() => changeArtistPlaylist(artist.id, artist.name, artist.bodyColor)}
                    title={artist.name}>

                    <img src={artist.image} alt={artist.name} />
                    <div className="librarylistContent content">
                        <p className='artist__name'>{artist.name}</p>
                        <span>Artist</span>
                    </div>

                </div>
            ))}
            <br />
            <br />
        </Container>
    )
}
const Container = styled.div`
    .listof__artist{
         display: flex;
         align-items: center;
         justify-content: left;
         gap: 15px;
         padding: 5px;
         color: gray;
         &:hover{
                color: white;
               }
         &.selected {
            color: #00ff00; 
        }
    
     img{
           height: 45px;
         width: 45px;
          border-radius: 45px;
      }
      .content{
     display: flex;
    flex-direction: column;
    font-size: 14px;
    gap: 0.2rem;
    cursor: pointer;
    transition: 200ms color ease-in;
    
            overflow: hidden;
    .artist__name{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
             }
       
     }
        
         
        }
  @media only screen and (max-width:1120px){
    .listof__artist{
        justify-content: center;
    .librarylistContent{
    display: none;
     }

    }
  }
`

export default ArtistSongs