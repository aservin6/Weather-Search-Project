// Require and call Express
const express = require("express");
const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));

// Import Route
const weatherRoute = require("./routes/weather");

// Use View Engine
app.set("view engine", "ejs");

// Middleware Route
app.use("/", weatherRoute);

// PORT listens to enviroment or 3000 for local testing
const PORT = process.env.PORT || 3000;

// PORT Listening and logging status
app.listen(PORT, () => console.log("Server is running on port:", PORT));
