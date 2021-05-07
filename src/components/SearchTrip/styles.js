import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container:{
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    width: '100%'
  },
  cardDeck: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '80%'
  }
  }));

  export default useStyles