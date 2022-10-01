const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL).then((con) => {
    console.log(`mongodb data base conected with host ${con.connection.host}`);
  }).catch((error) => console.error(error))
};

module.exports = connectDatabase;
