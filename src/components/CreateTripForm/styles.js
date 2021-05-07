import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mainDiv:{
      display: 'flex',
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
    },
    formPaper:{
      padding: '16px'
    },
    button:{
      marginTop: '16px',
    },
    form:{
      display: 'flex',
      flexDirection: "column",
      alignItems: 'center',
    }
  }));

  export default useStyles