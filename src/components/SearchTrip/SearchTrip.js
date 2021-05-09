import React, {useState, useEffect, useCallback } from 'react';

//Material Ui
import {Typography,Button,Divider} from '@material-ui/core';

//React Router
import { Link } from 'react-router-dom';

//Components
import TripCard from './TripCard/TripCard'
import SearchBar from './SearchBar/SearchBar'

//Stylesheet
import useStyles from './styles'

//Other Libraries
import moment from 'moment'

function SearchTrip({trips}) {
    const classes = useStyles();
    const [tripsFiltered, setTripsFiltered] = useState([]);

    //Search Form state
    const [fromCity, setFromCity] = useState('All');
    const [toCity, setToCity] = useState('All');
    const [fromDate, setFromDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [toDate, setToDate] = useState(moment(new Date()).add(1, 'year').format('YYYY-MM-DD'));
    const [seatsNumber, setSeatsNumber] = useState(2);

    //Search Form handling functions
    const handleFromCity = (event) => {
      setFromCity(event.target.value);
    };
    const handleToCity = (event) => {
      setToCity(event.target.value);
    };
    const handleFromDate = (event) => {
      setFromDate(event.target.value);
    };
    const handleToDate = (event) => {
      setToDate(event.target.value);
    };
    const handleSeatsNumber = (event) => {
      setSeatsNumber(event.target.value);
    };

    const filterTrips = useCallback((searchParams)=>{
        var newTripList = trips.filter((trip)=> 
            (   (searchParams.fromCity === 'All' ? true : trip.fromCity === searchParams.fromCity) &&
                (searchParams.toCity === 'All' ? true : trip.toCity === searchParams.toCity) &&
                moment(trip.tripDate).isSameOrAfter(searchParams.fromDate, 'day') &&
                moment(trip.tripDate).isSameOrBefore(searchParams.toDate, 'day') &&
                (trip.seatsNumber >= searchParams.seatsNumber)
            ))
        setTripsFiltered(newTripList)
      },[trips])
      
      //Everytime trips is updated from firebase or search parameters change from the user, re-renders the component filtering the array received
      useEffect(() => {
        filterTrips({
          fromCity: fromCity,
          toCity: toCity,
          fromDate: fromDate,
          toDate: toDate,
          seatsNumber: seatsNumber
        })
      }, [trips,fromCity,toCity,fromDate,toDate,seatsNumber,filterTrips]);

    return (
        <div className={classes.container}>
            <Typography variant="h5" align="center" gutterBottom>Find your ride</Typography>
            <SearchBar  fromCity={fromCity}
                        toCity={toCity}
                        fromDate={fromDate}
                        toDate={toDate}
                        seatsNumber={seatsNumber}
                        handleSearch={filterTrips} 
                        handleFromCity={handleFromCity} 
                        handleToCity={handleToCity}
                        handleFromDate={handleFromDate}
                        handleToDate={handleToDate}
                        handleSeatsNumber={handleSeatsNumber}
            ></SearchBar>
            <div className={classes.cardDeck}>
                {tripsFiltered.map(trip => {return <TripCard key={trip.id} trip={trip}></TripCard>})}
            </div>
            <Divider variant="middle" className={classes.divider}/>
            <Button className={classes.backButton} color="secondary" component={Link} variant="contained" to="/createtrip">Create Trip</Button>
        </div>
    );
}

export default SearchTrip;