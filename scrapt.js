// Digital Storage Units Converter

// Unit conversion rates
const units = {
    bit: { value: 1, label: 'Bit (b)' },
    byte: { value: 8, label: 'Byte (B)' },
    kb: { value: 8 * 1024, label: 'Kilobyte (KB)' },
    mb: { value: 8 * 1024 * 1024, label: 'Megabyte (MB)' },
    gb: { value: 8 * 1024 * 1024 * 1024, label: 'Gigabyte (GB)' }
};

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add swap functionality
    const swapIcon = document.querySelector('.swap-icon');
    swapIcon.addEventListener('click', swapUnits);

    // Add input validation
    const valueInput = document.getElementById('value');
    valueInput.addEventListener('input', validateInput);

    // Add automatic conversion on input change
    valueInput.addEventListener('input', debounce(convertStorage, 500));
    document.getElementById('fromUnit').addEventListener('change', convertStorage);
    document.getElementById('toUnit').addEventListener('change', convertStorage);
});

// Swap units function
function swapUnits() {
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    [fromUnit.value, toUnit.value] = [toUnit.value, fromUnit.value];
    convertStorage();
}

// Input validation function
function validateInput(e) {
    const value = e.target.value;
    if (value < 0) {
        e.target.value = 0;
    }
}

// Debounce function to limit conversion rate
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Main conversion function
function convertStorage() {
    const input = parseFloat(document.getElementById('value').value);
    const from = document.getElementById('fromUnit').value;
    const to = document.getElementById('toUnit').value;
    const resultElement = document.getElementById('result');

    if (!input && input !== 0) {
        resultElement.innerHTML = '<span style="color: #666;">Enter a value to convert</span>';
        return;
    }

    const result = (input * units[from].value) / units[to].value;
    const formattedResult = formatNumber(result);
    
    resultElement.innerHTML = `
        <span style="color: #3498db">${formatNumber(input)} ${units[from].label}</span>
        <span style="color: #666"> = </span>
        <span style="color: #2ecc71">${formattedResult} ${units[to].label}</span>
    `;
}

// Number formatting function
function formatNumber(num) {
    if (num === 0) return '0';
    if (num < 0.0001) return num.toExponential(4);
    if (num > 999999999) return num.toExponential(4);
    return num.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4
    });
}
