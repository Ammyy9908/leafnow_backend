const mongoose = require("mongoose");

const connect_db = async () => {
  try {
    let connected = await mongoose.connect(
      "mongodb+srv://Sumit:2146255sb8@cluster0.0wij2.mongodb.net/leafnowdatabase"
    );
    return connected;
  } catch (e) {
    return false;
  }
};

module.exports = connect_db;
