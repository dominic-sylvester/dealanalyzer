class MortgageCalculator {
    constructor(){
        this.address = document.getElementById('address').value;
        this.purchasePrice = document.getElementById('purchasePrice').value;
        this.ltv = document.getElementById('ltv').value / 100;
        this.downPmt = this.calculateDownPmt(this.purchasePrice, this.ltv);
        this.principal = this.calculatePrincipal(this.ltv, this.purchasePrice);
        this.closingCost = this.calculateClosingCost(this.purchasePrice);
        this.interestRate = document.getElementById('interestRate').value / 100;
        this.term = document.getElementById('term').value;
        this.numberOfPayments = this.calculateNumberOfPayments(this.term);
        this.monthlyPayment = parseInt(this.calculateMonthlyPayment(this.principal, this.interestRate, this.numberOfPayments));
    }
    //METHODS
    calculateDownPmt(purchasePrice, ltv){
        return purchasePrice * ltv;
    }
    calculateClosingCost(purchasePrice){
        if(document.getElementById('closingCostPercentage').checked === true){
            return purchasePrice * (document.getElementById('closingCost').value / 100);
        } else if (document.getElementById('closingCostDollars').checked === true){
            return document.getElementById('closingCost').value;
        }
        else alert('Please select dollars or percentage for closing cost');
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
    constructor(mortgageCalculator){
        this.mortgageCalculator = mortgageCalculator;
        this.grossRents = parseInt(document.getElementById('grossRents').value);
        this.managementFee = this.calculateManagementFee(this.grossRents);
        this.propertyTax = parseInt(this.calculatePropertyTax(this.mortgageCalculator.purchasePrice));
        this.insurance = parseInt(document.getElementById('insurance').value);
        this.utilities = parseInt(document.getElementById('utilities').value);
        this.vacancyReserve = parseInt(this.calculateVacancyReserve(this.grossRents));
        this.maintenanceReserve = parseInt(this.calculateMaintenanceReserve(this.grossRents));
        this.operatingExpenses = parseInt(this.calculateOperatingExpenses(this.managementFee, this.propertyTax, this.insurance, this.utilities, this.vacancyReserve, this.maintenanceReserve));
        this.noiLessCods = parseInt(this.calculateNoiLessCods(this.grossRents, this.operatingExpenses));
        this.noi;
    }
    calculateManagementFee(grossRents){
        if(document.getElementById('managementFeePercentage').checked === true){
            return grossRents * ((document.getElementById('managementFee').value / 100));
        } else if (document.getElementById('managementFeeDollars').checked === true){
            return document.getElementById('managementFee').value;
        }
        else alert('Please select dollars or percentage for closing cost');
    }
    calculatePropertyTax(purchasePrice){
        if(document.getElementById('propertyTaxPercentage').checked === true){
            return purchasePrice * ((document.getElementById('propertyTax').value) / 100) / 12;
        } else if (document.getElementById('propertyTaxDollars').checked === true){
            return document.getElementById('propertyTax').value;
        }
        else alert('Please select dollars or percentage for closing cost');
    } 
    calculateVacancyReserve(grossRents){
        return (grossRents * 0.05) / 12;
    }
    calculateMaintenanceReserve(grossRents){
        return (grossRents * 0.1) / 12;
    }
    calculateOperatingExpenses(managementFee, propertyTax, insurance, utilities, vacancyReserve, maintenanceReserve){
        //change this to take a list of args and run parse int on forEach
        return parseInt(managementFee) + parseInt(propertyTax) + parseInt(insurance) + parseInt(utilities) + parseInt(maintenanceReserve) + parseInt(vacancyReserve);
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
    document.getElementById('ltvReport').textContent = (this.mortgageCalculator.ltv * 100).toFixed(2) + '%';
    document.getElementById('downPmtReport').textContent = '$' + (this.mortgageCalculator.downPmt).toFixed(0);
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

document.getElementById('calculate').addEventListener('click', ()=> {
    let mortgageCalculator = new MortgageCalculator();
    let proformaCalculator = new ProformaCalculator(mortgageCalculator);
    proformaCalculator.noi = proformaCalculator.calculateNoi(mortgageCalculator.monthlyPayment);
    let report = new Report(mortgageCalculator, proformaCalculator);
    document.querySelector('.report').style.right = '0';
})

document.getElementById('clear').addEventListener('click', ()=> {
    clearAll();
})

function clearAll(){
    let allFields = [...document.querySelectorAll('.reportField')];
    allFields.forEach((element) => {
        element.textContent = ''
        element.value = '';
    });
}