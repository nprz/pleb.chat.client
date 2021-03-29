function newMessageSubscribe(parent, args, { pubsub }) {
  return pubsub.asyncIterator("NEW_MESSAGE");
}

const newMessage = {
  subscribe: newMessageSubscribe,
  resolve: (payload) => payload,
};

module.exports = {
  newMessage,
};
