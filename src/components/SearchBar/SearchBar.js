import React, {useState} from 'react';


function SearchBar(props) {
    const [search, setSearch] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleSearch(search);
        setSearch('');
    }

    const handleInputChange = ({target}) => {
        setSearch(target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Choose a song!'
                value={search}
                onChange={handleInputChange}
            />
            <button type='submit'>Find</button>
        </form>
    );
}

export default SearchBar;