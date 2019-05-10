const path = require("path");
const express = require("express");

// Defined Paths for Express config.
const viewPath = path.join(__dirname, "../template"); //to join the path for serving the dyanimic files
const publicDirectoryPath = path.join(__dirname, "../public"); // to join the path for serving static files

const app = express();
// setup handlebar engine and views location
app.set("view engine", "hbs"); // to set dyanamic template hbs.
app.set("views", viewPath); // to set the dyanamic path of template

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather App",
    name: "lorem"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    content: "lorem5"
  });
});

app.get("/weather", (req, res) => {
  res.send({ forecast: "snowing", location: "dehradun" });
});
app.listen(3002, () => {
  console.log("server is running!");
});
