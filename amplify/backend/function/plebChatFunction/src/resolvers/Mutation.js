const { AuthenticationError } = require("apollo-server");

function createUser(parent, { email, name }, { prisma }) {
  const newUser = prisma.user.create({
    data: {
      email,
      name,
    },
  });
  return newUser;
}

function createChatRoom(parent, { url, title, id }, { prisma }) {
  return prisma.chatRoom.create({
    data: {
      id,
      title,
      url,
    },
  });
}

function post(
  parent,
  { userId, chatRoomId, content },
  { prisma, pubsub, isAuthenticated }
) {
  if (!isAuthenticated) {
    return new AuthenticationError("Not Authenticated!");
  }

  const newMessage = prisma.message.create({
    data: {
      content,
      userId,
      chatRoomId,
    },
  });
  pubsub.publish("NEW_MESSAGE", newMessage);
  return newMessage;
}

module.exports = {
  createUser,
  createChatRoom,
  post,
};
