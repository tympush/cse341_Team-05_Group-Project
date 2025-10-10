const dotenv = require("dotenv");
dotenv.config();

// When running tests, use the lightweight mock DB that's inside
// getting-started-with-jest so tests don't need a real MongoDB.
let MongoClient;

if (process.env.NODE_ENV === "test") {
  // require the test mock and re-export it for Jest runs
  module.exports = require("../getting-started-with-jest/db/connect");
} else {
  MongoClient = require("mongodb").MongoClient;

  let _db;

  const initDb = (callback) => {
    if (_db) {
      console.log("Db is already initialized!");
      return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URI)
      .then((client) => {
        _db = client;
        callback(null, _db);
      })
      .catch((err) => {
        callback(err);
      });
  };

  const getDb = () => {
    if (!_db) {
      throw Error("Db not initialized");
    }
    return _db;
  };

  module.exports = {
    initDb,
    getDb,
  };
}