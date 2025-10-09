module.exports = {
  initDb: (cb) => cb(), // instantly succeed
  // Return an object shaped like the real driver: getDb().db(...).collection(...)
  getDb: () => ({
    db: () => ({
      collection: () => ({
        find: () => ({ toArray: async () => [] }),
  // use a 24-char hex string that Mongo's ObjectId considers valid
  insertOne: async (data) => ({ acknowledged: true, insertedId: "507f1f77bcf86cd799439011", ...data }),
  findOne: async () => ({ _id: "507f1f77bcf86cd799439011", name: "Testland" }),
        updateOne: async () => ({ matchedCount: 1, modifiedCount: 1 }),
        deleteOne: async () => ({ deletedCount: 1 }),
      }),
    }),
  }),
};
