function user(parent, { userId }, { prisma }) {
  return prisma.user.findUnique({ where: { id: userId } });
}

function chatRoom(parent, { chatRoomId }, { prisma }) {
  return prisma.chatRoom.findUnique({ where: { id: chatRoomId } });
}

module.exports = {
  user,
  chatRoom,
};
