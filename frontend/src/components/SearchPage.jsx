import MediaCard from "./MediaCard";
import React, { useState } from 'react';
import { InputLabel, FormControl, Select, MenuItem, TextField, Button, Box, Paper } from '@mui/material';
import styles from "../Styles";
//Styles
const {
    formsContainerStyle, searchFormsStyle, singleFormStyle, componentContainerStyle,
    homepageTitleStyle, searchButtonStyle, topOfFormMsgStyle, searchMessageStyle
} = styles
//Variables containing items to display in dropdown menus of form
//contains value and label pairs for different Country menu items 
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
//contains value and label pairs for different Service menu items 
const serviceFormItems = [
    { value: "apple", label: "Apple TV" },
    { value: "curiosity", label: "Curiosity Stream" },
    { value: "disney", label: "Disney Plus" },
    { value: "mubi", label: "MUBI" },
    { value: "netflix", label: "Netflix" },
    { value: "prime", label: "Prime Video" },
    { value: "zee5", label: "ZEE5" }
]
//contains value and label pairs for different Type menu items 
const typeFormItems = [
    { value: "movie", label: "Movie" },
    { value: "series", label: "Series" },
]
/**
 * Located at '/' path in Router component, homepage of web app where you search for movies or tv shows on different streaming services
 * @returns Search page component
 */
const SearchPage = () => {
    //states that change when user edits search forms
    const [type, setType] = useState("");
    const [service, setService] = useState("");
    const [country, setCountry] = useState("");
    const [keyword, setKeyword] = useState("");
    //states that change when user clicks Search button
    const [searchClicked, setSearchClicked] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    //method handlers that change states when modifying different search forms
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
    //array of dropdown menu form props to map into the forms section of Search page
    const forms = [
        { id: "type-form", label: "Type", value: type, handleMethod: handleChangeType, formItems: typeFormItems },
        { id: "service-form", label: "Service", value: service, handleMethod: handleChangeService, formItems: serviceFormItems },
        { id: "country-form", label: "Country", value: country, handleMethod: handleChangeCountry, formItems: countryFormItems }
    ]
    //sends POST request to fetch search results from backend after clicking Search button
    const handleSearch = () => {
        //API call requires type, service and country parameters
        if (type === "" || service === "" || country === "") {
            window.alert("You must make a selection for Type, Service, and country.")
            return;
        }
        //Regex only allows for letters, numbers or .?! inputs into keyword form
        let keywordRegex = /[a-zA-Z0-9.?!]+/.exec(keyword)
        if (keywordRegex === null || keywordRegex[0] !== keyword) {
            window.alert("Enter only letters numbers or .?! into the Keyword form.")
            return;
        }
        setSearchClicked(true)
        setFetched(false)
        var apiCallLoad = getApiCallLoad({ country, service, type, keyword })
        fetch(apiCallLoad.fetchFrom, apiCallLoad.payload)
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((searchResponse) => {
                setSearchResults(searchResponse);
                setFetched(true)
                setSearchClicked(false)
                console.log(searchResponse)
                window.alert("Search success!")
            })
            .catch((error) => {
                setFetched(false)
                setSearchClicked(false)
                window.alert("Search failed!")
                console.log("Search failed: " + error)
            })
    };
    /**
     * Generates appropriate message after attempting a search
     * @returns Box component containing String message
     */
    function getSearchMessage() {
        if (searchResults === null && !searchClicked) return "";
        var loadingMsg = "Loading... Please Wait!"
        if (searchResults !== null && searchResults.length === 0 && !searchClicked) {
            loadingMsg = "There are no results that match your search."
        }
        return (
            <Box sx={searchMessageStyle}>
                {loadingMsg}
            </Box>
        )
    }
    return (
        <Box sx={componentContainerStyle}>
            <Box sx={homepageTitleStyle}>Homepage</Box>
            <Paper elevation={3} sx={formsContainerStyle}>
                <Box sx={topOfFormMsgStyle}>
                    Search for your favorite movies and shows and see if they are available on different streaming platforms.
                </Box>
                <Box sx={searchFormsStyle}>
                    {forms.map((form) => getForm(form))}
                </Box>{/*container for drop down menu forms */}
                <Box sx={searchFormsStyle}>
                    <TextField sx={singleFormStyle} label="Keyword" variant="outlined" onChange={handleChangeKeyword} />
                    <Button sx={searchButtonStyle} variant="outlined" onClick={handleSearch}>Search</Button>
                </Box>{/*container for keyword form */}
            </Paper>{/*Container for user input forms */}
            {(!fetched && searchClicked) || searchResults === null || searchResults.length === 0
                ? getSearchMessage()
                : searchResults.map((searchResult) => getMediaCard(searchResult))}{/*mapped MediaCard search results */}
        </Box>/*Box container for SearchPage: contains title in Box, forms in Paper, and MediaCard search results */
    );
}
/**
 * Generates MediaCard component with unique key
 * @param {{id: Number, imdbID: String, tmdbID: String, imdbRating: String, imdbVoteCount: Number, tmdbRating: Number, 
 * originalTitle: String, countries: Array<String>, year: Number, runtime: Number, cast: Array<String>, significants: Array<String>, 
 * title: String, overview: String, tagline: Number, video: Number, age: Number, originalLanguage: String, posterUrlOriginal: String, 
 * firstAirYear: String, lastAirYear: String, episodeRuntimes: Array<String>, seasons: Number, episodes: Number, status: String}} searchResult 
 * @returns MediaCard component
 */
function getMediaCard(searchResult) {
    return (
        <MediaCard key={searchResult.title} {...searchResult} />
    )
}
/**
 * generates the REST API load for searching for media based on entries inputted by user into form
 * @param {{country: String, service: String, type: String, keyword: String}} props contains entries inputted into form by user
 * @returns REST API load with URI to fetch from and payload
 */
function getApiCallLoad(props) {
    const { country, service, type, keyword } = props
    var json = JSON.stringify({
        country: country, service: service, type: type, keyword: keyword
    })
    return {
        fetchFrom: 'http://localhost:8080/api/search',
        payload: {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: json
        }
    }
}
/**
 * Generates individual dropdown menu forms mapped from SearchPage component
 * @param {{ id: String, label: String, value: String, handleMethod: function, formItems: {value: String, label: String} }} form props required for dropdown menu form
 * @returns Single dropdown menu form
 */
function getForm(form) {
    const { id, label, value, handleMethod, formItems } = form
    return (
        <FormControl required key={id} sx={singleFormStyle}>
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
/**
 * Generates a single menu item of a dropdown menu, mapped from getForm function
 * @param {{label: String, value: String }} formItem 
 * @returns Single dropdown MenuItem
 */
function getFormItems(formItem) {
    const { label, value } = formItem
    return (
        <MenuItem key={value} value={value}>{label}</MenuItem>
    )
}

export default SearchPage;