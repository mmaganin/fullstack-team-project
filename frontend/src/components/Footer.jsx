import { Box } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
		<Box
			bgcolor="#1B1B3A"
			px={{ xs: 1, sm: 1 }}
			py={{ xs: 1, sm: 1 }}
			sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}
		>
			<Box sx={{ my: 2, color: 'white', display: 'block' }}>
				© 2022 Copyright: Fannie Mae Team 2
			</Box>
		</Box>/*container for footer creates dark theme*/
	);
}

export default Footer;