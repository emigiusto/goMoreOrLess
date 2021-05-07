import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: '16px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

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
        <Typography className={classes.pos} color="textSecondary">
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
      <CardActions>
        <Button size="small" variant="contained" color="primary">Book now!</Button>
      </CardActions>
    </Card>
  );
}