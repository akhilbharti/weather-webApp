const request = require("request");
const temperature = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/3b92f47d0714b0cd5239098133c8d29a/" +
    latitude +
    "," +
    longitude;
  //console.log(tempurl);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Error!!! try again", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degress out. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = temperature;
