import React, {useState} from 'react';
import Track from '../Track/Track.js';
import TrackList from '../TrackList/TrackList.js';

function SearchResults(props) {
    const {searchResults, addToPlaylist} = props;

    return (
        <div>
            <h1>Search Results:</h1>
            <TrackList trackList={searchResults} modifyPlaylist={addToPlaylist} shouldAddToPlaylist={true} />
        </div>
    );
}

export default SearchResults;