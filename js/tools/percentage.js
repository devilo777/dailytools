// Scenario 1 Logic
document.getElementById('calcScen1')?.addEventListener('click', () => {
    const x = parseFloat(document.getElementById('scen1_X').value);
    const y = parseFloat(document.getElementById('scen1_Y').value);
    if(!isNaN(x) && !isNaN(y)) {
        const result = (x / 100) * y;
        document.getElementById('resScen1').innerText = Number(result.toFixed(4));
        if(window.showToast) window.showToast("Calculated!");
    }
});

// Scenario 2 Logic
document.getElementById('calcScen2')?.addEventListener('click', () => {
    const a = parseFloat(document.getElementById('scen2_A').value);
    const b = parseFloat(document.getElementById('scen2_B').value);
    if(!isNaN(a) && !isNaN(b) && a !== 0) {
        const change = ((b - a) / a) * 100;
        const absoluteChange = Number(change.toFixed(2));
        const resEl = document.getElementById('resScen2');
        if(absoluteChange >= 0) {
            resEl.innerText = `+${absoluteChange}% Increase`;
            resEl.style.color = 'var(--success)';
        } else {
            resEl.innerText = `${absoluteChange}% Decrease`;
            resEl.style.color = '#EF4444';
        }
        if(window.showToast) window.showToast("Percentage variation tracked!");
    }
});
