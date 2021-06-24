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

const useStyles = makeStyles((theme) => ({
  switch: {
    width: '100%',
    paddingTop: '20px',
    paddingRight: '50px',
    // [theme.breakpoints.down('lg')]: {
    //   marginBottom: '16%',
    // },
    [theme.breakpoints.down('md')]: {
      marginBottom: '30%',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '45%',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '52%',
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
  login: {
    height: '100vh',
    // [theme.breakpoints.down('lg')]: {
    //   marginBottom: '18%',
    // },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '32%',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '45%',
    },
    paddingBottom: '15%',
  },
  form: {
    width: '40vw',
    marginBottom: '60px',
    [theme.breakpoints.down('xs')]: {
      width: '50vw',
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
        <Grid container justify="flex-end" alignItems="center" className={classes.switch}>
          <Typography className={classes.caption}>
            Don't have an account?
          </Typography>
          <Button onClick={() => history.push("/register")} size="large" className={classes.switchButton}>
              Create account
          </Button> 
        </Grid>

        <Grid 
          container 
          direction="column" 
          justify="center" 
          alignItems="center" 
          wrap='nowrap'
          className={classes.login}
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
