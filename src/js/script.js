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
        this.pmi = parseInt(this.calculatePMI(this.mortgageCalculator.purchasePrice, this.mortgageCalculator.ltv));
        this.utilities = parseInt(document.getElementById('utilities').value);
        this.vacancyReserve = parseInt(this.calculateVacancyReserve(this.grossRents));
        this.maintenanceReserve = parseInt(this.calculateMaintenanceReserve(this.grossRents));
        this.operatingExpenses = parseInt(this.calculateOperatingExpenses(this.managementFee, this.propertyTax, this.insurance, this.utilities, this.vacancyReserve, this.maintenanceReserve, this.pmi));
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
    calculatePMI(purchasePrice, ltv){
        if(ltv < 0.2){
            return (purchasePrice * 0.005) / 12
        }
        else{
            return 0;
        }
    }
    calculateVacancyReserve(grossRents){
        return (grossRents * 0.05);
    }
    calculateMaintenanceReserve(grossRents){
        return (grossRents * 0.1);
    }
    calculateOperatingExpenses(managementFee, propertyTax, insurance, utilities, vacancyReserve, maintenanceReserve, pmi){
        //change this to take a list of args and run parse int on forEach
        return parseInt(managementFee) + parseInt(propertyTax) + parseInt(insurance) + parseInt(utilities) + parseInt(maintenanceReserve) + parseInt(vacancyReserve) + parseInt(pmi);
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
    document.getElementById('pmiReport').textContent = '$' + this.proformaCalculator.pmi;
    document.getElementById('utilitiesReport').textContent = '$' + this.proformaCalculator.utilities;
    document.getElementById('vacancyReport').textContent = '$' + (this.proformaCalculator.vacancyReserve);
    document.getElementById('maintenanceReport').textContent = '$' + (this.proformaCalculator.maintenanceReserve);
    document.getElementById('opExReport').textContent = '$' + this.proformaCalculator.operatingExpenses;
    document.getElementById('noiLessCodsReport').textContent = '$' + this.proformaCalculator.noiLessCods;
    document.getElementById('noiReport').textContent = '$' + this.proformaCalculator.noi;
 }
}

