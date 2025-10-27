function calculateDownPayment() {
    const homePrice = parseFloat(document.getElementById('homePrice').value);
    const downPaymentPercent = parseFloat(document.getElementById('downPaymentPercent').value);
    const closingCostsPercent = parseFloat(document.getElementById('closingCostsPercent').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const loanTerm = parseInt(document.getElementById('loanTerm').value) * 12;
    
    const downPaymentAmount = homePrice * (downPaymentPercent / 100);
    const closingCosts = homePrice * (closingCostsPercent / 100);
    const loanAmount = homePrice - downPaymentAmount;
    const monthlyPayment = loanAmount * (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
    const cashNeeded = downPaymentAmount + closingCosts;
    
    document.getElementById('downPaymentAmount').textContent = '$' + downPaymentAmount.toFixed(2);
    document.getElementById('closingCosts').textContent = '$' + closingCosts.toFixed(2);
    document.getElementById('loanAmount').textContent = '$' + loanAmount.toFixed(2);
    document.getElementById('monthlyPayment').textContent = '$' + monthlyPayment.toFixed(2);
    document.getElementById('cashNeeded').textContent = '$' + cashNeeded.toFixed(2);
}

window.onload = function() {
    calculateDownPayment();
};
