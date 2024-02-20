const { config } = require("dotenv");
const express = require("express");
const path = require("path");

const app = express();

config();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Define route for serving index.ejs
app.get("/", (req, res) => {
  res.render(path.join(__dirname, "public", "index.ejs"), {
    OPEN_WEATHERMAP_API_KEY: process.env.OPEN_WEATHERMAP_API_KEY,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  });
});

// Middleware to catch all non-catched routes and redirect to "/"
app.use((req, res) => {
  res.redirect("/");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
