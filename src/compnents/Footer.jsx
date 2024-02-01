import React from 'react'
import styled from 'styled-components';
import CurrentTrack from './CurrentTrack';
import PlayerControls from './PlayerControls';
import VolumeOthersControls from './VolumeOthersControls';
function Footer() {
    return (
        <Container>
            <CurrentTrack />
            <PlayerControls />
            <VolumeOthersControls class="volumeControls"/>
        </Container>
    )
}
const Container = styled.div`
   width: -webkit-fill-available; 
   color: white;
   background-color: black;
   display: flex;
   align-items: center;
   justify-content: center;
    padding: 0.5rem 1rem 0.5rem 1rem;
 
 @media only screen and (max-width:734px){
  flex-direction: column;
}


`
export default Footer