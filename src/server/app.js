const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
// const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const crypto = require("crypto");
const error = require("./controllers/errorController.js");
const itemRouter = require("./routes/itemRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const authRouter = require("./routes/authRoutes.js");
const purchaseRoute = require("./routes/purchaseRoutes.js");
const catagoryRoute = require("./routes/catagoryRoutes.js");
// Start express app

const app = express();

// app.enable("trust proxy");

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// con.naitems.com, front-end naitems.com
// app.use(cors({
//   origin: 'https://www.naitems.com'
// }))

app.options("*", cors());
// app.options('/con//items/:id', cors());

// Serving static files
// app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests, please try again in 1 hour",
});
app.use("/", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});
app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString("base64");
  res.locals.nonce = nonce;
  res.setHeader(
    "Content-Security-Policy",
    `script-src 'self' 'nonce-${nonce}' https://www.gstatic.com/recaptcha/releases/hfUfsXWZFeg83qqxrK27GB8P/recaptcha__en.js  https://www.google.com/recaptcha/ https://accounts.google.com https://apis.google.com https://accounts.google.com/gsi/client https://www.googleapis.com https://accounts.google.com/gsi/style https://accounts.google.com/gsi `
  );
  next();
});

app.use("/items", itemRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/purchases", purchaseRoute);
app.use("/category", catagoryRoute);

app.use(error.globalErrorHandler);

module.exports = app;
