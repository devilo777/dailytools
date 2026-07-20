const lengthSlider = document.getElementById('passLength');
const lengthVal = document.getElementById('lengthVal');
const passResult = document.getElementById('passwordResult');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

const charSets = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    number: '0123456789',
    symbol: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

if(lengthSlider) {
    lengthSlider.addEventListener('input', (e) => lengthVal.innerText = e.target.value);
}

function generatePassword() {
    let allowedChars = '';
    if(document.getElementById('incUppercase').checked) allowedChars += charSets.upper;
    if(document.getElementById('incLowercase').checked) allowedChars += charSets.lower;
    if(document.getElementById('incNumbers').checked) allowedChars += charSets.number;
    if(document.getElementById('incSymbols').checked) allowedChars += charSets.symbol;

    if(!allowedChars) {
        passResult.innerText = "Select at least one option!";
        return;
    }

    let password = '';
    const len = parseInt(lengthSlider.value);
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    passResult.innerText = password;
    checkStrength(password);
}

function checkStrength(pass) {
    let score = 0;
    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    let width = (score / 5) * 100;
    if(strengthBar) strengthBar.style.width = width + '%';
    
    if(score <= 2) {
        if(strengthBar) strengthBar.style.background = '#EF4444';
        if(strengthText) strengthText.innerText = 'Weak Password';
    } else if(score <= 4) {
        if(strengthBar) strengthBar.style.background = '#F59E0B';
        if(strengthText) strengthText.innerText = 'Good/Medium Password';
    } else {
        if(strengthBar) strengthBar.style.background = 'var(--success)';
        if(strengthText) strengthText.innerText = 'Strong & Secure';
    }
}

document.getElementById('generateBtn')?.addEventListener('click', generatePassword);
document.getElementById('copyPass')?.addEventListener('click', () => {
    if(passResult && passResult.innerText !== "Click Generate" && passResult.innerText !== "Select at least one option!") {
        if(window.Utils) {
            window.Utils.copyToClipboard(passResult.innerText, "Password copied to clipboard!");
        } else {
            navigator.clipboard.writeText(passResult.innerText);
            alert('Password copied!');
        }
    }
});

// Init on load if view matches
if(passResult) generatePassword();
