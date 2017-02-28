const Boom = require('boom');

exports.listCollections = {
  method: 'GET',
  path: '/api/databases/{db}/collections',
  handler(request, reply) {
    const dbName = request.params.db;
    const db = request.mongo.db;

    const dbQ = db.db(dbName);

    dbQ.listCollections({}).toArray((err, data) => {
      if (err) {
        return reply(Boom.badImplementation(err));
      }
      const collections = [];

      data.forEach((collection) => {
        collections.push(collection.name);
      });

      reply(collections);
    });
  }
};
