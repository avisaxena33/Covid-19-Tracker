import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';

const MainNavbar = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <div className="navbar">
                <Link to="/" className="navbarTitle">
                    <div className="navbarLeft">
                        <HomeIcon />
                        <h3>cov2019.com</h3>
                    </div>
                </Link>
                <div className="navbarRight">
                    <Button aria-controls="simple-menu" aria-haspopup="true" variant="contained" color="primary" onClick={handleClick}>
                        <h3>Select Region</h3>
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem component={Link} to="/" onClick={handleClose}>World</MenuItem>
                        <MenuItem component={Link} to="/Region/Country/USA/United States" onClick={handleClose}>USA</MenuItem>
                        <MenuItem component={Link} to="/Region/Country/CAN/Canada" onClick={handleClose}>Canada</MenuItem>
                        <MenuItem component={Link} to="/Region/Continent/Europe/Europe" onClick={handleClose}>Europe</MenuItem>
                        <MenuItem component={Link} to="/Region/Continent/Asia/Asia" onClick={handleClose}>Asia</MenuItem>
                        <MenuItem component={Link} to="/Region/Continent/Oceania/Oceania" onClick={handleClose}>Oceania</MenuItem>
                        <MenuItem component={Link} to="/Region/Continent/Africa/Africa" onClick={handleClose}>Africa</MenuItem>
                        <MenuItem component={Link} to="/Region/Continent/South America/South America"  onClick={handleClose}>South America</MenuItem>
                    </Menu>
                </div>
            </div>
        </>
    )
}

export default MainNavbar;
