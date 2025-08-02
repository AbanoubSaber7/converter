// Digital Storage Units Converter

const units = {
    bit: { value: 1, label: 'Bit (b)' },
    byte: { value: 8, label: 'Byte (B)' },
    kb: { value: 8 * 1024, label: 'Kilobyte (KB)' },
    mb: { value: 8 * 1024 * 1024, label: 'Megabyte (MB)' },
    gb: { value: 8 * 1024 * 1024 * 1024, label: 'Gigabyte (GB)' }
};

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  });

    // Converter logic
    const swapIcon = document.querySelector('.swap-icon');
    const valueInput = document.getElementById('value');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');

    if (swapIcon) swapIcon.addEventListener('click', swapUnits);
    if (valueInput) {
        valueInput.addEventListener('input', validateInput);
        valueInput.addEventListener('input', debounce(convertStorage, 500));
    }
    if (fromUnit) fromUnit.addEventListener('change', convertStorage);
    if (toUnit) toUnit.addEventListener('change', convertStorage);
;

function swapUnits() {
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    [fromUnit.value, toUnit.value] = [toUnit.value, fromUnit.value];
    convertStorage();
}

function validateInput(e) {
    if (e.target.value < 0) {
        e.target.value = 0;
    }
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

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

function formatNumber(num) {
    if (num === 0) return '0';
    if (num < 0.0001 || num > 999999999) return num.toExponential(4);
    return num.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4
    });
}
