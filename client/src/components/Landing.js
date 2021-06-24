import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  picture: {
    minHeight: '100vh',
    backgroundImage: 'url("/images/bg-img.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  landing: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(#3A8DFF, #86B9FF)',
    opacity: 0.85,
    paddingLeft: '20%', 
    paddingRight: '20%',
    paddingBottom: '30%',
  },
  intro: {
    color: 'white',
    fontSize: 22,
    fontWeight: "bold",
    marginTop: '10%',
    [theme.breakpoints.up('sm')]: {
      fontSize: 35, 
    },
  },
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <Grid item xs={5} className={classes.picture}>
      <Grid 
        container 
        direction="column" 
        justify="center" 
        alignItems="center" 
        className={classes.landing}
      >
        <Grid>
          <img src="/images/bubble.svg" width='90px'/>
        </Grid>
        <Typography align='center' className={classes.intro}>
          Converse with anyone with any language
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Landing;
