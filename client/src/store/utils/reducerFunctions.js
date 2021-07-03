export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      user1: null,
    };
    newConvo.latestMessageText = message.text;
    newConvo.unreadCount1 = 1;
    newConvo.unreadCount2 = 0;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessageText = message.text;
      if (message.senderId === convoCopy.otherUser.id) {
        convoCopy.hasOwnProperty('user1') ? convoCopy.unreadCount1 += 1 : convoCopy.unreadCount2 += 1;
      } else {
        convoCopy.hasOwnProperty('user1') ? convoCopy.unreadCount2 += 1 : convoCopy.unreadCount1 += 1;
      }

      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      newConvo.user1 = null;
      newConvo.unreadCount1 = 0;
      newConvo.unreadCount2 = 1;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const addReadMessagesToStore = (state, payload) => {
  const {conversationId, senderId, deCount} = payload
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };

      // Clear the notification upon currentUser clicking the siderbar chat.
      if (deCount) {
        convoCopy.hasOwnProperty('user1') ? convoCopy.unreadCount1 = 0 : convoCopy.unreadCount2 = 0;
      }
     
      let lastReadId = -1
      // Update the readStatus of all unread messages in the convo whose senderId match to ture
      convoCopy.messages = convoCopy.messages.map((message) => {
        if (message.senderId === senderId && !message.readStatus) {
          const mesCopy = {...message};
          mesCopy.readStatus = true;
          lastReadId = mesCopy.id;
          return mesCopy;
        }
        else return message;
      });

      // Update the id of last message read by otherUser
      if (!deCount) {
        convoCopy.lastReadId = lastReadId;}
      
      return convoCopy;
    } else {
      return convo;
    }
  });
};
