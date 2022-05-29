import React from 'react'
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Button, Tooltip } from '@mui/material';
import styles  from "../Styles";
//Styles
const {imgStyle, toolbarStyle, linkStyle, appBarStyle} = styles
/**
 * Navigation bar at top of web page
 * @returns AppBar MUI component that acts provides navigation links to different pages of apps
 */
const Header = () => {
    const navigate = useNavigate()
    //navigates to account page if account icon clicked
    function handleNavList() {
        navigate('/account')
    }
    //navigates to homepage if movie icon clicked
    function handleNavSearch() {
        navigate('/')
    }

    return (
        <AppBar position="static" sx={appBarStyle}>
            <Toolbar disableGutters sx={toolbarStyle}>
                <Box sx={linkStyle}>
                    <Tooltip title="Navigate to Homepage">
                        <Button
                            onClick={handleNavSearch}
                            sx={{ width: '40px' }}
                        >
                            <img src="images/appbar-logo.png" alt="" style={imgStyle} />
                        </Button>{/*movie icon button that navigates to homepage page*/}
                    </Tooltip>{/*contains site logo that navigates to search page/homepage, provides popup tip*/}
                </Box>{/*Button container that provides left and right margin to button*/}
                <Box sx={linkStyle}>
                    <Tooltip title="Navigate to Account Page">
                        <Button
                            onClick={handleNavList}
                            sx={{ width: '40px' }}
                        >
                            <img src="images/profile-icon.jpg" alt="" style={imgStyle} />
                        </Button>{/*profile icon button that navigates to account page*/}
                    </Tooltip>{/*Navigates to a user's account page, provides popup tip */}
                </Box>{/*Button container that provides left and right margin to button*/}
            </Toolbar>{/*contains navbar elements and provides Toolbar functionality*/}
        </AppBar> /*navbar at top of every page, contains navbar elements*/
    );
}

export default Header;