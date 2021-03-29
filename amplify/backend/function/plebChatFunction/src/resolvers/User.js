function messages(parent) {
  if (!parent.messages) return [];
  return parent.messages;
}

module.exports = {
  messages,
};
