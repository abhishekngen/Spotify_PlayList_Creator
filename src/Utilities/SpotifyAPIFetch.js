const apiKey = 'BQBXiA9VII6rpjEubpmHcwFCM7rieFrBblX1wbT-fRITYC6G7dG3PkvbcH9T8I7aqOBqifHPirfL_WIlXDrMkMmZNdPcRQNZ0C-hUgZh6Krsg1atZgQdN6IJ0_mSSEqD5VBXlDPZ80rmwUCQmdidyQs-wBjnlwatDCS4cAIpjFwmoPZqYGMdIMRvB1fHZoyRgzzmiK81_ia-0XdaFC-IbPI8fG3K2JQhPtBhFfxOlUIlDpyTHi5girIx_DkAYAPGOn52nJBk';

const searchTracksOnSpotify = async (search) => {
    const searchRequestEndpoint = 'https://api.spotify.com/v1/search';
    const params = `?q=${search}&type=track`;

    try {
        const response = await fetch(searchRequestEndpoint + params,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${apiKey}`
                }
            }
        );
        if(response.ok) {
            const jsonResponse = await response.json();
            const trackList = jsonResponse.tracks.items.map((track) => {
                return {
                    id: track.id,
                    uri: track.uri,
                    title: track.name,
                    artist: track.artists.length > 0 ? track.artists[0].name : 'Unknown',
                    album: track.album.name 
                }
            });
            return trackList;
        }
        else{
            throw new Error(response);
        }
    } catch(error) {
        throw error;
    }
};
const createPlaylistOnSpotify = async (title, tracks) => {
    let playlistId;
    const createPlaylistEndpoint = 'https://api.spotify.com/v1/users/abhishek.mani/playlists';
    try {
        const playlistCreationResponse = await fetch(createPlaylistEndpoint,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`
                },
                body: JSON.stringify(
                    {name: title}
                )
            }
        );
        if(!playlistCreationResponse.ok) {
            console.log(playlistCreationResponse);
            throw new Error(playlistCreationResponse);
        }
        else{
            const jsonResponse = await playlistCreationResponse.json();
            console.log(jsonResponse);
            playlistId = jsonResponse.id;
        }
        
        const addTracksToPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
        const playlistAdditionResponse = await fetch(addTracksToPlaylistEndpoint,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    uris: tracks
                })
            }
        );
        console.log(playlistAdditionResponse);
        if(!playlistAdditionResponse.ok) {
            throw new Error(playlistAdditionResponse);
        }
    } catch(error) {
        throw error;
    }
};
export {searchTracksOnSpotify, createPlaylistOnSpotify};