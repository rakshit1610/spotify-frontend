import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import './App.css';
import SpotifyLogo from "./assets/SpotifyLogo";

import HomeIcon from "@material-ui/icons/Home";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SearchIcon from "@material-ui/icons/Search";
import Chip from '@material-ui/core/Chip';
import { Avatar } from "@material-ui/core";


import AlbumCard from "./components/AlbumCard";
import { data } from "./spotify";
import SettingsIcon from "@material-ui/icons/Settings";
import Header from './components/Header'

const spotifyApi = new SpotifyWebApi({
  clientId: "a66eca645e8847fbbb3934715b898a9a",
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [redirect, setRedirect] = useState("home")
  const [playlist, setPlaylist] = useState("")
  const [currentlistinfo, setCurrentlistinfo] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playlistResults, setPlaylistResults] = useState([])
  const [firstcat, setFirstcat] = useState([])
  const [secondcat, setSecondcat] = useState([])
  const [thirdcat, setThirdcat] = useState([])
  const [fourthcat, setFourthcat] = useState([])
  const [fifthcat, setFifthcat] = useState([])
  const [sixthcat, setSixthcat] = useState([])
  const [likedSongs, setLikedSongs] = useState([])
  const [playingTrack, setPlayingTrack] = useState("")
  const [lyrics, setLyrics] = useState("")
  const [userinfo, setUserInfo] = useState("")
  const [header, setHeader] = useState("")

useEffect(()=>{
// user details
spotifyApi.getMe()
  .then(function(data) {
    console.log('Some information about the authenticated user', data.body);
    setHeader({
      image: data.body.images[0].url ,
      name: data.body.display_name
    })
  }, function(err) {
    console.log('Something went wrong!', err);
  });


  // first playlist
  spotifyApi.getPlaylistsForCategory('pop', {
    country: 'IN',
    limit : 8,
    offset : 0
  })
.then(function(res) {
  console.log(res.body.playlists.items);

  setFirstcat(
    res.body.playlists.items.map(playlist => {
      return {
        name: playlist.name,
        description: playlist.description,
        id: playlist.id,
        image: playlist.images[0].url,
      }
    }
  ))



}, function(err) {
  console.log("Something went wrong!", err);
});

// second playlist
spotifyApi.getPlaylistsForCategory('at_home', {
  country: 'IN',
  limit : 8,
  offset : 0
})
.then(function(res) {
console.log(res.body.playlists.items);

setSecondcat(
  res.body.playlists.items.map(playlist => {
    return {
      name: playlist.name,
      description: playlist.description,
      id: playlist.id,
      image: playlist.images[0].url,
    }
  }
))



}, function(err) {
console.log("Something went wrong!", err);
});

// third playlist
spotifyApi.getPlaylistsForCategory('mood', {
  country: 'IN',
  limit : 8,
  offset : 0
})
.then(function(res) {
console.log(res.body.playlists.items);

setThirdcat(
  res.body.playlists.items.map(playlist => {
    return {
      name: playlist.name,
      description: playlist.description,
      id: playlist.id,
      image: playlist.images[0].url,
    }
  }
))



}, function(err) {
console.log("Something went wrong!", err);
});

// fourth playlist
spotifyApi.getPlaylistsForCategory('equal', {
  country: 'IN',
  limit : 8,
  offset : 0
})
.then(function(res) {
console.log(res.body.playlists.items);

setFourthcat(
  res.body.playlists.items.map(playlist => {
    return {
      name: playlist.name,
      description: playlist.description,
      id: playlist.id,
      image: playlist.images[0].url,
    }
  }
))



}, function(err) {
console.log("Something went wrong!", err);
});

// fifth playlist
spotifyApi.getPlaylistsForCategory('bollywood', {
  country: 'IN',
  limit : 8,
  offset : 0
})
.then(function(res) {
console.log(res.body.playlists.items);

setFifthcat(
  res.body.playlists.items.map(playlist => {
    return {
      name: playlist.name,
      description: playlist.description,
      id: playlist.id,
      image: playlist.images[0].url,
    }
  }
))



}, function(err) {
console.log("Something went wrong!", err);
});

//  sixth playlist
spotifyApi.getPlaylistsForCategory('toplists', {
  country: 'IN',
  limit : 8,
  offset : 0
})
.then(function(res) {
console.log(res.body.playlists.items);

setSixthcat(
  res.body.playlists.items.map(playlist => {
    return {
      name: playlist.name,
      description: playlist.description,
      id: playlist.id,
      image: playlist.images[0].url,
    }
  }
))



}, function(err) {
console.log("Something went wrong!", err);
});

},[userinfo])

useEffect(() => {
  const timer = setTimeout(() => {
    console.log('This will run after 10 second!')
    setUserInfo("change")
  }, 15000);
  return () => clearTimeout(timer);
}, []);

  // liked fetch start
  useEffect(()=>{
    // if (!playlist) return
    spotifyApi.getMySavedTracks({
      limit : 30,
      offset: 1
    })
    .then(function(res) {
      // console.log('Done!', res.body.items[0].track.album.images);

      // 
      setLikedSongs(
        res.body.items.map(track => {
          const smallestAlbumImage = track.track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.track.album.images[0]
          )

          return {
            artist: track.track.artists[0].name,
            title: track.track.name,
            uri: track.track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
      

    }, function(err) {
      console.log('Something went wrong!', err);
    });
  },[redirect])

  // liked fetch end

  // fetch playlist start
useEffect(()=>{
  // if (!playlist) return

  spotifyApi.getPlaylist(playlist)
  .then(function(res) {
    console.log(res.body)
    setCurrentlistinfo({
      img: res.body.images[0].url,
      name: res.body.name,
      description: res.body.description
    })
    // 
    setPlaylistResults(
      res.body.tracks.items.map(track => {
        const smallestAlbumImage = track.track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image
            return smallest
          },
          track.track.album.images[0]
        )

        return {
          artist: track.track.artists[0].name,
          title: track.track.name,
          uri: track.track.uri,
          albumUrl: smallestAlbumImage.url,
        }
      }))
// 
  }, function(err) {
    console.log('Something went wrong!', err);
  });

}, [playlist])
  // fetch playlist end

  function chooseTrack(track) {
    // console.log(track)
    setPlayingTrack(track)
    // setSearch("")
    setLyrics("")
  }

  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("https://spotify-backend-node.herokuapp.com/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      console.log(res.body)
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])

  const redirectHandle=(place)=>{
    console.log(firstcat)
    if(place==="home"){
      setPlaylistResults([])
      setCurrentlistinfo("")
      setPlaylist("iop")
    }
    setRedirect(place);
  }

  const playlistHandle=(id)=>{
    console.log("hi", id)
    setPlaylist(id);
    setRedirect("playlist")
  }

  return (
<>
<div className="app__container">
<div className="sidebar__container" >
      <SpotifyLogo />
    {/* rows start */}

    {redirect==="home"? <div className="sidebar__row_ac" onClick={(place)=>redirectHandle("home")}>
        <div className="sidebar__row__icon">
          <HomeIcon />
        </div>
        <div className="sidebar__row__label">Home</div>
      </div> :
      <div className="sidebar__row" onClick={(place)=>redirectHandle("home")}>
      <div className="sidebar__row__icon">
        <HomeIcon />
      </div>
      <div className="sidebar__row__label">Home</div>
    </div>
      }      

    {redirect==="search" ?
    <div className="sidebar__row_ac" onClick={(place)=>redirectHandle("search")}>
    <div className="sidebar__row__icon">
      <SearchIcon />
    </div>
    <div className="sidebar__row__label">Search</div>
  </div> :
    <div className="sidebar__row" onClick={(place)=>redirectHandle("search")}>
    <div className="sidebar__row__icon">
      <SearchIcon />
    </div>
    <div className="sidebar__row__label">Search</div>
  </div>
    }

{redirect==="library" ?
<div className="sidebar__row_ac" onClick={(place)=>redirectHandle("library")}>
        <div className="sidebar__row__icon">
          <LibraryBooksIcon />
        </div>
        <div className="sidebar__row__label">Library</div>
      </div> :
      <div className="sidebar__row" onClick={(place)=>redirectHandle("library")}>
      <div className="sidebar__row__icon">
        <LibraryBooksIcon />
      </div>
      <div className="sidebar__row__label">Library</div>
    </div>
}

      
      
    {/* rows end */}
      
    </div>

        <div className="view__container" style={{ minHeight: "100vh" }}>
          <Header image={header.image} name={header.name} />

          <div className="chip__container" style={{ marginBottom: "30px" }}>
      {redirect==="home"?
      <Chip size="small" avatar={<HomeIcon style={{color:"black" }} />} label="Home" onClick={(place)=>redirectHandle("home")} style={{ background:"#fff", color:"black", marginRight:"10px" }} />
      : 
      <Chip size="small" avatar={<HomeIcon style={{color:"white" }} />} label="Home" onClick={(place)=>redirectHandle("home")} style={{ background:"#2E2E2E", color:"white", marginRight:"10px" }} />
    }

{redirect==="search"?
      <Chip size="small" avatar={<SearchIcon style={{color:"black" }} />} label="Search" onClick={(place)=>redirectHandle("search")} style={{ background:"#fff", color:"black", marginRight:"10px" }} />
      : 
      <Chip size="small" avatar={<SearchIcon style={{color:"white" }}/>} label="Search" onClick={(place)=>redirectHandle("search")} style={{ background:"#2E2E2E", color:"white", marginRight:"10px"  }} />
    }

{redirect==="library"?
      <Chip size="small" avatar={<LibraryBooksIcon style={{color:"black" }} />} label="Library" onClick={(place)=>redirectHandle("library")} style={{ background:"#fff", color:"black", marginRight:"10px" }} />
      : 
      <Chip size="small" avatar={<LibraryBooksIcon style={{color:"white" }}/>} label="Library" onClick={(place)=>redirectHandle("library")} style={{ background:"#2E2E2E", color:"white", marginRight:"10px"  }} />

    }

    
      </div>
        

    {redirect==="home" ?<>
      {/* <button onClick={(id)=>playlistHandle("5ieJqeLJjjI8iJWaxeBLuK")}>playlist 1</button>
      <button onClick={(id)=>playlistHandle("37i9dQZF1DXcBWIGoYBM5M")}>playlist 2</button> */}

{/* mainview start  */}
<div className="main__row__container">
      {/* <div className="settings--icon">
        <SettingsIcon
          style={{
            float: "right",
            fontSize: 35,
            color: "#fff",
          }}
          className="settings--icon"
        />
      </div> */}
      {/* first playlist */}
      <h4 style={{ color: "#fff" }}>Pop</h4>
      <div className="d-flex data-row">
          {firstcat.map((card) => {
            return (
              <div onClick={(id)=>playlistHandle(card?.id)}>
              <AlbumCard
                key={card.image}
                label={card.name}
                description={card.description}
                image={card.image}
              />
              </div>
            );
          })}
        </div>

      {/* second playlist */}
      <h4 style={{ color: "#fff" }}>At Home</h4>
      <div className="d-flex data-row">
          {secondcat.map((card) => {
            return (
              <div onClick={(id)=>playlistHandle(card?.id)}>
              <AlbumCard
                key={card.image}
                label={card.name}
                description={card.description}
                image={card.image}
              />
              </div>
            );
          })}
        </div>
      {/* third playlist */}
      <h4 style={{color: "#fff" }}>Mood</h4>
      <div className="d-flex data-row">
          {thirdcat.map((card) => {
            return (
              <div onClick={(id)=>playlistHandle(card?.id)}>
              <AlbumCard
                key={card.image}
                label={card.name}
                description={card.description}
                image={card.image}
              />
              </div>
            );
          })}
        </div>
      {/* fourth playlist */}
      <h4 style={{color: "#fff" }}>Equal</h4>
      <div className="d-flex data-row">
          {fourthcat.map((card) => {
            return (
              <div onClick={(id)=>playlistHandle(card?.id)}>
              <AlbumCard
                key={card.image}
                label={card.name}
                description={card.description}
                image={card.image}
              />
              </div>
            );
          })}
        </div>
      {/* fifth playlist */}
      <h4 style={{color: "#fff" }}>Bollywood</h4>
      <div className="d-flex data-row">
          {fifthcat.map((card) => {
            return (
              <div onClick={(id)=>playlistHandle(card?.id)}>
              <AlbumCard
                key={card.image}
                label={card.name}
                description={card.description}
                image={card.image}
              />
              </div>
            );
          })}
        </div>
      {/* sixth playlist */}
      <h4 style={{ color: "#fff" }}>Buzz</h4>
      <div className="d-flex data-row">
          {sixthcat.map((card) => {
            return (
              <div onClick={(id)=>playlistHandle(card?.id)}>
              <AlbumCard
                key={card.image}
                label={card.name}
                description={card.description}
                image={card.image}
              />
              </div>
            );
          })}
        </div>
    </div>
      {/* mainview end  */}

    </>: null }

    {redirect==="playlist" ?<Container className="d-flex flex-column py-2" style={{ minHeight: "100vh" }}>
      <div className="playwrap">
      <div className="pickgradient">
      <img src={currentlistinfo.img} className="playlistimg"/>
</div>

      <div className="fontdiv">
      <h4 className="playname" >{currentlistinfo.name}</h4>
      <p>{currentlistinfo.description}</p>
      </div>
      </div>
        {playlistResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {/* {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )} */}
      {/* </div> */}
    </Container>: null }

    {redirect==="library" ?<>
    <h4 style={{color: "#fff" }}>My Library</h4>
      {/* <div className="flex-grow-1 my-2 hidescroll" style={{ overflowY: "auto", height: "100vh"  }}> */}
        {likedSongs.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {/* {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )} */}
      {/* </div> */}
    </>: null }

    {redirect==="search" ?
    
    <Container className="d-flex flex-column py-2 hidescroll" style={{ minHeight: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {/* <div className="flex-grow-1 my-2 hidescroll" style={{ overflowY: "auto" }}> */}
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {/* {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" , color:"#fff", marginTop:"30px" }}>
            {lyrics}
          </div>
        )} */}
      {/* </div> */}
      <div>
      </div>
    </Container>
    : null }

</div>
      </div>

<Player className="player__footer" accessToken={accessToken} trackUri={playingTrack?.uri} />









    
    </>
  )
}
