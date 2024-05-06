import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Appbar({onAction}) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [countryAnchorEl, setCountryAnchorEl] = React.useState(null);
    const [cityAnchorEl, setCityAnchorEl] = React.useState(null);
    const [languageAnchorEl, setLanguageAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const countryOpen = Boolean(countryAnchorEl);
    const cityOpen = Boolean(cityAnchorEl);
    const languageOpen = Boolean(languageAnchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCountryClick = (event) => {
        setCountryAnchorEl(event.currentTarget);
    };

    const handleCityClick = (event) => {
        setCityAnchorEl(event.currentTarget);
    };

    const handleLanguageClick = (event) => {
        setLanguageAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCountryAnchorEl(null);
        setCityAnchorEl(null);
        setLanguageAnchorEl(null);
    };

    const handleCRUDCities = () => {
        handleClose();
        onAction("CRUD_CITY");
    }

    const handleCRUDCountries = () => {
        handleClose();
        onAction("CRUD_COUNTRY");
    }

    const handleCRUDLanguages = () => {
        handleClose();
        onAction("CRUD_LANGUAGE");
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleCountryClick}>Countries</MenuItem>
                        <Menu
                            id="countries-sub-menu"
                            anchorEl={countryAnchorEl}
                            open={countryOpen}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'sub-menu-button',
                            }}
                        >
                            <MenuItem onClick={handleCRUDCountries}>CRUD countries</MenuItem>
                        </Menu>
                        <MenuItem onClick={handleCityClick}>Cities</MenuItem>
                        <Menu
                            id="cities-sub-menu"
                            anchorEl={cityAnchorEl}
                            open={cityOpen}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'sub-menu-button',
                            }}
                        >
                            <MenuItem onClick={handleCRUDCities}>CRUD cities</MenuItem>
                        </Menu>
                        <MenuItem onClick={handleLanguageClick}>Languages</MenuItem>
                        <Menu
                            id="languages-sub-menu"
                            anchorEl={languageAnchorEl}
                            open={languageOpen}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'sub-menu-button',
                            }}
                        >
                            <MenuItem onClick={handleCRUDLanguages}>CRUD languages</MenuItem>
                        </Menu>
                    </Menu>
                    <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        GeoData Application
                    </Typography>
                </Toolbar>
            </AppBar>
            {}
        </Box>
    );
}
