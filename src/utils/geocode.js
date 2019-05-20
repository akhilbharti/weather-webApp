const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWtoaWxiaGFydGkyNSIsImEiOiJjanY2OWg4ZzAwMnB4NDRtaDFqb284Zjc3In0.JkYEQoVG0tLAAbX9yXSA0w&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to the network", undefined);
    } else if (body.features.length === 0) {
      callback("invalid request", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1], //second latitude
        longitude: body.features[0].center[0], //first longitude
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
