import React from 'react'
import { useLocation } from "react-router-dom";

import { UseStateProvider } from '../utilities/StateProvider'
import styled from 'styled-components';
import { IoIosSearch } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";


function Navbar({ navBackground }) {
    const [{ userinfo }] = UseStateProvider();
    let location = useLocation();


    return (
        <Container backgroundstate={navBackground.toString()} >
            {location.pathname === '/search' ?
                <div className="header__left">
                    <IoIosSearch className="SearchIcon" />
                    <input
                        placeholder="Search for Artists, Songs, or Podcasts "
                        type="text"
                    />
                </div>
                : undefined}
            <div className="header__right">

                {userinfo ?
                    (<img alt={userinfo.name ?? "Unknown"} src={userinfo.userImg} className="avatar" />)
                    : (<RxAvatar />)
                }
                <h4>{userinfo?.name || 'User Name'}</h4>
            </div>

        </Container>
    )
}
const Container = styled.div`
 
    display: flex;
    justify-content: space-between;
     align-items: center;
    padding: 15px;
    position: sticky;
    height: 35px;
     top: 0;
     margin-bottom: 3rem;
     transition: 500ms ease-in;
     background-color: ${({ backgroundstate }) =>
        backgroundstate === "true" ? "#000000" : "none"
    };
 

.header__right {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    gap: 0.7rem;
}

.header__left {
    flex: 0.5;
    display: flex;
    background-color: white;
    padding: 10px;
    border-radius: 30px;
    color: gray;
    align-items: center;
}

.header__left>input {
    border: none;
    width: 100%;
    outline: none;
    text-indent: 6px;
    font-size: 17px;

}

.header__left>.SearchIcon {
    padding: 0px 12px;
    height: 25px;
    width: 25px
}

.header__right>h4 {
    /* margin-left: 16px; */
    font-weight: 500;
    color:white;


}

.header__right>.avatar {
    height: 34px;
    width: 34px;
    border-radius: 50%;
    border: 5px solid #3c3c4f;
}
@media only screen and (max-width:765px){
    height: 10px;
    .header__right>.avatar {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    border: 3px solid #3c3c4f;
}
.header__right>h4 {
    font-size: 12px;
    color:white;
}
.header__left>input {
     text-indent: 0px;
    font-size: 12px;

}
.header__left {
    flex: none;
     padding: 5px;
  width: 50vw;
}
 .header__left>.SearchIcon {
    padding: 0px 4px 0px 8px;
 }
}
 `
export default Navbar