let clear = document.getElementById("clear")

let mortAmount = document.getElementById("mortAmount").value;

let mortTerm = document.getElementById("mortTerm").value;

let iRate = document.getElementById("iRate").value;

let mortType = document.querySelectorAll("input[name = mortType]");

let form = document.querySelector('form')

let resultValue = document.getElementById("result-values")

let mortTypeValue


mortType.forEach((mortType)=>{
    mortType.addEventListener("input", (e)=>{
        mortTypeValue = e.target.value
    })
})

function calculate(e){
    e.preventDefault()
    let mortAmount = document.getElementById("mortAmount").value;
    let mortTerm = document.getElementById("mortTerm").value;
    let iRate = document.getElementById("iRate").value;

    const durationToMonths = mortTerm * 12;
    const interestToMonths = (iRate / 100) / 12;
    const interestByDuration = Math.pow((1 + interestToMonths), durationToMonths);
    const monthlyMortgage = mortAmount * ((interestToMonths * interestByDuration)/(interestByDuration - 1));
    const yearlyMortgage = monthlyMortgage * 12 * mortTerm;

    const termInterestOnly = yearlyMortgage - mortAmount;
    const monthlyInterestOnly = mortAmount * interestToMonths
    


    if(mortTypeValue === 'Repayment'){
        resultValue.innerHTML = `
        <p>Your monthly repayments</p>
            <h1 id="monthly-repayment-value">£${monthlyMortgage.toFixed(2)}</h1>
            <p>Total you'll repay over the term</p>
            <h5 id="term-repayment-value">£${yearlyMortgage.toFixed(2)}</h5>
        `
    }

    else {
        resultValue.innerHTML = `
        <p>Your monthly interest</p>
            <h1 id="monthly-interest-value">£${monthlyInterestOnly.toFixed(2)}</h1>
            <p>Total interest you'll repay over the term</p>
            <h5 id="term-interest-value">£${termInterestOnly.toFixed(2)}</h5>
        `
    }

    document.getElementById("results").classList.remove("hide");
    document.getElementById("instruction").classList.add("hide");
}

form.addEventListener("submit", (e)=>{
    calculate(e)
})

clear.addEventListener("click", ()=>{
    let mortAmount = document.getElementById("mortAmount").value = "";

    let mortTerm = document.getElementById("mortTerm").value = "";

    let iRate = document.getElementById("iRate").value = "";

    mortType.forEach((mortType)=>{
        mortType.checked = false;
    })

    document.getElementById("results").classList.add("hide");
    document.getElementById("instruction").classList.remove("hide");
})

