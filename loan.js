function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmountInput').value);
    const years = parseInt(document.getElementById('loanTermYears').value) || 0;
    const months = parseInt(document.getElementById('loanTermMonths').value) || 0;
    const loanTerm = years * 12 + months;
    const interestRate = parseFloat(document.getElementById('loanInterestRate').value) / 100 / 12;
    
    if (isNaN(loanAmount) || isNaN(loanTerm) || isNaN(interestRate) || loanTerm === 0) {
        return;
    }
    
    const monthlyPayment = loanAmount * (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;
    
    document.getElementById('loanPayment').textContent = '$' + monthlyPayment.toFixed(2);
    document.getElementById('totalPayments').textContent = '$' + totalPayment.toFixed(2);
    document.getElementById('loanTotalInterest').textContent = '$' + totalInterest.toFixed(2);
    
    document.getElementById('loanSummaryAmount').textContent = '$' + loanAmount.toFixed(2);
    document.getElementById('loanSummaryRate').textContent = (interestRate * 12 * 100).toFixed(2) + '%';
    document.getElementById('loanSummaryTerm').textContent = years + ' years' + (months > 0 ? ' ' + months + ' months' : '');
    document.getElementById('loanSummaryPayments').textContent = loanTerm;
    document.getElementById('loanSummaryTotalInterest').textContent = '$' + totalInterest.toFixed(2);
    
    const today = new Date();
    const payoffDate = new Date(today.getFullYear(), today.getMonth() + loanTerm, today.getDate());
    const months_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    document.getElementById('loanPayoffDate').textContent = months_short[payoffDate.getMonth()] + '. ' + payoffDate.getFullYear();
    
    generateAmortizationSchedule(loanAmount, monthlyPayment, interestRate, loanTerm);
}

function generateAmortizationSchedule(principal, payment, rate, periods) {
    const tbody = document.getElementById('loanScheduleBody');
    tbody.innerHTML = '';
    
    let balance = principal;
    const today = new Date();
    
    for (let i = 1; i <= Math.min(periods, 12); i++) {
        const interestPayment = balance * rate;
        const principalPayment = payment - interestPayment;
        balance -= principalPayment;
        
        const paymentDate = new Date(today.getFullYear(), today.getMonth() + i, today.getDate());
        const dateStr = (paymentDate.getMonth() + 1) + '/' + paymentDate.getDate() + '/' + paymentDate.getFullYear();
        
        const row = tbody.insertRow();
        row.insertCell(0).textContent = i;
        row.insertCell(1).textContent = dateStr;
        row.insertCell(2).textContent = '$' + interestPayment.toFixed(2);
        row.insertCell(3).textContent = '$' + principalPayment.toFixed(2);
        row.insertCell(4).textContent = '$' + Math.max(0, balance).toFixed(2);
    }
}

function clearLoan() {
    document.getElementById('loanAmountInput').value = '';
    document.getElementById('loanTermYears').value = '';
    document.getElementById('loanTermMonths').value = '';
    document.getElementById('loanInterestRate').value = '';
    
    document.getElementById('loanPayment').textContent = '$0.00';
    document.getElementById('totalPayments').textContent = '$0.00';
    document.getElementById('loanTotalInterest').textContent = '$0.00';
    document.getElementById('loanSummaryAmount').textContent = '$0.00';
    document.getElementById('loanSummaryRate').textContent = '0.00%';
    document.getElementById('loanSummaryTerm').textContent = '0 years';
    document.getElementById('loanSummaryPayments').textContent = '0';
    document.getElementById('loanSummaryTotalInterest').textContent = '$0.00';
    document.getElementById('loanPayoffDate').textContent = '';
    
    document.getElementById('loanScheduleBody').innerHTML = '';
}

window.onload = function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateLoan();
        });
    }
};
