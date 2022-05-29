import React, { useState } from 'react'
import { Card, Box, IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import styles from "../Styles";
//Styles
const { cardStyle, imgContainerStyle, cardSectionStyle, imgStyle,
    menuButtonStyle, sectionTitleStyle, sectionBodyStyle } = styles
/**
 * Component that displays a single search result for a movie or TV series which gets mapped onto the homepage after a successful search
 * @param {{id: Number, imdbID: String, tmdbID: String, imdbRating: String, imdbVoteCount: Number, tmdbRating: Number, 
 * originalTitle: String, countries: Array<String>, year: Number, runtime: Number, cast: Array<String>, significants: Array<String>, 
 * title: String, overview: String, tagline: Number, video: Number, age: Number, originalLanguage: String, posterUrlOriginal: String, 
 * firstAirYear: String, lastAirYear: String, episodeRuntimes: Array<String>, seasons: Number, episodes: Number, status: String}} props Media object from backend, DB entity
 * 
 * @returns Card component for single TV series or movie search result on homepage
 */
const MediaCard = (props) => {
    //extracts required variables from props
    const { posterUrlOriginal, title, year, overview, cast, significants,
        episodes, firstAirYear, lastAirYear, seasons, imdbRating, imdbVoteCount } = props
    //configures specific props to be displayable on card
    var displayOverview = getStringOfMaxSize(overview, 225);
    var displayCast = getStringOfMaxSize(mapArrtoCsvString(cast), 100);
    var displaySignificants = getStringOfMaxSize(mapArrtoCsvString(significants), 50);
    //height of single menu item for menu at right side of card (after clicking triple horizontal line icon)
    const MENU_HEIGHT = 48;
    //states for opening and closing menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    //functions that open and close menu
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    //adds media to must watch list and closes menu
    function handleAddToList() {
        console.log(title + " added to MUST WATCH LIST")
        setAnchorEl(null);
    }
    /**
     * provides functionality for the menu that is displayed upon clicking triple 
     * horizontal line icon at right side of MediaCard
     * @returns Box container with IconButton (triple horizontal line) and Menu (menu option Add to List) child components
     */
    function getMenuButton() {
        return (
            <Box sx={menuButtonStyle}>
                <IconButton
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClickMenu}
                    sx={{ margin: 1 }}
                >
                    <MenuIcon />
                </IconButton> {/*button with 3 horizontal lines used for adding media to must watch list */}
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    PaperProps={{
                        style: {
                            maxHeight: MENU_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    }}
                >
                    <MenuItem key="add-to-must-watch-list" onClick={handleAddToList}>
                        Add To List
                    </MenuItem>{/*single menu item for adding media to must watch list */}
                </Menu>{/*menu of options that appears upon clicking IconButton */}
            </Box>/*container for menu icon button on right side of search result media card */
        )
    }

    return (
        <Card raised sx={cardStyle}>
            <Box sx={imgContainerStyle}>
                <img src={posterUrlOriginal} alt="" style={imgStyle} />
            </Box>{/*Section of card with poster image of movie or TV series */}
            {getCardSection({
                title: "General Info",
                sectionInfo: [
                    {
                        label: "Title",
                        value: title
                    },
                    {
                        label: "Year",
                        value: year
                    },
                    {
                        label: "Stars",
                        value: displaySignificants
                    },
                    {
                        label: "Cast",
                        value: displayCast
                    },
                ]
            })}{/*Section of card with general info about movie or TV series */}
            {getCardSection({
                title: "Series Info",
                sectionInfo: [
                    {
                        label: "Seasons",
                        value: seasons
                    },
                    {
                        label: "Episodes",
                        value: episodes
                    },
                    {
                        label: "First Air Year",
                        value: firstAirYear
                    },
                    {
                        label: "Last Air Year",
                        value: lastAirYear
                    },
                ]
            })}{/*Section of card with details only relevant for TV series */}
            {getCardSection({
                title: "Overview",
                sectionInfo: [
                    {
                        label: "",
                        value: displayOverview
                    },

                ]
            })}{/*Section of card with overview summary of the movie or TV series */}
            {getCardSection({
                title: "IMDB Stats",
                sectionInfo: [
                    {
                        label: "IMDB Rating",
                        value: imdbRating
                    },
                    {
                        label: "IMDB Vote Count",
                        value: imdbVoteCount
                    },
                ]
            })}
            {getMenuButton()} {/*Section of card with IMDB data for the movie or TV series */}
        </Card> /*Card container for a displaying a search result, has shadow and rounded border */
    );
}
/**
 * single section of card containing data for movie or TV show
 * @param {{title: String, sectionInfo: Array<{label: String, value: String}>}} props contains the title for the section and the info to display within the section
 * @returns single section of card containing data for movie or TV show (Box container) 
 * and a Divider that divides each section with a vertical line
 */
function getCardSection(props) {
    const { title, sectionInfo } = props
    var checkData = sectionInfo.map((info) => isFieldPresent(info.value))
    if (!checkData.includes(true)) return "";
    return (
        <>
            <Box sx={cardSectionStyle}>
                <Box sx={sectionTitleStyle}>{title}</Box>{/*text title of card section */}
                <Box sx={sectionBodyStyle}>
                    {sectionInfo.map((info) => {
                        var displayLabel = info.label === "" ? ""
                            : info.label + ": "
                        return !isFieldPresent(info.value) ? ""
                            : <p key={title + info.label + info.value} style={{ margin: 2 }}><strong>{displayLabel}</strong>{info.value}</p>
                    })}
                </Box>{/*text body of card section */}
            </Box>{/*single section of card containing data for movie or TV show */}
            {/* <Divider orientation="vertical" flexItem />vertical divider separating different sections of the card */}
        </>
    )
}
/**
 * Turns an array of Strings into a single comma separated string
 * @param {Array<String>} arr any array of strings
 * @returns String containing all strings in array separated by a comma and a space
 */
function mapArrtoCsvString(arr) {
    var string = ""
    for (let i = 0; i < arr.length; i++) {
        string += arr[i];
        if (i !== arr.length - 1) {
            string += ", ";
        }
    }

    return string
}
/**
 * Decreases the size of a string to fit inside a section of the MediaCard
 * @param {String} string any string
 * @param {Number} maxSize Maximum number of characters for the string
 * @returns a String of decreased size if its number of characters exceeds maxSize
 */
function getStringOfMaxSize(string, maxSize) {
    return Array.from(string).length <= maxSize ? string
        : string.substring(0, maxSize) + "...";
}
/**
 * Determines if a variable/field is present/empty or not
 * @param {any} variable 
 * @returns true if variable is not empty, null, "", or undefined, false otherwise
 */
function isFieldPresent(variable) {
    if (variable === undefined || variable === null || variable === "" || variable.length === 0) return false;
    return true;
}

export default MediaCard;