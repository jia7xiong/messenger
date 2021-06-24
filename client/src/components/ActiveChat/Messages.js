import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  let lastReadIdentified = false;

  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format("h:mm");

        if (message.senderId === userId && message.readStatus === true) {
          // If there are no messages read after current message, then this is the last one.
          if (index === messages.length) lastReadIdentified = true;
          else if (!messages.slice(index+1).find((mes) => mes.senderId===userId && mes.readStatus===true)) lastReadIdentified = true;
          else lastReadIdentified = false;
        }
        else lastReadIdentified = false;

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} otherUser={otherUser} read={lastReadIdentified} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
