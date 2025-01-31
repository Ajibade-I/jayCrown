const mongoose = require("mongoose");
const conn = mongoose.connection;

const dbConnect = () => {
  mongoose.connect(process.env.MONGO_URI);
  conn.on("error", (error) =>
    console.log("Mongoose connection error: ", error)
  );
  conn.once("open", () =>
    console.log("...Connected to mongoDB...".cyan.underline)
  );
};

module.exports.dbConnect = dbConnect;
module.exports.conn = conn;
