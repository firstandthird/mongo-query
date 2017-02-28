
exports.index = {
  method: 'GET',
  path: '/_nowhere',
  handler(request, reply) {
    const db = request.mongo.db;

    db.collection('users').find({}).toArray((err, data) => {
      if (err) {
        return reply(err);
      }

      reply(data);
    });
  }
};
