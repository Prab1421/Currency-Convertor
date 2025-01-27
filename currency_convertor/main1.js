console.log("Main.js is working");

const populate = async (base, value) => {
    try {
        let mystr = "";
        const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_DOVAwQHQusMmeyo3A8i3ZN8z4gHjuFAxeF0rkdLt&base_currency=${base}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch data from the API.");
        }
        const rJson = await response.json();
        console.log(rJson);

        let srNo = 1; 
        for (let key in rJson.data) {
            if (rJson.data.hasOwnProperty(key)) {
                const currencyData = rJson.data[key];
                mystr += `<tr>
                    <td>${srNo}</td>
                    <td>${base}</td> <!-- Display the base currency for all rows -->
                    <td>${currencyData.code}</td>
                    <td>${(currencyData.value * value).toFixed(2)}</td>
                </tr>`;
                srNo++; 
            }
        }

        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = mystr;

        document.querySelector(".output").style.display = "block"; 
    } catch (error) {
        console.error("Error:", error.message);
        alert("An error occurred while fetching the currency data. Please try again later.");
    }
};

const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Button is clicked");

    const value = parseInt(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;

    if (isNaN(value) || value <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    populate(currency, value);
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
}