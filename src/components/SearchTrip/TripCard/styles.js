import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: 300,
      marginRight: '8px',
      marginLeft: '8px',
      marginBottom: '16px',
    },
    title: {
      fontSize: 14,
    },
    seatsTitle: {
      marginBottom: '12px',
    },
    cardActions:{
      display: 'flex',
      justifyContent: 'center',
    }
  });

  export default useStyles