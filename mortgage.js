function calculateMortgage() {
    const homePrice = parseFloat(document.getElementById('homePrice').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const loanTerm = parseInt(document.getElementById('loanTerm').value) * 12;
    const propertyTax = parseFloat(document.getElementById('propertyTax').value) / 12;
    const homeInsurance = parseFloat(document.getElementById('homeInsurance').value) / 12;
    const pmi = parseFloat(document.getElementById('pmi').value);
    const hoa = parseFloat(document.getElementById('hoa').value);
    
    const loanAmount = homePrice - downPayment;
    const principalInterest = loanAmount * (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
    
    document.getElementById('principalInterest').textContent = '$' + principalInterest.toFixed(2);
    document.getElementById('monthlyTax').textContent = '$' + propertyTax.toFixed(2);
    document.getElementById('monthlyInsurance').textContent = '$' + homeInsurance.toFixed(2);
    document.getElementById('monthlyPMI').textContent = '$' + pmi.toFixed(2);
    document.getElementById('monthlyHOA').textContent = '$' + hoa.toFixed(2);
    
    const totalPayment = principalInterest + propertyTax + homeInsurance + pmi + hoa;
    document.getElementById('totalPayment').textContent = '$' + totalPayment.toFixed(2);
}

function drawPieChart() {
    const canvas = document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    
    const principalInterest = parseFloat(document.getElementById('principalInterest').textContent.replace('$', ''));
    const monthlyTax = parseFloat(document.getElementById('monthlyTax').textContent.replace('$', ''));
    const monthlyInsurance = parseFloat(document.getElementById('monthlyInsurance').textContent.replace('$', ''));
    const monthlyPMI = parseFloat(document.getElementById('monthlyPMI').textContent.replace('$', ''));
    const monthlyHOA = parseFloat(document.getElementById('monthlyHOA').textContent.replace('$', ''));
    
    const total = principalInterest + monthlyTax + monthlyInsurance + monthlyPMI + monthlyHOA;
    
    const data = [
        { label: 'Principal & Interest', value: principalInterest, color: '#4CAF50' },
        { label: 'Property Tax', value: monthlyTax, color: '#2196F3' },
        { label: 'Home Insurance', value: monthlyInsurance, color: '#FFC107' },
        { label: 'PMI', value: monthlyPMI, color: '#FF5722' },
        { label: 'HOA', value: monthlyHOA, color: '#9C27B0' }
    ];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach(item => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
        
        currentAngle += sliceAngle;
    });
}

document.getElementById('downPayment').addEventListener('input', function() {
    const homePrice = parseFloat(document.getElementById('homePrice').value);
    const downPayment = parseFloat(this.value);
    const percent = (downPayment / homePrice * 100).toFixed(2);
    document.getElementById('downPaymentPercent').value = percent;
});

document.getElementById('downPaymentPercent').addEventListener('input', function() {
    const homePrice = parseFloat(document.getElementById('homePrice').value);
    const percent = parseFloat(this.value);
    const downPayment = (homePrice * percent / 100).toFixed(0);
    document.getElementById('downPayment').value = downPayment;
});

window.onload = function() {
    calculateMortgage();
    drawPieChart();
};
