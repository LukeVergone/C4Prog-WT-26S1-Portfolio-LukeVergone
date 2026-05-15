//javaScript file to handle checkboxes and api calls.

const historicEvent = document.getElementById("historicEvent");
const randomQuote = document.getElementById("randomQuote");

//Check box event listeners to check if one checkbox is ticked, the other becomes unticked.
historicEvent.addEventListener("change", () => {
  if (historicEvent.checked) {
    randomQuote.checked = false;
  }
});

randomQuote.addEventListener("change", () => {
  if (randomQuote.checked) {
    historicEvent.checked = false;
  }
});