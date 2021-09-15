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
    maxWidth: 400,
    maxHeight: 300

  }
}));

export default useStyles;

