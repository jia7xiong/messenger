import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "./store/utils/thunkCreators";
import Landing from "./components/Landing";
import Switcher from "./components/Switcher";

const useStyles = makeStyles((theme) => ({
  formBlock: {
    minHeight: '100vh',
    paddingBottom: '15%',
  },
  form: {
    width: '40vw',
    marginBottom: '60px',
    [theme.breakpoints.down('sm')]: {
      width: '58vw',
    },
  },
  stateText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: '35px',
  },
  submit: {
    height: '100px',
  },
  submitButton: {
    width: '180px',
    height: '60px',
    margin: 'auto',
  },
}));

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const classes = useStyles();
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container>
      <Landing/>
      <Grid item xs={7}>
        <Switcher switchToSignup={false}/>
        <Grid 
          container 
          direction="column" 
          justify="center" 
          alignItems="center" 
          // wrap='nowrap'
          className={classes.formBlock}
        >
          <form onSubmit={handleRegister}>
            <Grid>
              <Typography className={classes.stateText}>
                Create an account.
              </Typography>
              <Grid>
                <FormControl margin="normal" required>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                    inputProps={{style: {fontSize: 18}}} 
                    InputLabelProps={{style: {fontSize: 20}}}
                    className={classes.form}
                  />
                </FormControl>
              </Grid>
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
                    inputProps={{style: {fontSize: 18}}} 
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
                    inputProps={{style: {fontSize: 18}}} 
                    InputLabelProps={{style: {fontSize: 20}}}
                    className={classes.form}
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container justify='center' className={classes.submit}>
              <Button type="submit" variant="contained" size="large" color='primary' className={classes.submitButton}>
                Create
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
