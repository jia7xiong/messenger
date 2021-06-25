import React from "react";
import { Button, FormControl, TextField, Grid } from "@material-ui/core";
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

const Login = () => {
  const classes = useStyles();

  return (    
  <Grid>   
    <FormControl margin="normal" required>
      <TextField
        label="Password"
        aria-label="password"
        type="password"
        name="password"
        InputProps={{endAdornment: <Button color='primary'>Forgot?</Button>, style: {fontSize: 18}}}
        InputLabelProps={{style: {fontSize: 20}}}
        className={classes.form}
      />
    </FormControl>   
  </Grid>     
  );
};

export default Login;
