import React, {useEffect,useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


export default function AlertMessage({message}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
    setTimeout(() => {setOpen(false)}, 2500);
  }, [message]);

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id"> {message} </span>}

      />
    </div>
  );
}
