const Boom = require('boom');

exports.getDatabases = {
  method: 'GET',
  path: '/api/databases',
  handler(request, reply) {
    const server = request.server;
    const mongodb = server.mongo.db;
    mongodb.admin().listDatabases((err, data) => {
      if (err) {
        server.log(['error', 'list-databases'], { err });
        return reply(Boom.badImplementation(err));
      }

      const dbs = [];
      data.databases.forEach((db) => {
        dbs.push(db.name);
      });

      reply(dbs);
    });
  }
};
