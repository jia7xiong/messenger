const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
// TODO: for scalability, implement lazy loading
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [[Message, "createdAt", "DESC"]],
      include: [
        { model: Message, order: ["createdAt", "DESC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[0].text;

      const selfUnreadCount = convoJSON.messages.filter(message => message.senderId === convoJSON.otherUser.id && message.readStatus === false).length;
      const otherUnreadCount = convoJSON.messages.filter(message => message.senderId === userId && message.readStatus === false).length;
      if (typeof convoJSON.user1 !== 'undefined') {
        convoJSON.unreadCount1 = selfUnreadCount;
        convoJSON.unreadCount2 = otherUnreadCount;
      } else if (typeof convoJSON.user2 !== 'undefined') {
        convoJSON.unreadCount2 = selfUnreadCount;
        convoJSON.unreadCount1 = otherUnreadCount;
      }

      // find the id of the last message read by otherUser
      if (convoJSON.messages) {
        const sortedMes = convoJSON.messages.slice().reverse();
        const lastRead = sortedMes.find((mes) => mes.senderId===userId && mes.readStatus===true); 
        convoJSON.lastReadId = lastRead ? lastRead.id : -1;
      }

      convoJSON.messages.reverse();
      conversations[i] = convoJSON;
    }

    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

router.patch("/:conversationId/unread", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const {senderId} = req.body;
    const {conversationId} = req.params;

    // Update the status of all unread messenges in the convo whose senderId match to read
    await Message.update(
      {readStatus: true}, 
      {where: {
        conversationId: conversationId,
        senderId: senderId,
        readStatus: false
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
