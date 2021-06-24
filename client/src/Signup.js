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

const useStyles = makeStyles((theme) => ({
  switch: {
    width: '100%',
    paddingTop: '20px',
    paddingRight: '50px',
    // [theme.breakpoints.down('lg')]: {
    //   marginBottom: '34%',
    // },
    [theme.breakpoints.down('md')]: {
      marginBottom: '45%',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '72%',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '100%',
    },
  },
  caption: {
    color: "#9CADC8",
  },
  switchButton: {
    padding: "15px 40px ",
    marginLeft: '30px',
    color: theme.palette.primary.main,
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px #E3E6EA',
  },
  signup: {
    height: '100vh',
    // [theme.breakpoints.down('lg')]: {
    //   marginBottom: '38%',
    // },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '60%',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '85%',
    },
    paddingBottom: '15%',
  },
  form: {
    width: '40vw',
    marginBottom: '60px',
    [theme.breakpoints.down('sm')]: {
      width: '53vw',
    },
    [theme.breakpoints.down('xs')]: {
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
        <Grid container justify="flex-end" alignItems="center" className={classes.switch}>
          <Typography className={classes.caption}>
            Already have an account?
          </Typography>
          <Button onClick={() => history.push("/login")} size="large" className={classes.switchButton}>
              Login
          </Button> 
        </Grid>

        <Grid 
          container 
          direction="column" 
          justify="center" 
          alignItems="center" 
          wrap='nowrap'
          className={classes.signup}
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
