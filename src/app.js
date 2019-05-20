const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const temperature = require("./utils/temperature");

// Defined Paths for Express config.
const partialPath = path.join(__dirname, "../template/partial");
const viewPath = path.join(__dirname, "../template/views"); //to join the path for serving the dyanimic files
const publicDirectoryPath = path.join(__dirname, "../public"); // to join the path for serving static files

const app = express();
const port = process.env.PORT || 3000;
// setup handlebar engine and views location
app.set("view engine", "hbs"); // to set dyanamic template hbs.
app.set("views", viewPath); // to set the dyanamic path of template
hbs.registerPartials(partialPath);
// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather App",
    content: "lorem"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    content: "lorem5"
  });
});

app.get("/about", (req, res) => {
  res.render("help", {
    title: "about",
    content: "welcome to my websiite"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address"
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      temperature(latitude, longitude, (error, forcastdata) => {
        if (error) {
          return res.send({ error });
        }
        return res.send({
          address: req.query.address,
          forcast: forcastdata,
          location
        });
      });
    }
  );
  // return res.send({ address: req.query.address });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "help article not found"
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide search term"
    });
  }
  console.log(req.query);
  res.send({
    product: []
  });
});
//404 page
app.get("*", (req, res) => {
  res.render("404", { title: "404", errorMessage: "page does not exist" });
});

app.listen(port, () => {
  console.log("server is running on port" + port);
});
