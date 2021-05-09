import React, {useState} from 'react';

//React-hook-form
import { useForm, FormProvider } from 'react-hook-form';

//React Router
import { Link } from 'react-router-dom';

//Material UI
import { InputLabel, Select, MenuItem, Button, Grid, Typography, Paper, TextField, IconButton } from '@material-ui/core';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

//Other components
    //Custom AlertMessage at the bottom
    import AlertMessage from './AlertMessage/AlertMessage'
    //Custom Input for react-hook-form based on TextField Material UI component 
    import FormInput from './CustomTextField/CustomTextField';

//Form validation functions
import formValidation from './FormValidation'

//Stylesheet
import useStyles from './styles'

//Data managment
import firebase from '../../firebase'
import cities from '../../data'

function CreateTripForm(props) {
    const classes = useStyles();
    const methods = useForm();
    //Form state variables
    const [fromCity, setFromCity] = useState('Copenhagen');
    const [toCity, setToCity] = useState('Odense');
    const [seatsNumber, setSeatsNumber] = useState(2);
    const [tripDate, setTripDate] = useState('');
    //UI state variables
    const [returnTripOffer, setReturnTripOffer] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    //Form submit handler, validates form inputs and creates new trip or shows error
    const onSubmit = (newTripInfo) => {
        let tripData = { 
            ...newTripInfo,
            fromCity: fromCity,
            toCity: toCity,
            seatsNumber: seatsNumber,
            tripDate: tripDate,
        };
        var validated = formValidation(tripData)
        if (validated.success) {
            createNewTrip(tripData)
        } else {
            setAlertMessage(validated.error)
        }
    }

    //Create trip function and submits it to firebase, offers return trip if it's the user's first creation
    const createNewTrip = (tripData) => {
        firebase 
            .firestore()
            .collection('trips')
            .add(tripData)
        if (!returnTripOffer) { //If its a first trip creation, Offers the return trip button
            setReturnTripOffer(!returnTripOffer);
            //Disables create button until the user clicks on the swapping arrows button
            setSubmitDisabled(true);
            setAlertMessage('The trip has been created successfully');
        } else {
            setAlertMessage('The return trip has been created successfully');
        }
    };

    //Toggles between fromtoCity and toCity, also enables create button again
    const swapFromTo = () => {
        const oldFromCity = fromCity;
        const oldToCity = toCity;
        setFromCity(oldToCity);
        setToCity(oldFromCity);
        setSubmitDisabled(false);
        setTripDate('');
    }
    
    return (
        <div className={classes.mainDiv}>
            <Paper elevation={1} className={classes.formPaper}>
                <Typography variant="h5" gutterBottom align='center'>Create your trip</Typography>
                <FormProvider {...methods}>
                    <form className={classes.form} onSubmit={methods.handleSubmit((newTripInfo) => onSubmit(newTripInfo))}>
                        <Grid container spacing={3}>
                            <FormInput required name='firstName' label='First Name'/>
                            <FormInput required name='lastName' label='Last Name'/>

                            <Grid item xs={12} sm={6}>
                                <InputLabel>From City</InputLabel>
                                <Select value={fromCity} fullWidth onChange={(e) => setFromCity(e.target.value)}>
                                    {cities.map((option) => (
                                    <MenuItem key={option.code} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <InputLabel>To City</InputLabel>
                                <Select value={toCity} fullWidth onChange={(e) => setToCity(e.target.value)}>
                                    {cities.map((option) => (
                                    <MenuItem key={option.code} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <InputLabel>Seats available</InputLabel>
                                <Select value={seatsNumber} fullWidth onChange={(e) => setSeatsNumber(e.target.value)}>
                                    {[1,2,3,4,5,6,7,8,9,10].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            
                            <FormInput required name='price' label='Price per seat'/>
                            
                            <Grid item xs={12} sm={6}>
                                <InputLabel>Trip Date</InputLabel>
                                <TextField
                                    id="tripDate"
                                    type="date"
                                    fullWidth
                                    required
                                    value={tripDate}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => setTripDate(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        {returnTripOffer? 
                            <Grid item xs={12} sm={12} container direction="column" alignItems="center">
                                <Typography color='textPrimary' variant='h6' className={classes.returnOffer}> Do you want to create your return trip?</Typography>
                                <IconButton onClick={swapFromTo} color="primary" ><SwapHorizIcon fontSize="large" /></IconButton>
                            </Grid>
                        : ''}

                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={submitDisabled}>Create!</Button>
                    </form>
                </FormProvider>
                {alertMessage ? <AlertMessage message={alertMessage}></AlertMessage> : ''}
            </Paper>
            <Button className={classes.backButton} component={Link} variant="outlined" to="/">Back to Trips</Button>
        </div>    
    );
}

export default CreateTripForm;