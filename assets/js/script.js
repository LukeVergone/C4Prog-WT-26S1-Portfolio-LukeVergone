//javaScript file to handle checkboxes and api calls.

const apiKey = "qlCkTCTBqPTODETvI4PNOcjZTQcYMH5oI5192YKd";
const historicEvent = document.getElementById("historicEvent");
const randomQuote = document.getElementById("randomQuote");
const userText = document.getElementById("userText");
const buttonExecuteAPICall = document.getElementById("buttonExecuteAPICall");
const apiCallResult = document.getElementById("apiCallResult");
const today = new Date();
const dayOfMonth = today.getDate();
const monthOfYear = (today.getMonth() + 1);

async function fetchRandomQuote(category){
    const response = await fetch(`https://api.api-ninjas.com/v2/randomquotes?categories=${category}`, {
        headers: {
            "X-Api-Key": apiKey
        }
    });  
    return await response.json();
}

async function fetchHistoricEvent(year){
    const response = await fetch(
        `https://api.api-ninjas.com/v1/historicalevents?year=${year}&month=${monthOfYear}&day=${dayOfMonth}`,
        {
            headers: {
                "X-Api-Key": apiKey
            }
        }
    );

    return await response.json();

}

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

//Button click runs api call functions
buttonExecuteAPICall.addEventListener("click", async (event) => {
    //Button is inside a form and default behaviour is to reload page when clicked. This is to prevent default behaviour occurring.
    event.preventDefault();

    //If random Quote is selected
    if (randomQuote.checked) {
        if (userText.value === "") {
            apiCallResult.value = `Please choose one of the following categories: \nwisdom, philosophy, life, truth, inspirational, relationships, love, faith, humor, success, courage, happiness, art, writing, fear, nature, time, freedom, death or leadership.`;
        }
        else {
            const data = await fetchRandomQuote(userText.value);
        
        //API returned no results:
        if (data.length === 0){
            apiCallResult.value = `There are no quotes for category: ${userText.value}. \nPlease choose one of the following categories: \nwisdom, philosophy, life, truth, inspirational, relationships, love, faith, humor, success, courage, happiness, art, writing, fear, nature, time, freedom, death or leadership.`;
        }
        else{
        apiCallResult.value = `${data[0].quote} - ${data[0].author}`;
        }
        }
        
    }
    //if historical event was selected
    else if (historicEvent.checked) {
        //input filtering: Confirm that a numerical value entered
        if (isNaN(userText.value)) {
            apiCallResult.value = "Please enter a year (numerical value).";

        }
        else {
            const data = await fetchHistoricEvent(userText.value);

        //API returned no results
        if (data.length === 0){
            apiCallResult.value = "There are no listed significant events from " + `${dayOfMonth}.${monthOfYear}.${userText.value}.`;
        }
        else{

        apiCallResult.value =
            `${data[0].day}.${data[0].month}.${data[0].year}: ${data[0].event}`;
        }
        }
        
        
    }

    // If neither checkbox was selected:
    else {

        apiCallResult.value =
            "You must choose an API option.";
    }

    });


