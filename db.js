const mongoose = require('mongoose');
const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName:process.env.DBNAME
    });
    console.log('Connected to Mongo Successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongo;
