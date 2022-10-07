const name = document.querySelector(".inputName");
const email = document.querySelector(".inputEmail4");
const comments = document.querySelector(".exampleFormControlTextarea1");
const send = document.querySelector(".btn");

send.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Ви надіслали запит");
  console.log("Імя:", name.value);
  console.log("Email:", email.value);
  console.log("Comments:", comments.value);
});
