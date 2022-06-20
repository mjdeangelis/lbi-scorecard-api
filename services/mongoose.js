const mongoose = require('mongoose');

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToMongoose = async (dbUri = productionDbUri) => {
//   mongoose.set("useFindAndModify", false);
//   mongoose.set("useCreateIndex", true);
//   await mongoose.connect(process.env.DATABASE, mongoOptions);
  await mongoose.connect(process.env.DATABASE);
};

module.exports = { connectToMongoose, mongoOptions };
