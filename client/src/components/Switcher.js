import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    switch: {
        width: '100%',
        paddingTop: '20px',
        paddingRight: '50px',
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
}));

const Switcher = (props) => {
    const history = useHistory();
    const { switchToSignup } = props;
    const classes = useStyles();

    const switchToState = switchToSignup ? 
    {
        captionText: "Don't have an account?",
        buttonText: "Create account",
        directTo: "/register",
    } : {
        captionText: "Already have an account?",
        buttonText: "Login",
        directTo: "/login",
    };

  return (
    <Grid container justify="flex-end" alignItems="center" className={classes.switch}>
        <Typography className={classes.caption}>
            {switchToState.captionText}
        </Typography>
        <Button onClick={() => history.push(switchToState.directTo)} size="large" className={classes.switchButton}>
            {switchToState.buttonText}
        </Button> 
    </Grid>
  );
};

export default Switcher;
