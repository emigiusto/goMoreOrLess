import React from 'react';

//Material UI
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//Data
import cities from '../../../data'

//Stylesheet
import useStyles from './styles.js'

const SearchBar = ({fromCity,
                    toCity,
                    fromDate,
                    toDate,
                    seatsNumber,
                    handleSearch,
                    handleFromCity,
                    handleToCity,
                    handleFromDate,
                    handleToDate,
                    handleSeatsNumber}
                  ) => {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(
      { fromDate: fromDate,
        toDate: toDate,
        fromCity: fromCity,
        toCity: toCity,
        seatsNumber: seatsNumber
      }
    )
  };

  var citiesWithAll = [{value: 'All',code: 'ALL'}, ...cities];

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <TextField
        id="from-date"
        label="From"
        type="date"
        value={fromDate}
        className={classes.textField}
        InputLabelProps={{
            shrink: true,
        }}
        onChange={handleFromDate}
      />
      <TextField
        id="to-date"
        label="To"
        type="date"
        value={toDate}
        className={classes.textField}
        InputLabelProps={{
            shrink: true,
        }}
        onChange={handleToDate}
      />
      <TextField
        id="seat-number"
        className={classes.seatsTextField}
        select
        label="Seats"
        value={seatsNumber}
        onChange={handleSeatsNumber}
      >
        {[1,2,3,4,5,6,7,8,9,10,11,12].map((option) => (
        <MenuItem key={option} value={option}>
            {option}
        </MenuItem>
        ))}
      </TextField>
      
      <TextField
        id="from-city"
        className={classes.textField}
        select
        label="From City"
        value={fromCity}
        onChange={handleFromCity}
      >
        {citiesWithAll.map((option) => (
        <MenuItem key={option.value} value={option.value}>
            {option.value}
        </MenuItem>
        ))}
      </TextField>
      <TextField
        id="to-city"
        className={classes.textField}
        select
        label="To City"
        value={toCity}
        onChange={handleToCity}
      >
        {citiesWithAll.map((option) => (
        <MenuItem key={option.value} value={option.value}>
            {option.value}
        </MenuItem>
        ))}
      </TextField>
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        className={classes.button}>
        Search
      </Button>
    </form>
  );
}

export default SearchBar