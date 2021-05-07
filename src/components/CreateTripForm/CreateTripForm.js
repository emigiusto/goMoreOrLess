import React, {useState} from 'react';

//Stylesheet
import useStyles from './styles'

//Material Ui
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {Typography} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';

//Data managment
import firebase from '../../firebase'
import cities from '../../data'

//Other components
import AlertMessage from './AlertMessage/AlertMessage'

//Form Validation functions
import formValidation from './FormValidation'

function CreateTripForm(props) {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fromCity, setFromCity] = useState('Copenhagen');
    const [toCity, setToCity] = useState('Odense');
    const [tripDate, setTripDate] = useState('');
    const [returnTripDate, setReturnTripDate] = useState('');
    const [returnTrip, setReturnTrip] = useState(false);
    const [seatsNumber, setSeatsNumber] = useState(2);
    const [price, setPrice] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');

    //Form and state control functions
    const handleCheckboxReturn = (event) => {
        setReturnTrip(event.target.checked);
      };
      const handleFromChange = (event) => {
        setFromCity(event.target.value);
      };
      const handleToChange = (event) => {
        setToCity(event.target.value);
      };
      const handleFirstName = (event) => {
        setFirstName(event.target.value);
      };
      const handleLastName = (event) => {
        setLastName(event.target.value);
      };
      const handleTripDate = (event) => {
        setTripDate(event.target.value);
      };
      const handleReturnTripDate = (event) => {
        setReturnTripDate(event.target.value);
      };
      const handleSeatsNumber = (event) => {
        setSeatsNumber(event.target.value);
      };
      const handlePrice = (event) => {
        setPrice(event.target.value);
      };
      
      // Trip creation Success cleanup and pop-up Alert
      const tripCreatedSuccess = () => {
        setFirstName('');
        setLastName('');
        setFromCity('Copenhagen');
        setToCity('Odense');
        setTripDate('');
        setReturnTripDate('');
        setReturnTrip(false)
        setSeatsNumber(2);
        setPrice(0)

        setTimeout(() => { setAlertMessage('')}, 2000);
        
      };

      const handleSubmit = evt => {
        evt.preventDefault();
        let tripData = { 
                      firstName: firstName,
                      lastName: lastName,
                      fromCity: fromCity,
                      toCity: toCity,
                      tripDate: tripDate,
                      returnTripDate: returnTripDate || null,
                      returnTrip: returnTrip,
                      seatsNumber: seatsNumber,
                      price: price
        };
        console.log(tripData)
        var formValidationResponse = formValidation(tripData)
        
        if (formValidationResponse===true) {
          firebase 
            .firestore()
            .collection('trips')
            .add(tripData)

            setAlertMessage('The trip has been created successfully')
            tripCreatedSuccess()
        } else {
          setAlertMessage('Error: Please correct the following fields: ' + {formValidationResponse})
          setTimeout(() => { setAlertMessage('')}, 2000);
        }
        
      };

    return (
        <div className={classes.mainDiv}>
             <Paper elevation={1}>
                <Typography variant="h5" align='center'>Create your trip</Typography>
                <form className={classes.container} noValidate autoComplete="on" onSubmit={handleSubmit}>
                    <TextField id="first-name" label="First Name" value={firstName} className={classes.textField} onChange={handleFirstName}/>
                    <TextField id="last-name" label="Last Name" value={lastName} className={classes.textField} onChange={handleLastName}/>
                    <TextField
                        id="from-city"
                        className={classes.textField}
                        select
                        label="From"
                        value={fromCity}
                        onChange={handleFromChange}
                        helperText="Select a City"
                    >
                        {cities.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                      id="to-city"
                      className={classes.textField}
                      select
                      label="To"
                      value={toCity}
                      onChange={handleToChange}
                      helperText="Select a City"
                    >
                        {cities.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.value}
                        </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                      id="trip-date"
                      label="Trip Date"
                      type="date"
                      value={tripDate}
                      className={classes.textField}
                      InputLabelProps={{
                          shrink: true,
                      }}
                      onChange={handleTripDate}
                    />
                    <Typography>Car seats available</Typography>
                    <TextField
                      id="seat-number"
                      className={classes.textField}
                      select
                      label="Car Seats Available"
                      value={seatsNumber}
                      onChange={handleSeatsNumber}
                    >
                        {[1,2,3,4,5,6,7,8,9,10,11,12].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                        ))}
                    </TextField>
                    <TextField  id="price" 
                                label="Price per seat" 
                                value={price} 
                                type="number"
                                className={classes.textField} 
                                onChange={handlePrice}
                                InputProps={{
                                  endAdornment: <InputAdornment position="start">kr</InputAdornment>,
                                }}
                                />
                    <Typography variant="subtitle1">Have a return trip?</Typography>
                    <Checkbox
                    id="return-trip-checkbox"
                    checked={returnTrip}
                    onChange={handleCheckboxReturn}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <TextField
                    id="return-date"
                    label="Return Date"
                    type="date"
                    value={returnTripDate}
                    disabled={!returnTrip}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleReturnTripDate}
                    />
                    

                    <Button type="submit" variant="contained" color="primary" className={classes.button}>Create</Button>
                    {alertMessage ? <AlertMessage message={alertMessage}></AlertMessage> : ''}
                </form>
            </Paper>
        </div>
    );
}

export default CreateTripForm;