function calculateDownPayment() {
  const homePrice = parseFloat(document.getElementById('homePrice').value) || 0;
  const downPaymentPercent = parseFloat(document.getElementById('downPaymentPercent').value) || 0;
  
  const downPaymentAmount = homePrice * (downPaymentPercent / 100);
  const loanAmount = homePrice - downPaymentAmount;
  const closingCosts = homePrice * 0.03;
  
  document.getElementById('downPayment').textContent = '$' + downPaymentAmount.toLocaleString('en-US', {maximumFractionDigits: 0});
  document.getElementById('displayHomePrice').textContent = '$' + homePrice.toLocaleString('en-US', {maximumFractionDigits: 0});
  document.getElementById('displayPercent').textContent = downPaymentPercent.toFixed(0) + '%';
  document.getElementById('loanAmount').textContent = '$' + loanAmount.toLocaleString('en-US', {maximumFractionDigits: 0});
  document.getElementById('closingCosts').textContent = '$' + closingCosts.toLocaleString('en-US', {maximumFractionDigits: 0});
}

function resetDownPayment() {
  document.getElementById('homePrice').value = '350000';
  document.getElementById('downPaymentPercent').value = '20';
  calculateDownPayment();
}

window.onload = function() {
  calculateDownPayment();
};

const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateDownPayment();
  });
  
  const calculateButton = form.querySelector('button[type="submit"]');
  if (calculateButton) {
    calculateButton.addEventListener('click', function(e) {
      e.preventDefault();
      calculateDownPayment();
    });
  }
}

const resetButton = document.querySelectorAll('button')[1];
if (resetButton) {
  resetButton.addEventListener('click', resetDownPayment);
}
