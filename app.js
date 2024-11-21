const apiKey = 'fca_live_i8soNbWHYur23yEjzq9yu7kcAfIJfDQNQhnzZ0Db';
const BASE_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



document.addEventListener("load", () => {
   updateExchangeRate();
});

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    if (img) {
        img.src = newSrc;
    }
};



btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }
    const URL = `${BASE_URL}&currencies=${fromCurr.value},${toCurr.value}`;
        let response = await fetch(URL);
        let data = await response.json();
        
        // Accessing the rates correctly
       
        let rate = data.data[toCurr.value];
        

        
        // Calculate the converted amount
        let finalAmount = amtVal * rate;
        msg.innerText= `${amtVal} ${fromCurr.value}= ${finalAmount} ${toCurr.value}`
        
    
        console.error("Error fetching the data:", error);
    });