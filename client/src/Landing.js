import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login, register } from "./store/utils/thunkCreators";
import Banner from "./components/Banner";
import Switcher from "./components/Switcher";
import Login from "./components/Login";
import Signup from "./components/Signup"

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

const Landing = (props) => {
  const { user, login, register, isLogin } = props;
  const classes = useStyles();
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const state = isLogin ? {
    introText: "Welcome back!",
    buttonText: "Login",
  } : {
    introText: "Create an account.",
    buttonText: "Create",
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };
  
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

  const handleSubmit = isLogin ? handleLogin : handleRegister;

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container>
      <Banner/>
      <Grid item xs={7}>
        <Switcher switchToSignup={isLogin}/>
        <Grid 
          container 
          direction="column" 
          justify="center" 
          alignItems="center" 
          // wrap='nowrap'
          className={classes.formBlock}
        >
          <form onSubmit={handleSubmit}>
            <Grid>
              <Typography className={classes.stateText}>
                {state.introText}
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
                {isLogin ? <Login/> : <Signup formErrorMessage={formErrorMessage}/> }
            </Grid>
            </Grid>
            <Grid container justify='center' className={classes.submit}>
              <Button type="submit" variant="contained" size="large" color='primary' className={classes.submitButton}>
                {state.buttonText}
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
        register: (credentials) => {
          dispatch(register(credentials));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
