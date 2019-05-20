const weatherForm = document.querySelector("form");
const searchTerm = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//messageOne.textContent = "";
weatherForm.addEventListener("submit", event => {
  event.preventDefault();

  const location = searchTerm.value;
  messageOne.textContent = "loading..";
  messageTwo.textContent = "";
  locationData(location);
  searchTerm.value = "";
});
function locationData(location) {
  fetch(`http://localhost:3002/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        console.log(data.error);
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forcast;
      }
    });
  });
}
