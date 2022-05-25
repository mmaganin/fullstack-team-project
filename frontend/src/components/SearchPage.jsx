import MovieCard from "./MovieCard";
import React, { useState } from 'react';
import { InputLabel, FormControl, Select, MenuItem, TextField, Button, Box, Stack, Paper } from '@mui/material';

const formsContainerStyle = {
    padding: 2,
    margin: 3,
    resize: "horizontal",
    width: 1000,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}

const searchFormsStyle = {
    display: 'flex',
    alignItems: 'center'
}

const singleFormStyle = {
    width: 300,
    margin: 1
}

const countryFormItems = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "gb", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "it", label: "Italy" },
    { value: "au", label: "Australia" },
    { value: "mx", label: "Mexico" },
    { value: "br", label: "Brazil" },
    { value: "es", label: "Spain" },
    { value: "in", label: "India" },
    { value: "id", label: "Indonesia" },
    { value: "ru", label: "Russia" },
    { value: "jp", label: "Japan" },
    { value: "th", label: "Thailand" },
    { value: "kr", label: "South Korea" },
]

const serviceFormItems = [
    { value: "apple", label: "Apple TV" },
    { value: "curiosity", label: "Curiosity Stream" },
    { value: "disney", label: "Disney Plus" },
    { value: "mubi", label: "MUBI" },
    { value: "netflix", label: "Netflix" },
    { value: "prime", label: "Prime Video" },
    { value: "zee5", label: "ZEE5" }
]

const typeFormItems = [
    { value: "movie", label: "Movie" },
    { value: "series", label: "Series" },
]


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
        const fetchFrom = 'http://localhost:8080/api/search';
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

    const forms = [
        { id: "type-form", label: "Type", value: type, handleMethod: handleChangeType, formItems: typeFormItems },
        { id: "service-form", label: "Service", value: service, handleMethod: handleChangeService, formItems: serviceFormItems },
        { id: "country-form", label: "Country", value: country, handleMethod: handleChangeCountry, formItems: countryFormItems }
    ]

    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Paper elevation={3} sx={formsContainerStyle}>
                <Box sx={searchFormsStyle}>
                    {forms.map((form) => getForm(form))}
                </Box>
                <Box sx={searchFormsStyle}>
                    <TextField required sx={singleFormStyle} label="Keyword" variant="outlined" onChange={handleChangeKeyword} />
                    <Button sx={{ width: 100, height: 50 }} variant="outlined" onClick={handleSearch}>Search</Button>
                </Box>
            </Paper>
        </Box>
    );
}

function getForm(form) {
    const { id, label, value, handleMethod, formItems } = form
    return (
        <FormControl required sx={singleFormStyle}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                value={value}
                label={label}
                onChange={handleMethod}
            >
                {formItems.map((formItem) => getFormItems(formItem))}
            </Select>
        </FormControl>
    )
}

function getFormItems(formItem) {
    const { label, value } = formItem
    return (
        <MenuItem value={value}>{label}</MenuItem>
    )
}

export default Search;