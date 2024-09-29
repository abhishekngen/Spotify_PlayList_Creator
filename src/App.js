import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import { createPlaylistOnSpotify, searchTracksOnSpotify } from './Utilities/SpotifyAPIFetch';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const handleSearch = (search) => {
    searchTracksOnSpotify(search)
      .then((trackList) => {
        setSearchResults(trackList);
      })
      .catch((error) => {
        alert(error.message);
      });
  } 

  const handlePlaylistModification = (newTrack) => {
    if(playlist.includes(newTrack)) {
      setPlaylist((prevPlaylist) => {
        return prevPlaylist.filter((track) => track !== newTrack);
      });
    }
    else{
      setPlaylist((prevPlaylist) => {
        return [...prevPlaylist, newTrack];
      });
    }
  }

  const submitPlaylist = (title) => {
    const trackUris = playlist.map((track) => {
      return track.uri;
    });
    createPlaylistOnSpotify(title, trackUris)
      .then((v) => {
        setPlaylist([]);
        alert(`${title} playlist created successfully!`);
      })
      .catch((error) => alert(error.message));
  }

  return (
    <div>
      <header className='App'>
        <h1 className='App'>Playlist Creator</h1>
      </header>
      <main className='App'>
        <SearchBar handleSearch={handleSearch}></SearchBar>
        <SearchResults searchResults={searchResults.filter((track) => !playlist.includes(track))} addToPlaylist={handlePlaylistModification}></SearchResults>
        <Playlist playlist={playlist} removeFromPlaylist={handlePlaylistModification} submitPlaylist={submitPlaylist}></Playlist>
      </main>
    </div>
  );
}

export default App;
