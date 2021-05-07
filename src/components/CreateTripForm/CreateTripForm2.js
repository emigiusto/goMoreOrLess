import React, {useState} from 'react';

//React-hook-form
import { useForm, FormProvider } from 'react-hook-form';

//Material UI
import { InputLabel, Select, MenuItem, Button, Grid, Typography, Paper, TextField } from '@material-ui/core';

//Other components
import AlertMessage from './AlertMessage/AlertMessage'
import FormInput from './CustomTextField/CustomTextField';

//Stylesheet
import useStyles from './styles'

//Data managment
import firebase from '../../firebase'
import cities from '../../data'

function CreateTripForm(props) {
    const classes = useStyles();
    const methods = useForm();

    const [fromCity, setFromCity] = useState('Copenhagen');
    const [toCity, setToCity] = useState('Odense');
    const [seatsNumber, setSeatsNumber] = useState(2);
    const [tripDate, setTripDate] = useState('');

    const [alertMessage, setAlertMessage] = useState('');

    const createNewTrip = (tripInfo) => {
        let tripData = { 
            ...tripInfo,
            fromCity: fromCity,
            toCity: toCity,
            seatsNumber: seatsNumber,
            tripDate: tripDate,
        };
          firebase 
            .firestore()
            .collection('trips')
            .add(tripData)
            
            setAlertMessage('The trip has been created successfully')
      };
    
    return (
        <div className={classes.mainDiv}>
            <Paper elevation={1} className={classes.formPaper}>
                <Typography variant="h5" gutterBottom align='center'>Create your trip</Typography>
                <FormProvider {...methods}>
                    <form className={classes.form} onSubmit={methods.handleSubmit((data) => createNewTrip({ ...data }))}>
                        <Grid container spacing={3}>
                            <FormInput required name='firstName' label='First Name'/>
                            <FormInput required name='lastName' label='Last Name'/>
                            <Grid item xs={12} sm={6}>
                                <InputLabel>From City</InputLabel>
                                <Select value={fromCity} fullWidth onChange={(e) => setToCity(e.target.value)}>
                                    {cities.map((option) => (
                                    <MenuItem key={option.code} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <InputLabel>To City</InputLabel>
                                <Select value={toCity} fullWidth onChange={(e) => setFromCity(e.target.value)}>
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

                        <Button type="submit" variant="contained" color="primary" className={classes.button}>Create!</Button>
                    </form>
                </FormProvider>
                {alertMessage ? <AlertMessage message={alertMessage}></AlertMessage> : ''}
            </Paper>
        </div>    
    );
}

export default CreateTripForm;