class Scorecard {
    constructor(mortgageCalculator, proformaCalculator){
        this.mortgageCalculator = mortgageCalculator;
        this.proformaCalculator = proformaCalculator;
        this.cashOnCash = this.calculateCashOnCash();
        this.capRate = this.calculateCapRate();
        this.percentage = this.calculatePercentage();
        this.monthlyCashflow = this.proformaCalculator.noi;
        this.yearlyCashflow = this.monthlyCashflow * 12;
        this.buildReport();

    }
    calculateCashOnCash(){
        //returns the cash on cash return for the first year as a percentage 
        //cash on cash is calculated by total cash invested, including down payment amount, closing cost amount, and amount paid toward expenses (including debt service)
        return Math.round(((this.proformaCalculator.noi * 12) / (this.mortgageCalculator.downPmt + this.mortgageCalculator.closingCost) * 100)); 
    }
    calculateCapRate(){
        //Cap rate is the percentage value of NOI less cost of debt service (mortgage) divided by the property value, in this case purchase price
        return Math.round(((this.proformaCalculator.noiLessCods * 12) / this.mortgageCalculator.purchasePrice) * 100);
    }
    calculatePercentage(){
        return (this.proformaCalculator.grossRents / this.mortgageCalculator.purchasePrice) * 100;
    }
    calculateGrade(){
        let percentageWeight = 0.5;
        let capRateWeight = 0.5;
        let capRateScore = this.calculateCapRateScore(capRateWeight);
        let percentageScore = this.calculatePercentageScore(percentageWeight);
        // let cashOnCashScore = this.calculateCashOnCashScore(cashOnCashWeight);
        // let monthlyCashflowScore = this.calculateMonthlyCashflowScore(monthlyCashflowWeight);
        let gradeScore = capRateScore + percentageScore;
        let grade;
        if(gradeScore >= 90){
            grade = "A";
            document.getElementById('scorecard').style.backgroundColor = "rgb(73, 230, 52)";
        }
        else if(gradeScore >= 75 && gradeScore < 90){
            grade = "B"; 
            document.getElementById('scorecard').style.backgroundColor = "#2444fd";
        }
        else if(gradeScore >= 60 && gradeScore < 75){
            grade = "C";
            document.getElementById('scorecard').style.backgroundColor = "#ffc400";
        }
        else if(gradeScore >= 50 && gradeScore < 60){
            grade = "D";
            document.getElementById('scorecard').style.backgroundColor = "rgb(248, 154, 66)"
        }
        else if(gradeScore < 50){
            grade = "F"; 
            document.getElementById('scorecard').style.backgroundColor = "#f53030"
        }
        return grade;
    }
    calculateCashOnCashScore(cashOnCashWeight){
        let cashOnCashScore;
        if(this.cashOnCash > 80){
            cashOnCashScore = 100;
        }
        else if(this.cashOnCash >= 50 && this.cashOnCash < 80){
            cashOnCashScore = 90;
        }
        else if(this.cashOnCash >= 25 && this.cashOnCash < 50){
            cashOnCashScore = 80;
        }
        else if(this.cashOnCash >= 15 && this.cashOnCash < 25){
            cashOnCashScore = 70;
        }
        else if(this.cashOnCash >= 8 && this.cashOnCash < 15){
            cashOnCashScore = 60;
        }
        else if(this.cashOnCash >= 3 && this.cashOnCash < 8){
            cashOnCashScore = 50;
        }
        else if(this.cashOnCash < 3){
            cashOnCashScore = 0;
        }
        return cashOnCashScore * cashOnCashWeight;
    }
    calculateCapRateScore(capRateWeight){
        let capRateScore;
        if(this.capRate > 10){
            capRateScore = 100;
        }
        else if(this.capRate >= 8 && this.capRate < 10){
            capRateScore = 90;
        }
        else if(this.capRate >= 6 && this.capRate < 8){
            capRateScore = 80;
        }
        else if(this.capRate >= 4 && this.capRate < 6){
            capRateScore = 70;
        }
        else if(this.capRate >= 3 && this.capRate < 4){
            capRateScore = 60;
        }
        else if(this.capRate >= 2 && this.capRate < 3){
            capRateScore = 50;
        }
        else if(this.capRate < 2){
            capRateScore = 0;
        }
        return capRateScore * capRateWeight;
    }
    calculatePercentageScore(percentageWeight){
        let percentageScore;
        if(this.percentage >= 1.5){
            percentageScore = 100;
        }
        else if(this.percentage < 1.5 && this.percentage > 1.2){
            percentageScore = 90;
        }
        else if(this.percentage <= 1.2 && this.percentage >= 1.0){
            percentageScore = 85;
        }
        else if(this.percentage < 1.0 && this.percentage >= 0.9){
            percentageScore = 80;
        }
        else if(this.percentage < 0.9 && this.percentage >= 0.8){
            percentageScore = 70;
        }
        else if(this.percentage < 0.8 && this.percentage >= 0.7){
            percentageScore = 40;
        }
        else if(this.percentage < 0.7 && this.percentage >= 0.6){
            percentageScore = 10;
        }
        else if(this.percentage < 0.6){
            percentageScore = 0;
        }
        return percentageScore * percentageWeight; 
    }
    calculateMonthlyCashflowScore(monthlyCashflowWeight){
        let monthlyCashflowScore;
        if(this.monthlyCashflow > 800){
            monthlyCashflowScore = 100;
        }
        else if(this.monthlyCashflow >= 650 && this.monthlyCashflow < 800){
            monthlyCashflowScore = 90;
        }
        else if(this.monthlyCashflow >= 400 && this.monthlyCashflow < 650){
            monthlyCashflowScore = 80;
        }
        else if(this.monthlyCashflow >= 200 && this.monthlyCashflow < 400){
            monthlyCashflowScore = 70;
        }
        else if(this.monthlyCashflow >= 100 && this.monthlyCashflow < 200){
            monthlyCashflowScore = 60;
        }
        else if(this.monthlyCashflow >= 0 && this.monthlyCashflow < 100){
            monthlyCashflowScore = 50;
        }
        else if(this.monthlyCashflow < 0){
            monthlyCashflowScore = 0;
        }
        return monthlyCashflowScore * monthlyCashflowWeight;
    }
    buildReport(){
        document.getElementById('cashOnCash').textContent = `Cash on cash return: ${this.cashOnCash}%`;
        document.getElementById('capRate').textContent = `Cap rate: ${this.capRate}%`;
        document.getElementById('monthlyCashflow').textContent = `Monthly cash flow: $${this.monthlyCashflow}`;
        document.getElementById('yearlyCashflow').textContent = `Yearly cash flow: $${this.yearlyCashflow}`;
        document.getElementById('grade').textContent = this.calculateGrade();
    }
}

document.getElementById('calculate').addEventListener('click', ()=> {
    let mortgageCalculator = new MortgageCalculator();
    let proformaCalculator = new ProformaCalculator(mortgageCalculator);
    proformaCalculator.noi = proformaCalculator.calculateNoi(mortgageCalculator.monthlyPayment);
    let report = new Report(mortgageCalculator, proformaCalculator);
    document.querySelector('.report').style.right = '0';
    let scorecard = new Scorecard(mortgageCalculator, proformaCalculator);
})

document.getElementById('clear').addEventListener('click', ()=> {
    clearAll();
})

document.getElementById('close').addEventListener('click', () => {
    document.querySelector('.modal').style.display = "none";
})

document.getElementById('reportCardBtn').addEventListener('click', ()=> {
    document.querySelector('.modal').style.display = "flex";
})

function clearAll(){
    let allFields = [...document.querySelectorAll('.reportField')];
    allFields.forEach((element) => {
        element.textContent = ''
        element.value = '';
    });
}

