import React from 'react';
import TextField from '@material-ui/core/TextField';
export default function SearchBar(props){

    const handleFilterTextChange = (e) => {
        props.filterTextChange(e.target.value);
    }

    const handleCurrentOnlyChange = (e) => {
        props.currentOnlyChange(e.target.value);
    }

    return(
            <TextField
                id="search"
                type="search"
                label="Search..."
                value={props.filterText}
                onChange={handleFilterTextChange}
            />
    );
}