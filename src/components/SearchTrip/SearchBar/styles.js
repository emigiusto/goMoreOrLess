import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '800px',
      marginBottom: '20px',
    },
    textField: {
      width: 400,
      marginRight: '10px'
    },
    seatsTextField: {
      width: 200,
      marginRight: '10px'
    },
    button:{
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      fontSize: '12px'
    },
  }));

  export default useStyles