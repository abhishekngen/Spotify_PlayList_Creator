import React, {useState} from 'react';
import Track from '../Track/Track.js';

function TrackList(props) {
    const {trackList, modifyPlaylist, shouldAddToPlaylist} = props;

    return (
        <ul>
            {
                trackList.map((track) => {
                    return <Track key={track.id} track={track} modifyPlaylist={modifyPlaylist} shouldAddToPlaylist={shouldAddToPlaylist}></Track>
                })
            }
        </ul>
    );
}

export default TrackList;