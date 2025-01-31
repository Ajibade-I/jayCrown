require("dotenv").config();
require("express-async-errors");
const express = require("express");

const app = express();
const port = process.env.PORT || 6400;
const cors = require("cors");
const { dbConnect } = require("./config/dbconnect");
const corsOptions = require("./config/corsOptions");
const accesslogs = require("./lib/midlleware/accesslogs");
// const router = require("./controller/link");
const { notFound, errorHandler } = require("./lib/midlleware/error-middleware");
const router = require("./routes/controller");

require("colors")

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1", accesslogs, router);

app.use(notFound);
app.use(errorHandler);

dbConnect()

app.listen(port, () => console.log(`Server listening on port ${port}....`));


