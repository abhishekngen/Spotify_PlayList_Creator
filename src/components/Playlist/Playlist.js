import React, {useState} from 'react';
import Track from '../Track/Track.js';
import TrackList from '../TrackList/TrackList.js';

function Playlist(props) {
    const {playlist, removeFromPlaylist, submitPlaylist} = props;
    const [playlistTitle, setPlaylistTitle] = useState('');

    const handleInputChange = ({target}) => {
        setPlaylistTitle(target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitPlaylist(playlistTitle);
        setPlaylistTitle('');
    }

    return (
        <div>
            <h1>Playlist:</h1>
            <input
                    type='text'
                    placeholder='Name your playlist!'
                    value={playlistTitle}
                    onChange={handleInputChange}
            />
            <form onSubmit={handleSubmit}>
                <TrackList trackList={playlist} modifyPlaylist={removeFromPlaylist} shouldAddToPlaylist={false} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Playlist;