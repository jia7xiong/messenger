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
    color: props => props.unreadCount ? 'black' : "#9CADC8",
    fontWeight: props => props.unreadCount ? 'bold' : "normal",
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
  const { conversation } = props;
  const { latestMessageText, otherUser, unreadCount1, unreadCount2 } = conversation;
  const unreadCount = conversation.hasOwnProperty('user1') ? unreadCount1 : unreadCount2;

  const styleProps = {unreadCount: unreadCount};
  const classes = useStyles(styleProps);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
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
