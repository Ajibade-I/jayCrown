require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const { dbConnect } = require("./config/dbconnect");
const corsOptions = require("./config/corsOptions");
const { notFound, errorHandler } = require("./lib/midlleware/error-middleware");
const { consultancyRoutes, talentRoutes } = require("./routes/routesIndex");
require("colors");

const app = express();
const port = process.env.PORT || 6400;

// Security & Performance Middlewares
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(morgan("dev"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // 100 requests per IP
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// Serve Uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/v1", consultancyRoutes);
app.use("/api/v1", talentRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Database Connection
dbConnect();

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await mongoose.connection.close();
  process.exit(0);
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});

// Start Server
app.listen(port, () => console.log(`🚀 Server running on port ${port}...`));
