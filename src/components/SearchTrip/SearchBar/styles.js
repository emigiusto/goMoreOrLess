import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container:{
      marginBottom: '20px',
    },
    button:{
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
      fontSize: '12px'
    },
    textField:{
      [theme.breakpoints.down('sm')]: {
        width:'90%',
        margin: 'auto'
      },}
}));

export default useStyles