import React, {useState} from 'react';


function Track(props) {
    const {track, modifyPlaylist, shouldAddToPlaylist} = props;

    const handleAddTrackClick = () => {
        modifyPlaylist(track);
    }

    return (
        <li>
            <p>{track.title}</p>
            <p>{track.artist} | {track.album}</p>
            <button onClick={handleAddTrackClick}>{shouldAddToPlaylist ? '+' : 'x'}</button>
        </li>
    );
}

export default Track;