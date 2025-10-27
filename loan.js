function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const loanTerm = parseInt(document.getElementById('loanTerm').value) * 12;
    
    const monthlyPayment = loanAmount * (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;
    
    document.getElementById('monthlyPayment').textContent = '$' + monthlyPayment.toFixed(2);
    document.getElementById('totalPayment').textContent = '$' + totalPayment.toFixed(2);
    document.getElementById('totalInterest').textContent = '$' + totalInterest.toFixed(2);
    document.getElementById('totalPrincipal').textContent = '$' + loanAmount.toFixed(2);
}

window.onload = function() {
    calculateLoan();
};
