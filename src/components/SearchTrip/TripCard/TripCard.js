import React from 'react';

//Material UI
import {Card,CardActions,CardContent,Button,Typography} from '@material-ui/core';

//Stylesheet
import useStyles from './styles.js'

export default function TripCard({trip}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {trip.firstName + ' ' + trip.lastName}
        </Typography>
        <Typography variant="h5" component="h2">
            {trip.fromCity + ' to ' + trip.toCity}
        </Typography>
        <Typography className={classes.seatsTitle} color="textSecondary">
            {trip.seatsNumber + ' seats available'}
        </Typography>
        <Typography variant="h5" color="textSecondary" align="center">
            {trip.price + 'kr'}
        </Typography>
        <Typography variant="h6" component="p">
            {trip.tripDate}
        </Typography>
        
        {trip.returnTrip ? <Typography variant="body" component="p">Return on  + {trip.tripDate}</Typography> : ''}

      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button  size="small" variant="contained" color="primary">Book now!</Button>
      </CardActions>
    </Card>
  );
}