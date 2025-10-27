function calculateDownPayment() {
    const homePrice = parseFloat(document.getElementById('dpHomePrice').value);
    const downPaymentPercent = parseFloat(document.getElementById('dpDownPaymentPercent').value);
    const closingCostPercent = parseFloat(document.getElementById('dpClosingCostPercent').value);
    const interestRate = parseFloat(document.getElementById('dpInterestRate').value) / 100 / 12;
    const loanTermSelect = document.getElementById('dpLoanTerm');
    const loanTermYears = parseInt(loanTermSelect.value.split(' ')[0]);
    const loanTerm = loanTermYears * 12;
    
    if (isNaN(homePrice) || isNaN(downPaymentPercent) || isNaN(closingCostPercent) || isNaN(interestRate) || isNaN(loanTerm)) {
        return;
    }
    
    const downPaymentAmount = homePrice * (downPaymentPercent / 100);
    const closingCosts = homePrice * (closingCostPercent / 100);
    const loanAmount = homePrice - downPaymentAmount;
    const monthlyPayment = loanAmount * (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
    const cashNeeded = downPaymentAmount + closingCosts;
    const pmiRequired = downPaymentPercent < 20 ? 'Yes' : 'No';
    
    document.getElementById('dpDownPaymentAmount').textContent = '$' + downPaymentAmount.toFixed(2);
    document.getElementById('dpDownPayment').textContent = '$' + downPaymentAmount.toFixed(2);
    document.getElementById('dpClosingCost').textContent = '$' + closingCosts.toFixed(2);
    document.getElementById('dpLoanAmount').textContent = '$' + loanAmount.toFixed(2);
    document.getElementById('dpMonthlyPayment').textContent = '$' + monthlyPayment.toFixed(2);
    
    document.getElementById('dpSummaryHomePrice').textContent = '$' + homePrice.toFixed(2);
    document.getElementById('dpSummaryPercent').textContent = downPaymentPercent.toFixed(0) + '%';
    document.getElementById('dpSummaryAmount').textContent = '$' + downPaymentAmount.toFixed(2);
    document.getElementById('dpSummaryClosing').textContent = '$' + closingCosts.toFixed(2);
    document.getElementById('dpSummaryTotalCash').textContent = '$' + cashNeeded.toFixed(2);
    document.getElementById('dpSummaryLoan').textContent = '$' + loanAmount.toFixed(2);
    document.getElementById('dpSummaryMonthly').textContent = '$' + monthlyPayment.toFixed(2);
    document.getElementById('dpPMIStatus').textContent = pmiRequired;
}

function clearDownPayment() {
    document.getElementById('dpHomePrice').value = '';
    document.getElementById('dpDownPaymentPercent').value = '';
    document.getElementById('dpClosingCostPercent').value = '';
    document.getElementById('dpInterestRate').value = '';
    
    document.getElementById('dpDownPaymentAmount').textContent = '$0.00';
    document.getElementById('dpDownPayment').textContent = '$0.00';
    document.getElementById('dpClosingCost').textContent = '$0.00';
    document.getElementById('dpLoanAmount').textContent = '$0.00';
    document.getElementById('dpMonthlyPayment').textContent = '$0.00';
    document.getElementById('dpSummaryHomePrice').textContent = '$0.00';
    document.getElementById('dpSummaryPercent').textContent = '0%';
    document.getElementById('dpSummaryAmount').textContent = '$0.00';
    document.getElementById('dpSummaryClosing').textContent = '$0.00';
    document.getElementById('dpSummaryTotalCash').textContent = '$0.00';
    document.getElementById('dpSummaryLoan').textContent = '$0.00';
    document.getElementById('dpSummaryMonthly').textContent = '$0.00';
    document.getElementById('dpPMIStatus').textContent = 'No';
}

window.onload = function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateDownPayment();
        });
    }
};
