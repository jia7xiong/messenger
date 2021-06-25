import React from "react";
import {
  Grid,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: '40vw',
    marginBottom: '60px',
    [theme.breakpoints.down('sm')]: {
      width: '58vw',
    },
  },
}));

const Signup = (props) => {
  const { formErrorMessage } = props;
  const classes = useStyles();

  return (
  <Grid>   
    <Grid>
      <FormControl>
        <TextField
          label="E-mail address"
          aria-label="e-mail address"
          type="email"
          name="email"
          required
          inputProps={{style: {fontSize: 18}}} 
          InputLabelProps={{style: {fontSize: 20}}}
          className={classes.form}
        />
      </FormControl>
    </Grid>
    <Grid>
      <FormControl error={!!formErrorMessage.confirmPassword}>
        <TextField
          aria-label="password"
          label="Password"
          type="password"
          inputProps={{ minLength: 6 }}
          name="password"
          required
          InputLabelProps={{style: {fontSize: 20}}}
          className={classes.form}
        />
        <FormHelperText>
          {formErrorMessage.confirmPassword}
        </FormHelperText>
      </FormControl>
    </Grid>
    <Grid>
      <FormControl error={!!formErrorMessage.confirmPassword}>
        <TextField
          label="Confirm Password"
          aria-label="confirm password"
          type="password"
          inputProps={{ minLength: 6 }}
          name="confirmPassword"
          required
          InputLabelProps={{style: {fontSize: 20}}}
          className={classes.form}
        />
        <FormHelperText>
          {formErrorMessage.confirmPassword}
        </FormHelperText>
      </FormControl>
    </Grid>
  </Grid>    
  );
};

export default Signup;
