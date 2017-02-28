exports.insert = {
  path: '/api/databases/{db}/collections/{collection}',
  method: 'POST',
  handler: {
    autoInject: {
      db(server, request, done) {
        const db = server.mongo.db;
        const dbName = request.params.db;
        const collection = request.params.collection;

        done(null, db.db(dbName).collection(collection));
      },
      insert(db, request, done) {
        db.insert(request.payload.data, done);
      },
      reply(insert, done) {
        done(null, { success: 1, insert });
      }
    }
  }
};
