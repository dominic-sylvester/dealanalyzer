class MortgageCalculator {
    constructor(){
        this.address = document.getElementById('address').value;
        this.purchasePrice = document.getElementById('purchasePrice').value;
        this.ltv = document.getElementById('ltv').value / 100;
        this.downPmt = this.calculateDownPmt(this.purchasePrice, this.ltv);
        this.principal = this.calculatePrincipal(this.ltv, this.purchasePrice);
        this.closingCost = document.getElementById('closingCost').value;
        this.interestRate = document.getElementById('interestRate').value / 100;
        this.term = document.getElementById('term').value;
        this.numberOfPayments = this.calculateNumberOfPayments(this.term);
        this.monthlyPayment = parseInt(this.calculateMonthlyPayment(this.principal, this.interestRate, this.numberOfPayments));
    }
    //METHODS
    calculateDownPmt(purchasePrice, ltv){
        return purchasePrice * ltv;
    }
    calculateNumberOfPayments(term){
        return term * 12;
    }
    calculatePrincipal(ltv, purchasePrice){
        return purchasePrice - (purchasePrice * ltv);
    }
    calculateMonthlyPayment(principal, interestRate, numberOfPayments){
        let periodicInterestRate = interestRate / 12;
        let monthlyPayment = Math.round(principal /
        ((((1+periodicInterestRate) ** numberOfPayments) - 1) /
        (periodicInterestRate * (1 + periodicInterestRate) ** numberOfPayments)));
        console.log(monthlyPayment);
        return monthlyPayment;
    }
}

class ProformaCalculator {
    constructor(){
        this.grossRents = parseInt(document.getElementById('grossRents').value);
        this.managementFee = parseInt(document.getElementById('managementFee').value);
        this.propertyTax = parseInt(document.getElementById('propertyTax').value);
        this.insurance = parseInt(document.getElementById('insurance').value);
        this.utilities = parseInt(document.getElementById('utilities').value);
        this.vacancyReserve = this.calculateVacancyReserve(this.grossRents);
        this.maintenanceReserve = this.calculateMaintenanceReserve(this.grossRents);
        this.operatingExpenses = this.calculateOperatingExpenses(this.managementFee, this.propertyTax, this.insurance, this.utilities, this.vacancyReserve, this.maintenanceReserve);
        this.noiLessCods = this.calculateNoiLessCods(this.grossRents, this.operatingExpenses);
        this.noi;
    }
    calculateVacancyReserve(grossRents){
        return (grossRents * 0.05) / 12;
    }
    calculateMaintenanceReserve(grossRents){
        return (grossRents * 0.1) / 12;
    }
    calculateOperatingExpenses(managementFee, propertyTax, insurance, utilities, vacancyReserve, maintenanceReserve){
        return managementFee + propertyTax + insurance + utilities + maintenanceReserve + vacancyReserve;
    }
    calculateNoiLessCods(grossRents, operatingExpenses) {
        return grossRents - operatingExpenses;
    }
    calculateNoi(monthlyPayment){
        return this.grossRents - this.operatingExpenses - monthlyPayment;
    }  
}

class Report {
 constructor(mortgageCalculator, proformaCalculator){
     this.mortgageCalculator = mortgageCalculator;
     this.proformaCalculator = proformaCalculator;
     this.generateReport();
 }
 generateReport(){
    document.getElementById('addressReport').textContent = this.mortgageCalculator.address;
    document.getElementById('purchasePriceReport').textContent = '$' + this.mortgageCalculator.purchasePrice;
    document.getElementById('ltvReport').textContent = this.mortgageCalculator.ltv * 100 + '%';
    document.getElementById('downPmtReport').textContent = '$' + this.mortgageCalculator.downPmt;
    document.getElementById('closingCostReport').textContent = '$' + this.mortgageCalculator.closingCost;
    document.getElementById('principalReport').textContent = '$' + this.mortgageCalculator.principal;
    document.getElementById('interestRateReport').textContent = (this.mortgageCalculator.interestRate * 100).toFixed(2) + '%';
    document.getElementById('termReport').textContent = this.mortgageCalculator.term + ' years';
    document.getElementById('monthlyPaymentReport').textContent = '$' + this.mortgageCalculator.monthlyPayment;
    document.getElementById('grossRentReport').textContent = '$' + this.proformaCalculator.grossRents;
    document.getElementById('mgmtFeeReport').textContent = '$' + this.proformaCalculator.managementFee;
    document.getElementById('propertyTaxReport').textContent = '$' + this.proformaCalculator.propertyTax;
    document.getElementById('insuranceReport').textContent = '$' + this.proformaCalculator.insurance;
    document.getElementById('utilitiesReport').textContent = '$' + this.proformaCalculator.utilities;
    document.getElementById('vacancyReport').textContent = '$' + (this.proformaCalculator.vacancyReserve).toFixed(2);
    document.getElementById('maintenanceReport').textContent = '$' + (this.proformaCalculator.maintenanceReserve).toFixed(2);
    document.getElementById('opExReport').textContent = '$' + this.proformaCalculator.operatingExpenses;
    document.getElementById('noiLessCodsReport').textContent = '$' + this.proformaCalculator.noiLessCods;
    document.getElementById('noiReport').textContent = '$' + this.proformaCalculator.noi;
 }
}

function calculatePayment(purchasePrice, ltv, interestRate, term ){
    
}

document.getElementById('calculate').addEventListener('click', ()=> {
    let mortgageCalculator = new MortgageCalculator();
    let proformaCalculator = new ProformaCalculator(mortgageCalculator);
    proformaCalculator.noi = proformaCalculator.calculateNoi(mortgageCalculator.monthlyPayment);
    let report = new Report(mortgageCalculator, proformaCalculator);
})