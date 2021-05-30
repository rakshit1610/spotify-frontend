import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null
  return (
    <SpotifyPlayer
    styles={{
      activeColor: '#1cb954',
      bgColor: '#000',
      color: '#fff',
      loaderColor: '#fff',
      sliderColor: '#1cb954',
      sliderHandleColor: '#fff',
      trackArtistColor: '#282828',
      trackNameColor: '#fff',
    }}
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  )
}




