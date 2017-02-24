
exports.query = {
  method: 'POST',
  path: '/api/query',
  handler(request, reply) {
    const db = request.mongo.db;
    const dbName = request.payload.db;
    const collection = request.payload.collection;
    const qString = request.payload.query;

    const dbQ = db.db(dbName).collection(collection);

    const q = request.server.methods.parse(qString);
    dbQ.find(q).toArray((err, data) => {
      if (err) {
        throw err;
      }

      reply(data);
    });
  }
};
