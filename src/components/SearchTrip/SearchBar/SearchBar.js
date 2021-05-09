import React from 'react';

//Material UI
import {TextField,MenuItem,Grid} from '@material-ui/core';

//Data
import cities from '../../../data'

//Stylesheet
import useStyles from './styles.js'

//Component containing search inputs on top
const SearchBar = ({fromCity,
                    toCity,
                    fromDate,
                    toDate,
                    seatsNumber,
                    handleFromCity,
                    handleToCity,
                    handleFromDate,
                    handleToDate,
                    handleSeatsNumber}
                  ) => {
  const classes = useStyles();
  var citiesWithAll = [{value: 'All',code: 'ALL'}, ...cities];

  return (
    <form className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4} container justify="center">
          <TextField
            id="from-date"
            label="From"
            type="date"
            fullWidth
            value={fromDate}
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={handleFromDate}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} container justify="center">
          <TextField
            id="to-date"
            label="To"
            type="date"
            value={toDate}
            fullWidth
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={handleToDate}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} container justify="center">
          <TextField
            id="seat-number"
            className={classes.textField}
            select
            fullWidth
            label="Seats"
            value={seatsNumber}
            onChange={handleSeatsNumber}
          >
            {[1,2,3,4,5,6,7,8,9,10].map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} lg={4} container justify="center">
          <TextField
            id="from-city"
            className={classes.textField}
            select
            fullWidth
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
        </Grid>
        <Grid item xs={12} sm={6} lg={4} container justify="center">
          <TextField
            id="to-city"
            className={classes.textField}
            select
            label="To City"
            value={toCity}
            onChange={handleToCity}
            fullWidth
          >
            {citiesWithAll.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.value}
            </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </form>
  );
}

export default SearchBar