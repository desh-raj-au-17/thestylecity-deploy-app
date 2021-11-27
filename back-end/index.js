const dotenv = require("dotenv");
dotenv.config({ path: "back-end/config/config.env" });

const app = require("./app");
const connectDatabase = require("./config/database");

// handling uncaught exceptions.and we have to put this on top otherwise this will not work

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

//setting up config files
// if (process.env.NODE_ENV !== "PRODUCTION")
//   require("dotenv")
dotenv.config({ path: "back-end/config/config.env" });

// connecting to data base.keys
connectDatabase();

// server listener.
const server = app.listen(process.env.PORT, () => {
  console.log(
    `server started on post: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// handle unhandled promise rejections.

process.on(`unhandledRejection`, (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejections`);
  server.close(() => {
    process.exit(1);
  });
});
