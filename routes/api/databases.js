
exports.getDatabases = {
  method: 'GET',
  path: '/api/databases',
  handler(request, reply) {
    const mongodb = request.server.mongo.db;
    mongodb.admin().listDatabases((err, data) => {
      if (err) {
        throw err;
      }

      const dbs = [];
      data.databases.forEach((db) => {
        dbs.push(db.name);
      });

      reply(dbs);
    });
  }
};
