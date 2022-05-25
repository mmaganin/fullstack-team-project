import React from 'react'
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Container, Button, Tooltip } from '@mui/material';

const imgStyle = {
    width: '100%',
    height: 'auto',
}
const Header = () => {
    const navigate = useNavigate()

    function handleNavList() {
        navigate('/mustwatchlist')
    }

    function handleNavSearch() {
        navigate('/')
    }

    return (
        <AppBar position="static" sx={{ bgcolor: "#1B1B3A" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Tooltip title="Navigate to Search Page">
                        <Button
                            onClick={handleNavSearch}
                            sx={{ width: '80px' }}
                        >
                            <img src="images/appbar-logo.png" alt="" style={imgStyle} />
                        </Button>
                    </Tooltip>{/*contains site logo that navigates to search page, provides tip popup*/}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Navigate to Must Watch List">
                            <Button
                                onClick={handleNavList}

                            >
                                Must-Watch-List
                            </Button>
                        </Tooltip>{/*Navigates to a user's must-watch-list*/}
                    </Box>{/*contains elements providing functionality to link on right side of navbar*/}
                </Toolbar>{/*contains navbar elements and provides Toolbar functionality*/}
            </Container>{/*contains navbar elements and sets a size*/}
        </AppBar> /*navbar at top of every page, contains navbar elements*/
    );
}

export default Header;