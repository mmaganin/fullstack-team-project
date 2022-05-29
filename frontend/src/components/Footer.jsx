import { Box } from '@mui/material';
import React from 'react';
import styles from '../Styles'
//Styles
const {footerTextStyle, footerContainerStyle} = styles
const Footer = () => {
    return (
		<Box sx={footerContainerStyle}>
			<Box sx={footerTextStyle}>
				© 2022 Copyright: Fannie Mae Team 2
			</Box>
		</Box>/*container for footer creates dark theme*/
	);
}

export default Footer;