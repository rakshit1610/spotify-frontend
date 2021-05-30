import React from "react"
import { Container } from "react-bootstrap"
import SpotifyLogo from "./assets/BigSpotify";


const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=a66eca645e8847fbbb3934715b898a9a&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return ( 
<div className="login">
      < SpotifyLogo className="spotlogo" />
      <a href={AUTH_URL}>LOGIN TO SPOTIFY</a>
    </div>
  )
}


