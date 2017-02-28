
exports.index = {
  method: 'GET',
  path: '/_nowhere',
  handler(request, reply) {
    reply('Hello world');
  }
};
