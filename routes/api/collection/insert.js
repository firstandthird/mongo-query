exports.insert = {
  path: '/api/databases/{db}/collections/{collection}',
  method: 'POST',
  handler: {
    autoInject: {
      reply(server, done) {
        done(null, { success: 1 });
      }
    }
  }
};
