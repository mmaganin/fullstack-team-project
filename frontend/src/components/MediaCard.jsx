import React, { useState } from 'react'
import { Card, Box, Divider, IconButton, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

const cardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    height: 200,
    width: 1200,
    margin: 2,
}

const imgContainerStyle = { 
    minWidth: 145, width: 145, marginTop: 'auto', marginBottom: 'auto' 
}

const imgStyle = {
    width: '100%',
    height: 'auto',
}

const cardSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 200,
    width: '100%',
    marginLeft: 2,
    marginRight: 2,
}

const menuButtonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const sectionTitleStyle = { 
    typography: 'subtitle2', 
    fontStyle: 'italic', 
    fontSize: 18 
}

const sectionBodyStyle = { 
    typography: 'body2', width: '100%' 
}

const MediaCard = (props) => {
    const { posterUrlOriginal, title, originalTitle, year, overview, cast, significants,
        episodes, firstAirYear, lastAirYear, seasons, imdbRating, imdbVoteCount } = props

    const MENU_HEIGHT = 48;
    var displayOverview = getStringOfMaxSize(overview, 225);
    var displayCast = getStringOfMaxSize(mapArrtoCsvString(cast), 100);
    var displaySignificants = getStringOfMaxSize(mapArrtoCsvString(significants), 50);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    function handleAddToList() {
        console.log(title + " added to MUST WATCH LIST")
        setAnchorEl(null);
    }

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
                </IconButton>
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
                    </MenuItem>
                </Menu>
            </Box>
        )
    }

    function getCardSection(props) {
        const { title, sectionInfo } = props
        var checkData = sectionInfo.map((info) => isFieldPresent(info.value))
        if (!checkData.includes(true)) return "";
        return (
            <>
                <Box sx={cardSectionStyle}>
                    <Box sx={sectionTitleStyle}>{title}</Box>
                    <Box sx={sectionBodyStyle}>
                        {sectionInfo.map((info) => {
                            var displayLabel = info.label === "" ? ""
                                : info.label + ": "
                            return !isFieldPresent(info.value) ? ""
                                : <p style={{ margin: 2 }}><strong>{displayLabel}</strong>{info.value}</p>
                        })}
                    </Box>
                </Box>
                <Divider orientation="vertical" flexItem />
            </>
        )
    }

    return (
        <Card raised sx={cardStyle}>
            <Box sx={imgContainerStyle}>
                <img src={posterUrlOriginal} alt="" style={imgStyle} />
            </Box>
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
            })}
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
            })}
            {getCardSection({
                title: "Overview",
                sectionInfo: [
                    {
                        label: "",
                        value: displayOverview
                    },

                ]
            })}
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
            {getMenuButton()}
        </Card>
    );
}

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

function getStringOfMaxSize(string, maxSize) {
    return Array.from(string).length <= maxSize ? string
        : string.substring(0, maxSize) + "...";
}

function isFieldPresent(variable) {
    if (variable === undefined || variable === null || variable === "" || variable === []) return false;
    return true;
}

export default MediaCard;