import React, { useState, useEffect, useCallback } from 'react';
import Tooltip from './TooltipFile';
import axios from 'axios';
import styled from 'styled-components';
import { UseStateProvider } from '../utilities/StateProvider';
import { HiMiniSpeakerXMark, HiMiniSpeakerWave } from "react-icons/hi2";
import { PiDevicesBold } from "react-icons/pi";
import { reducerCases } from '../utilities/Constant';

function VolumeOthersControls() {
  const [{ token, deviceStatus }, dispatch] = UseStateProvider();
  const [volumeMuted, setVolumeMuted] = useState(false);
  const [volume, setVolume] = useState(50);


  useEffect(() => {

    const gaetCurrentDevice = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/devices",
          {
            headers: {
              Authorization: 'Bearer ' + token,
              "Content-Type": "application/json",

            }
          }
        )
         if (!response.data.devices[0]) {
          dispatch({
            type: reducerCases.SET_DEVICE_STATUS,
            deviceStatus: false
          })
          alert(`No Active Spotify Account Found!.. Activate your original Spotify..`)
        }

        if (response.data.devices[0]) {
           const deviceData = response.data.devices[0]
          const ActiveDevice = {
            deviceId: deviceData.id,
            deviceActive: deviceData.is_active,
            responseRestricted: deviceData.is_restricted,
            diviceName: deviceData.name,
            diviceType: deviceData.type,
            volumePresent: deviceData.volume_percent,
            supportsVolume: deviceData.supports_volume,
          }
          if (ActiveDevice.deviceActive) {
            dispatch({
              type: reducerCases.SET_DEVICE_STATUS,
              deviceStatus: true
            })
            alert(`Active device found.. Name: ${ActiveDevice.diviceType} , ${ActiveDevice.diviceName}`)
          }
          if (!ActiveDevice.deviceActive) {
            dispatch({
              type: reducerCases.SET_DEVICE_STATUS,
              deviceStatus: false
            })
            alert(`No Active Spotify Account Found!.. Before play activate your original Spotify..`)
          }
        }

      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle 401 error here
          sessionStorage.removeItem('SpotifiToken');
          alert("Your Session is out!");
          window.location.reload();
        } else {
          console.error('Error fetching:', error);
        }
      }
    }
    setTimeout(() => {
      gaetCurrentDevice()
    }, 3000);

  }, [token, dispatch])


  const VolumeControls = useCallback(async (newVolumePercent) => {

    // console.log(newVolumePercent);
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
        setVolumeMuted(false);
        setVolume(50)
        alert(`Request Failed: No Active Original Account Found!`);
      } else {
        console.error('Error fetching artist info:', error);
      }
    }
  }, [token, dispatch]);


  useEffect(() => {

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
  });

  const toggleMute = () => {
    setVolumeMuted((prevMuted) => !prevMuted);
    const newVolumePercent = volumeMuted ? 50 : 0;
    VolumeControls(newVolumePercent);

  };
  
   return (
    <Container>
      {deviceStatus ?
        (<Tooltip text="Device Active">
          <PiDevicesBold style={{ color: '#1ed760' }} />
        </Tooltip>
        ) : (<Tooltip text="Device Dective">
          <PiDevicesBold />
        </Tooltip>
        )}
      <Tooltip text={volumeMuted ? 'Click / Un-mute (m)' : 'Click / Mute (m)'}>
        {volumeMuted ? (
          <HiMiniSpeakerXMark onClick={() => toggleMute()} />
        ) : (
          <HiMiniSpeakerWave onClick={() => toggleMute()} />
        )
        }
      </Tooltip>
      <Tooltip text="Change Volume ( arrowup / arrowdown )">
        <input type="range" min={0} max={100} value={volumeMuted ? 0 : volume} onChange={(e) => VolumeControls(parseInt(e.target.value))} />
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
