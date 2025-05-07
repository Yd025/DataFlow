// DOM Elements
const form = document.getElementById("propertyForm");
const rentSlider = document.getElementById("rentSlider");
const expensesSlider = document.getElementById("expensesSlider");
const mortgageSlider = document.getElementById("mortgageSlider");
const rentValue = document.getElementById("rentValue");
const expensesValue = document.getElementById("expensesValue");
const mortgageValue = document.getElementById("mortgageValue");
const cashFlowSpan = document.getElementById("cashFlow");
const roiSpan = document.getElementById("roi");
const csvUpload = document.getElementById("csvUpload");
const fileName = document.getElementById("fileName");

// CSV Upload Handler
csvUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        fileName.textContent = file.name;
        
        // Automatically upload the file when selected
        const formData = new FormData();
        formData.append("csvFile", file);

        fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.text())
            .then((data) => {
                alert(data);
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Upload failed.");
            });
    } else {
        fileName.textContent = "No file chosen";
    }
});

// Update sliders and form inputs
rentSlider.addEventListener("input", () => {
    rentValue.textContent = rentSlider.value;
    form.rent.value = rentSlider.value;
    updateResults();
});

expensesSlider.addEventListener("input", () => {
    expensesValue.textContent = expensesSlider.value;
    form.expenses.value = expensesSlider.value;
    updateResults();
});

mortgageSlider.addEventListener("input", () => {
    mortgageValue.textContent = mortgageSlider.value;
    form.mortgage.value = mortgageSlider.value;
    updateResults();
});

// Update form inputs when sliders change
form.addEventListener("input", updateResults);

// Calculate and display results
function calculateIRR(cashFlows, initialInvestment) {
    // IRR calculation using the Newton-Raphson method
    const tolerance = 0.0001;
    const maxIterations = 100;
    let guess = 0.1; // Initial guess of 10%

    for (let i = 0; i < maxIterations; i++) {
        let npv = -initialInvestment;
        let derivative = 0;

        for (let j = 0; j < cashFlows.length; j++) {
            npv += cashFlows[j] / Math.pow(1 + guess, j + 1);
            derivative -= (j + 1) * cashFlows[j] / Math.pow(1 + guess, j + 2);
        }

        const newGuess = guess - npv / derivative;
        
        if (Math.abs(newGuess - guess) < tolerance) {
            return (newGuess * 100).toFixed(2); // Convert to percentage
        }
        
        guess = newGuess;
    }

    return "N/A"; // Return N/A if IRR cannot be calculated
}

function updateResults() {
    const rent = Number(form.rent.value);
    const expenses = Number(form.expenses.value);
    const mortgage = Number(form.mortgage.value);
    const downPayment = Number(form.downPayment.value);
    const closingCosts = Number(form.closingCosts.value);
    const price = Number(form.price.value);

    // Calculate monthly cash flow
    const cashFlow = rent - expenses - mortgage;
    const annualCashFlow = cashFlow * 12;
    const totalInvestment = downPayment + closingCosts;
    const roi = ((annualCashFlow / totalInvestment) * 100).toFixed(2);

    // Calculate IRR
    // Assuming a 5-year holding period
    const holdingPeriod = 5;
    const cashFlows = [];
    
    // Initial investment (negative because it's money going out)
    cashFlows.push(-totalInvestment);
    
    // Annual cash flows
    for (let i = 0; i < holdingPeriod; i++) {
        cashFlows.push(annualCashFlow);
    }
    
    // Add sale proceeds at the end (assuming 3% annual appreciation)
    const appreciationRate = 0.03;
    const salePrice = price * Math.pow(1 + appreciationRate, holdingPeriod);
    const saleProceeds = salePrice - (price - downPayment); // Subtract remaining mortgage
    cashFlows.push(saleProceeds);

    const irr = calculateIRR(cashFlows, totalInvestment);

    // Update the display
    cashFlowSpan.textContent = cashFlow;
    roiSpan.textContent = roi;
    document.getElementById('irr').textContent = irr;
}

// Initial calculation
updateResults();