import { reducerCases } from "./Constant";

export const initialState = {
    token:false,
    playlists: [],
    userinfo: null,
    selectedPlaylist: null,
    currentPlaying: null,
    playerState: false,
    selectedPlaylistId: '37i9dQZEVXcRDbsBaGNrHK',
    selectedArtistId: '3yMmYEklQ7gLOZXEFNd3xr',
    artistPlaylist: null,
    artistDetails: null,
    tokenValidation:false,
    selectedArtistBackgroundColor:"var(--gradient-color0)",
 }
const reducer = (state, action) => {
    switch (action.type) {

        
         
        case reducerCases.SET_ARTIST_UNIQUE_COLOR:
            return {
                ...state,
                selectedArtistBackgroundColor: action.selectedArtistBackgroundColor,
            }
        case reducerCases.SET_TOKEN_VALIDATION:
            return {
                ...state,
                tokenValidation: action.tokenValidation,
            }
        case reducerCases.SET_ARTIST_DATA:
            return {
                ...state,
                artistDetails: action.artistDetails,
            }
        case reducerCases.SET_PLAY_ARTIST:
            return {
                ...state,
                artistPlaylist: action.artistPlaylist,
            }
        case reducerCases.SET_ARTIST_ID:
            return {
                ...state,
                selectedArtistId: action.selectedArtistId,
            }
        case reducerCases.SET_PLAYLIST_ID:
            return {
                ...state,
                selectedPlaylistId: action.selectedPlaylistId,
            }
        case reducerCases.SET_TOKEN:
            return {
                ...state,
                token: action.token,
            }
        case reducerCases.SET_PLALISTS:
            return {
                ...state,
                playlists: action.playlists,
            }
        case reducerCases.SET_USER:
            return {
                ...state,
                userinfo: action.userinfo,
            }
        case reducerCases.SET_PLALIST:
            return {
                ...state,
                selectedPlaylist: action.selectedPlaylist,
            }
        case reducerCases.SET_PLAYING:
            return {
                ...state,
                currentPlaying: action.currentPlaying
            }
        case reducerCases.SET_PLAYER_STATE:
            return {
                ...state,
                playerState: action.playerState
            }
        default:
            return state;
    }

}
export default reducer