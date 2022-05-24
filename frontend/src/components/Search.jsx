import MovieCard from "./MovieCard";
import React, { useState } from 'react';
import { InputLabel, FormControl, Select, MenuItem, TextField, Button } from '@mui/material';


const Search = () => {
    const [type, setType] = useState('');
    const [service, setService] = useState('');
    const [country, setCountry] = useState('');
    const [keyword, setKeyword] = useState('');

    const [searchResults, setSearchResults] = useState(null);

    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    const handleChangeService = (event) => {
        setService(event.target.value);
    };

    const handleChangeCountry = (event) => {
        setCountry(event.target.value);
    };

    const handleChangeKeyword = (event) => {
        setKeyword(event.target.value);
    };

    const handleSearch = () => {
        var json = JSON.stringify({
			country: country, service: service, type: type, keyword: keyword
		})
        console.log(json)
        const fetchFrom = 'http://localhost:8080/api/media/search';
		const payload = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json",
			},
            body: json
		}
        fetch(fetchFrom, payload)
		.then(response => {
			if (!response.ok) throw new Error(response.status);
			else return response.json();
		})
		.then((searchResponse) => {
			setSearchResults(searchResponse);
            console.log(searchResponse)
			window.alert("Search success!")
		})
		.catch((error) => {
			window.alert("Search failed!")
			console.log("Search failed: " + error)
		})
    };

    return (
        <div>
            <FormControl >
                <InputLabel id="type-form">Type</InputLabel>
                <Select
                    labelId="type-form"
                    value={type}
                    label="Type"
                    onChange={handleChangeType}
                >
                    <MenuItem value={"movie"}>Movie</MenuItem>
                    <MenuItem value={"series"}>Series</MenuItem>
                </Select>
            </FormControl>
            <FormControl >
                <InputLabel id="service-form">Service</InputLabel>
                <Select
                    labelId="service-form"
                    value={service}
                    label="Service"
                    onChange={handleChangeService}
                >
                    <MenuItem value={"netflix"}>Netflix</MenuItem>
                    <MenuItem value={"prime"}>Amazon Prime</MenuItem>
                    <MenuItem value={"disney"}>Disney Plus</MenuItem>
                    <MenuItem value={"hbo"}>Hbo</MenuItem>
                    <MenuItem value={"hulu"}>Hulu</MenuItem>
                    <MenuItem value={"peacock"}>Peacock</MenuItem>
                    <MenuItem value={"paramount"}>Paramount</MenuItem>
                    <MenuItem value={"starz"}>Starz</MenuItem>
                    <MenuItem value={"showtime"}>Showtime</MenuItem>
                    <MenuItem value={"apple"}>Apple</MenuItem>
                    <MenuItem value={"mubi"}>Mubi</MenuItem>
                </Select>
            </FormControl>
            <FormControl >
                <InputLabel id="country-form">Country</InputLabel>
                <Select
                    labelId="country-form"
                    value={country}
                    label="Country"
                    onChange={handleChangeCountry}
                >
                    <MenuItem value={"us"}>United States</MenuItem>
                    
                </Select>
            </FormControl>
            <TextField label="Keyword" variant="outlined" onChange={handleChangeKeyword}/>
            <Button variant="outlined" onClick={handleSearch}>Search</Button>
        </div>
    );
}

export default Search;