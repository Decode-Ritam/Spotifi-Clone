import React from 'react';
import styled from 'styled-components';
 
function Login() {


    const handleClick = async () => {

        const clientId = process.env.REACT_APP_SPOTIFI_CLIENT_ID;

        // This change when you
        const redirect_uri = process.env.REACT_APP_SPOTIFI_APP_URI;

        const api_uri = "https://accounts.spotify.com/authorize";
        const scope = [
            "user-read-private",
            "user-read-email",
            "user-modify-playback-state",
            "user-read-playback-state",
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-top-read",
        ];
        window.location.href = `${api_uri}?client_id=${clientId}&redirect_uri=${redirect_uri}&scope=${scope.join(
            " "
        )}&response_type=token&show_dialog=true`;
    };



    return (
        <Container>
            <div className="login">
                <img
                    src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                    alt="Spotify logo"
                />
                <button onClick={handleClick}>Login With Spotify</button>
            </div>
        </Container>
    );
}

const Container = styled.div`
 
 /* ................Login css style ...............*/
.login {
    display: grid;
    background-color: black;
    height: 100vh;
    place-items: center;
}

.login>img {
    height: 200px;
}

.login>button {
    color: white;
    text-decoration: none;
    padding: 16px 30px;
        border-radius: 99px;
    font-weight: 400;
    background-color: #1db954;
    font-size: 23px;
}

@media screen and (max-width: 480px) {
    .login>img {
        height: 100px;
    }

    .login>a {
        color: white;
        text-decoration: none;
        padding: 10px;
        border-radius: 99px;
        font-weight: 200;
        background-color: #1db954;
        font-size: 13px;
    }
}
 
`;

export default Login;
