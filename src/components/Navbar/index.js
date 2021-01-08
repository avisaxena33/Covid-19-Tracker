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
                        <MenuItem component={Link} to="/State/USA" onClick={handleClose}>USA</MenuItem>
                        <MenuItem component={Link} to="/Country/Canada" onClick={handleClose}>Canada</MenuItem>
                        <MenuItem component={Link} to="/Country/Asia" onClick={handleClose}>Asia</MenuItem>
                        <MenuItem component={Link} to="/Country/Oceania" onClick={handleClose}>Oceania</MenuItem>
                        <MenuItem component={Link} to="/Country/Africa" onClick={handleClose}>Africa</MenuItem>
                        <MenuItem component={Link} to="/Country/South America"  onClick={handleClose}>South America</MenuItem>
                    </Menu>
                </div>
            </div>
        </>
    )
}

export default MainNavbar;
