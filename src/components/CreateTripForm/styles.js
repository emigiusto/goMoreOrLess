import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mainDiv:{
      display: 'flex',
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
    },
    formPaper:{
      padding: '16px',
      [theme.breakpoints.up("md")]: {
        width: "60%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "40%",
      },
    },
    button:{
      marginTop: '16px',
    },
    form:{
      display: 'flex',
      flexDirection: "column",
      alignItems: 'center',
    },
    returnOffer:{
      marginTop: '16px',
    },
    backButton:{
      marginTop: '30px'
    }
  }));

  export default useStyles