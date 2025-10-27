let myChart = null;

function calculateLoan() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100 / 12;
    const years = parseInt(document.getElementById('years').value);
    const periods = years * 12;
    
    if (isNaN(principal) || isNaN(rate) || isNaN(years) || periods === 0) {
        return;
    }
    
    const monthlyPayment = principal * (rate * Math.pow(1 + rate, periods)) / (Math.pow(1 + rate, periods) - 1);
    const totalPayment = monthlyPayment * periods;
    const totalInterest = totalPayment - principal;
    
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `
        <div class="row">
            <span class="k">Monthly Payment:</span>
            <span class="v">$${monthlyPayment.toFixed(2)}</span>
        </div>
        <div class="row">
            <span class="k">Total Payments:</span>
            <span class="v">$${totalPayment.toFixed(2)}</span>
        </div>
        <div class="highlight">
            <div class="row">
                <span class="k">Total Interest Paid:</span>
                <span class="v">$${totalInterest.toFixed(2)}</span>
            </div>
        </div>
    `;
    
    // Show and update the pie chart
    updatePieChart(principal, totalInterest);
}

function updatePieChart(principal, totalInterest) {
    const chartContainer = document.getElementById('chartContainer');
    chartContainer.style.display = 'block';
    
    const ctx = document.getElementById('loanChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (myChart) {
        myChart.destroy();
    }
    
    // Create new pie chart
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal Amount', 'Total Interest Paid'],
            datasets: [{
                data: [principal, totalInterest],
                backgroundColor: [
                    '#2563eb',  // Blue for principal
                    '#f59e0b'   // Orange for interest
                ],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 13,
                            family: 'Inter, system-ui, sans-serif'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return label + ': $' + value.toFixed(2) + ' (' + percentage + '%)';
                        }
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    bodyFont: {
                        size: 13,
                        family: 'Inter, system-ui, sans-serif'
                    },
                    displayColors: true
                }
            }
        }
    });
}

window.onload = function() {
    const form = document.getElementById('loanForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateLoan();
        });
    }
};
