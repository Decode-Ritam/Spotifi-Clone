import React, { useState, useEffect, useCallback } from 'react';
import Tooltip from './TooltipFile';
import axios from 'axios';
import styled from 'styled-components';
import { UseStateProvider } from '../utilities/StateProvider';
import { HiMiniSpeakerXMark, HiMiniSpeakerWave } from "react-icons/hi2";

function VolumeOthersControls() {
  const [{ token }] = UseStateProvider();
  const [volumeMuted, setVolumeMuted] = useState(false);
  const [volume, setVolume] = useState(50);

  const VolumeControls = useCallback(async (newVolumePercent) => {

    console.log(newVolumePercent);
    try {
      setVolume(newVolumePercent);
      if (newVolumePercent === 0) {
        setVolumeMuted(true);
      } else if (newVolumePercent > 0) {
        setVolumeMuted(false);
      }
      await axios.put(
        "https://api.spotify.com/v1/me/player/volume",
        {},
        {
          params: {
            volume_percent: newVolumePercent,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.error("Error setting volume:", error);
    }
  }, [token]);


  useEffect(() => {

    const toggleMute = () => {
      setVolumeMuted((prevMuted) => !prevMuted);
      const newVolumePercent = volumeMuted ? 50 : 0;
      VolumeControls(newVolumePercent);
      console.log("Toggle volume run...........");
    };
    const increaseVolume = () => {
      if (volume < 100) {
        const newVolumePercent = volume + 10; // Increase by 10, adjust as needed
        setVolume(newVolumePercent);
        VolumeControls(newVolumePercent);
      }
    };

    const decreaseVolume = () => {
      if (volume > 0) {
        const newVolumePercent = volume - 10; // Decrease by 10, adjust as needed
        setVolume(newVolumePercent);
        VolumeControls(newVolumePercent);
      }
    };

    const handleKeyDown = (e) => {
      const tagName = document.activeElement.tagName.toLowerCase();
      if (tagName === "input") return;

      switch (e.key.toLowerCase()) {
        case "m":
          toggleMute();
          break;
        case "arrowup":
          increaseVolume();
          break;
        case "arrowdown":
          decreaseVolume();
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [volumeMuted, volume, VolumeControls]);

  return (
    <Container>
      <Tooltip text={volumeMuted ? 'Un-mute (m)' : 'Mute (m)'}>
        {volumeMuted ? (
          <HiMiniSpeakerXMark title='un-mute (m)' />
        ) : (
          <HiMiniSpeakerWave title='mute (m)' />
        )
        }
      </Tooltip>
      <Tooltip text="Change Volume ( arrowup / arrowdown )">
        <input type="range" min={0} max={100} value={volumeMuted ? 0 : volume} onMouseUp={(e) => VolumeControls(parseInt(e.target.value))} />
      </Tooltip>
    </Container >
  );
}




const Container = styled.div`
  width: 30%;
  display: flex;
   justify-content: flex-end;
  align-content: center;
  gap: 1rem;
  svg {
    height: 25px;
    width: 25px;
  }
  input {
    width: 7rem;
    border-radius: 2rem;
    height: auto;
  }
  @media only screen and (max-width:965px){
  display: none;
     
 }
`;

export default VolumeOthersControls;
