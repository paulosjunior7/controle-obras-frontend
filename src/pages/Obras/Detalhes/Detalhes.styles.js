import {  makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  select: {
    label : {
      color: 'red'
    }
  },
  buttons: {
    button : {
      marginRight: 0
    }
  },
  paper: {
    padding: 32,
  }
}));

export default useStyles;

