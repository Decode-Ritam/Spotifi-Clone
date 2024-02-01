import React, { useState } from 'react'
import Tooltip from './TooltipFile';
import { Link, useLocation } from "react-router-dom";

import styled from 'styled-components'
import { IoMdHome } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { PiPlaylistFill } from "react-icons/pi";
import PlayListComponent from './PlayListComponent';

function Sidebar() {
    const [spotifiIcon, setspotifiIcon] = useState(true)
    const [bodyTitle, setbodyTitle] = useState(null);
    let location = useLocation();

    const titlebarRouteset = (route) => {
        setbodyTitle(route)
    }

    if (bodyTitle) {
        document.title = `Spotifi- ${bodyTitle}`;

    }


    function getData(data) {
        setspotifiIcon(data)
    }

    const stylecss = { top: '35px', left: '70px', fontSize: "16px", padding: '4px 8px', background: '#ffffffc3', color: 'black' }
    const stylecssOpacity = { opacity: '0' }

    return (
        <Container>
            <div className="top__links">
                <div className="logo1"  >
                    <img alt='img' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9UlEQVR4nO1ZWYhcVRB9QYm7mLjhvuJHFAUlSfet132qZzLj4C46uBCJ/khUFIMbkfgjuEaMOzif4o/4pwkxUUMUBKOg+dIkThxNHDNmuup1RgkuE1vqdSfT9Pper4OkoODR9F3OrVN1q+p63mH5nwqmcEoyi1tJ8CopNpDgJycckHLeNPy235Q32n98wbA/5Z/qzQZJ7EocQ8rLSHgTCQ4c3HRktTHCm1yAu20ur9ty1fh1xzrhx0kxEXvzNRUTvvATNndXQDjN3EDCY+0DUG4lHrM1OgYAYzi6wP8OAShTJ/zOwJ6B49oKIrU3dYYTbO0WCDoEBlvd5JIz2wLCz/Vf6IR/7DYIKqFaIoeLWwKR/H3gNCe8o2cgtGgZ5V0pSZ3TfGgV/qbXIGjGMt82FaJJeaTnm9cKHYkFIql87SzYdL66pq+PTCkn2Nn7DXNVdYqfI4VlEjza681SIzCCxxpeek7510YnQop1TvG8r3y/mToV9F1pYXrxRN/pfs6f5+W9OcjjSPtelMXZLpe5yGk6lQxwDwmecYr3LJA44X+aswrvqev4TrG09inwh227nIpiFEkG3E+KF5xie0xAy+oA4Y21BiayfWd5HRbSzBVO8CYp9kWg1ydVJzEaOMF0rYFNX0hNiJt0J5BiVWk9U6GCA4nc4PxKIAFuqn8KWJsKUhfYbU8K3wmWO+E1pPw+Kb4oRDpMOGEl4X+N/+G38m5SbAuLLeW3SPgRy24tf2sEyM/588wfa1oly7dUnoLipa5HIMGoUcllM4MWHLwqQrrk3Dp+u6bKgNrIu6MYd8JPW+SLCoQUH1VaZBYkh1QI73844WctnIeZt/LHtS2CnZUWEWRjLDhFgs/MtE5xX5jSSObSxQHON14vyA/PHc4PH2Hf5lP+3v5LjD6k/AAJvxbW+Mr722DFXDUgf0U7MX6uFp/jyFB+6KjCHcIjxaAQ33qCabt8y6iFP6MMXpQdOtHrSDMDy835WwYSlVpOMteUjrOQ7IJ0xlo61gUxixl9nOJtJ3jFUhlSrLRQmRRcZpaoBWhBfniuy2KFUaZpasVIEfY74Q+cYHP0BUtU+G9zYKd4MKmZ86oBogAcbS6MVg5WrG3d+ZpQwaflVk7kBudH9Nf1VSzCq3sCZIbvm5OaSS/c13+y0TLiuJerAbmxiQ1MFSyJVdb39bXvcrvAEOAkm9PCr/kQZZHwJXNvmBAKf20pTFsOIEjfXAHEFq+XNFYqVjYbhi0BpQAPO8WXLVhwOqx9qolxLupE+A3He20QX5hI+PP4YLCh5qSkmTsjn4jyk2FhNJleaBktCd4NaVPIdnMhfQTZMPUxh1Ze7YRvs+eHioXz3hyzMMWxiGJpTSAW40nxS2ed2spbbPAVd5VSs1CDcFRrjFtZXtfUxt1OAik71e3GgmLd8VTkcVmsaMjZolW2dQtMbBWMNrTGQUkKX93zDWt19QVDXhxxwq/3etNUTinBG7FAlFBsS683TzP6Vb2Es65YqJwV/iIYLS+BY4tlqD0tg4V/sDSnJRCHwBRaQD2gGbbY2l47JfQZewxtV8IX4TE00cm3d2sidJJqTniHreF1Q8LGgfJDhbyqbSB225xNR6ZWxGrspOD28JmhiSeCYt61zhfc0RMA1cS6K/ZWQsovWk1Pyt+FDQ1rMxXUmhvf2/OE/cf+24mOzGHxZon8BzFwBexK3+dTAAAAAElFTkSuQmCC"></img>
                </div>
                <div className="logo">
                    {spotifiIcon ?
                        (<img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                            alt="spotify" />)
                        : (<img alt='img' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9UlEQVR4nO1ZWYhcVRB9QYm7mLjhvuJHFAUlSfet132qZzLj4C46uBCJ/khUFIMbkfgjuEaMOzif4o/4pwkxUUMUBKOg+dIkThxNHDNmuup1RgkuE1vqdSfT9Pper4OkoODR9F3OrVN1q+p63mH5nwqmcEoyi1tJ8CopNpDgJycckHLeNPy235Q32n98wbA/5Z/qzQZJ7EocQ8rLSHgTCQ4c3HRktTHCm1yAu20ur9ty1fh1xzrhx0kxEXvzNRUTvvATNndXQDjN3EDCY+0DUG4lHrM1OgYAYzi6wP8OAShTJ/zOwJ6B49oKIrU3dYYTbO0WCDoEBlvd5JIz2wLCz/Vf6IR/7DYIKqFaIoeLWwKR/H3gNCe8o2cgtGgZ5V0pSZ3TfGgV/qbXIGjGMt82FaJJeaTnm9cKHYkFIql87SzYdL66pq+PTCkn2Nn7DXNVdYqfI4VlEjza681SIzCCxxpeek7510YnQop1TvG8r3y/mToV9F1pYXrxRN/pfs6f5+W9OcjjSPtelMXZLpe5yGk6lQxwDwmecYr3LJA44X+aswrvqev4TrG09inwh227nIpiFEkG3E+KF5xie0xAy+oA4Y21BiayfWd5HRbSzBVO8CYp9kWg1ydVJzEaOMF0rYFNX0hNiJt0J5BiVWk9U6GCA4nc4PxKIAFuqn8KWJsKUhfYbU8K3wmWO+E1pPw+Kb4oRDpMOGEl4X+N/+G38m5SbAuLLeW3SPgRy24tf2sEyM/588wfa1oly7dUnoLipa5HIMGoUcllM4MWHLwqQrrk3Dp+u6bKgNrIu6MYd8JPW+SLCoQUH1VaZBYkh1QI73844WctnIeZt/LHtS2CnZUWEWRjLDhFgs/MtE5xX5jSSObSxQHON14vyA/PHc4PH2Hf5lP+3v5LjD6k/AAJvxbW+Mr722DFXDUgf0U7MX6uFp/jyFB+6KjCHcIjxaAQ33qCabt8y6iFP6MMXpQdOtHrSDMDy835WwYSlVpOMteUjrOQ7IJ0xlo61gUxixl9nOJtJ3jFUhlSrLRQmRRcZpaoBWhBfniuy2KFUaZpasVIEfY74Q+cYHP0BUtU+G9zYKd4MKmZ86oBogAcbS6MVg5WrG3d+ZpQwaflVk7kBudH9Nf1VSzCq3sCZIbvm5OaSS/c13+y0TLiuJerAbmxiQ1MFSyJVdb39bXvcrvAEOAkm9PCr/kQZZHwJXNvmBAKf20pTFsOIEjfXAHEFq+XNFYqVjYbhi0BpQAPO8WXLVhwOqx9qolxLupE+A3He20QX5hI+PP4YLCh5qSkmTsjn4jyk2FhNJleaBktCd4NaVPIdnMhfQTZMPUxh1Ze7YRvs+eHioXz3hyzMMWxiGJpTSAW40nxS2ed2spbbPAVd5VSs1CDcFRrjFtZXtfUxt1OAik71e3GgmLd8VTkcVmsaMjZolW2dQtMbBWMNrTGQUkKX93zDWt19QVDXhxxwq/3etNUTinBG7FAlFBsS683TzP6Vb2Es65YqJwV/iIYLS+BY4tlqD0tg4V/sDSnJRCHwBRaQD2gGbbY2l47JfQZewxtV8IX4TE00cm3d2sidJJqTniHreF1Q8LGgfJDhbyqbSB225xNR6ZWxGrspOD28JmhiSeCYt61zhfc0RMA1cS6K/ZWQsovWk1Pyt+FDQ1rMxXUmhvf2/OE/cf+24mOzGHxZon8BzFwBexK3+dTAAAAAElFTkSuQmCC"></img>)
                    }
                </div>
                <ul>
                    <Tooltip text={spotifiIcon ? undefined : "Home"} customTextStyle={spotifiIcon ? stylecssOpacity : stylecss}>
                        <li className='listoficons' onClick={() => titlebarRouteset('Home')} ><Link to="/"  style={{ cursor: 'no-drop' }} className={`listofItems ${location.pathname === '/' ? "active" : ""}`}  ><IoMdHome /><span>Home</span></Link></li>
                    </Tooltip>
                    <Tooltip text={spotifiIcon ? undefined : "Search"} customTextStyle={spotifiIcon ? stylecssOpacity : stylecss}>
                        <li className='listoficons' onClick={() => titlebarRouteset('Search')} ><Link to="/search " style={{ cursor: 'no-drop' }} className={`listofItems ${location.pathname === '/search' ? "active" : ""}`}  ><IoIosSearch /><span>Search</span></Link></li>
                    </Tooltip>
                    <Tooltip text={spotifiIcon ? undefined : "Playlist"} customTextStyle={spotifiIcon ? stylecssOpacity : stylecss}>
                        <li className='listoficons' onClick={() => titlebarRouteset('Playlist')} ><Link to="/playlist " className={`listofItems ${location.pathname === '/playlist' ? "active" : ""}`}  ><PiPlaylistFill /><span>Playlist</span></Link></li>
                    </Tooltip>
                    <Tooltip text={spotifiIcon ? undefined : "Artists"} customTextStyle={spotifiIcon ? stylecssOpacity : stylecss}>
                        <li className='listoficons' onClick={() => titlebarRouteset('Artists')} ><Link to="/artists " className={`listofItems ${location.pathname === '/artists' ? "active" : ""}`}  ><PiMicrophoneStageFill /><span>Artists</span></Link></li>
                    </Tooltip>
                </ul>
            </div>
            <PlayListComponent getData={getData} />
        </Container>
    )
}
const Container = styled.div`
   color: white;
   background:black;
   display: flex;
   flex-direction: column;
   height: 100%;
   width: 100%;
  

.top__links{
  display: flex;
  flex-direction: column;
  border: 10px solid black;
  border-radius: 19px;
    background: #2a2a2a; 
    .logo1{
        display: none;
    }
     .logo{
   text-align: left;
   margin: 1rem 0;
  }
  img{
    max-inline-size: 53%;
    block-size: auto;
    padding: 0 1rem;
  }

ul{
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    li{
        a{
         text-decoration: none;
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 200ms color ease-in;
        color: gray;
        font-size: 1.7rem;
        &:hover{
            color: white;
        }
       }
    }
}
 
}
/* This is Responsive style */

@media only screen and (max-width:1170px){
    .top__links{
         ul{
            padding: 1rem 0;
             li{
                  a{
               font-size: 1rem;
                }
            }
        }
    }
 }
@media only screen and (max-width:1120px){
    .listofItems span{
    display: none;
  }

.listoficons{
    justify-content: center;
   }
.top__links{
    img{
        padding: 0;
    }
    .logo{
    display: none;
   }
   .logo1{
    display: flex;
    align-items: center;
    justify-content: center;
    
   }
}

}
@media only screen and (max-width:734px){
 .top__links{
   border: 3px solid black;
 
 }
.top__links .logo1 {
     padding-top: 12px;
 }
}
`


export default Sidebar