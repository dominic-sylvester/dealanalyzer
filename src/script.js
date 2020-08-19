class MortgageCalculator {
    constructor(){

    }
}

document.getElementById('calculate').addEventListener('click', function() {
    //break all of this into functions
    let purchasePrice = document.getElementById('purchasePrice').value;
    let ltv = document.getElementById('ltv').value / 100;
    let downPmt = document.getElementById('downPmt');
    let closingCost = document.getElementById('closingCost').value;
    let principalDOM = document.getElementById('principal');
    let interestRate = document.getElementById('interestRate').value / 100;
    let term = document.getElementById('term').value;
    let payment = document.getElementById('payment');
    clearCalculations(payment, downPmt);
    downPmt.innerHTML += calculateDownPmt(purchasePrice, ltv);
    payment.innerHTML += calculatePayment(purchasePrice, ltv, interestRate, term) + ' per month';
});

function calculateDownPmt(purchasePrice, ltv){
    return purchasePrice * ltv;
}

function calculatePayment(purchasePrice, ltv, interestRate, term ){
    let n = term * 12;
    let periodicInterestRate = interestRate / 12;
    let startingPrincipal = purchasePrice - (purchasePrice * ltv);
    let discountRate = (((1 + periodicInterestRate) * n) - 1) / (periodicInterestRate * (1 + periodicInterestRate) * n);
    let paymentAmount = Math.round(startingPrincipal / discountRate);
    return Math.round(startingPrincipal / ((((1+periodicInterestRate) ** n) - 1) / (periodicInterestRate * (1 + periodicInterestRate) ** n)));
}

function clearCalculations(payment, downPmt){
    payment.innerHTML = '$';
    downPmt.innerHTML = '$'
}

function clearAll(){

}