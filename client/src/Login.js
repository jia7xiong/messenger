import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
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
  const { user, login } = props;
  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container>
      <Landing/>
      <Grid item xs={7}>
        <Switcher switchToSignup={true}/>
        <Grid 
          container 
          direction="column" 
          justify="center" 
          alignItems="center" 
          // wrap='nowrap'
          className={classes.formBlock}
        >
          <form onSubmit={handleLogin}>
            <Grid>
              <Typography className={classes.stateText}>
                Welcome back!
              </Typography>
              <Grid>
                <FormControl margin="normal" required>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    inputProps={{style: {fontSize: 18}}} 
                    InputLabelProps={{style: {fontSize: 20}}}
                    className={classes.form}
                  />
                </FormControl>
              </Grid>
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
            <Grid container justify='center' className={classes.submit}>
              <Button type="submit" variant="contained" size="large" color='primary' className={classes.submitButton}>
                Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
