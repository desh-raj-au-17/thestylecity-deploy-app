const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI).then((con) => {
    console.log(`mongodb data base conected with host ${con.connection.host}`);
  });
};

module.exports = connectDatabase;
