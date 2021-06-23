import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    letterSpacing: -0.17,
  },
  notification: {
    height: 20,
    width: 20,
    marginRight: 10,
    letterSpacing: -0.5,
    display: "flex",
    alignItems: "center",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, unreadCount1, unreadCount2 } = conversation;
  let unreadCount;
  if (conversation.hasOwnProperty('user1')) unreadCount = unreadCount1;
  else unreadCount = unreadCount2;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography 
          className={classes.previewText}
          style={{color: [unreadCount ? 'black' : "#9CADC8"], fontWeight: [unreadCount ? 'bold' : "normal"]}}
        >
          {latestMessageText}
        </Typography>
      </Box>
      <Box className={classes.notification}>
        <Badge 
          badgeContent={unreadCount}
          color='primary'
        />
      </Box>
    </Box>
  );
};

export default ChatContent;
