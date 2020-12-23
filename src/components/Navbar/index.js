import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import './index.css'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
// list of every state + abbrev
import all_states from '../../all_states'

const useStyles = makeStyles(theme => ({
    inputRoot: {
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "red"
      },
      backgroundColor: 'white'
    }
  }));

const MainNavbar = () => {
    let history = useHistory();
    const classes = useStyles();

    const [selectedState, setSelectedState] = useState('Select A State');

    const handleSelectState = (selectedState) => {
        setSelectedState(selectedState);
        if (selectedState) {
            history.push(`/${selectedState.abbreviation}`);
        }
    }


    return (
        <>
            <div className="navbar">
                <div className="navbar__left">
                    <Link to="/" className="navbar-title">
                        <h1>Covid-19 Tracker</h1>
                    </Link>
                </div>
                <div className="navbar__right">
                    <div className="navbar__input">
                    <Autocomplete
                        value={selectedState}
                        onChange={(event, newValue) => {
                          handleSelectState(newValue);
                        }}
                        id="navbar__select"
                        classes={classes}
                        options={all_states}
                        getOptionLabel={(state) => state.name}
                        style={{ width: 300, color:'red' }}
                        renderInput={(params) => <TextField {...params} label="Select A State" variant="outlined" />}
                    />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainNavbar
