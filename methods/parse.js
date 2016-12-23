const reduce = require('lodash.reduce');


module.exports = {
  method(qStr) {
    
    const ObjectID = this.mongo.ObjectID;

    let q;
    try {
      q = JSON.parse(qStr);
    } catch(e) {
      return false;
    }

    const query = reduce(q, (r, val, key) => {
      if (key === "_id") {
        val = new ObjectID(val);
      }

      r[key] = val;

      return r;
    }, {});

    return query;
  }
};
