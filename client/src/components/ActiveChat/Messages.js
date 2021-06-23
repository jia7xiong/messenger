import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  // Find the lastest message read by otherUser
  let read = false;
  const sortedMes = messages.slice().reverse();
  const lastRead = sortedMes.find((mes) => mes.senderId===userId && mes.readStatus===true); 
  
  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        if (lastRead && message.id === lastRead.id) read = true;
        else read = false;

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} otherUser={otherUser} read={read} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
