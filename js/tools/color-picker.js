const colorInput = document.getElementById('colorInput');

if (colorInput) {
    colorInput.addEventListener('input', (e) => {
        const hex = e.target.value;
        document.getElementById('hexVal').innerText = hex;
        
        // HEX to RGB
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        document.getElementById('rgbVal').innerText = `rgb(${r}, ${g}, ${b})`;

        // RGB to HSL
        let rPercent = r / 255, gPercent = g / 255, bPercent = b / 255;
        let max = Math.max(rPercent, gPercent, bPercent), min = Math.min(rPercent, gPercent, bPercent);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case rPercent: h = (gPercent - bPercent) / d + (gPercent < bPercent ? 6 : 0); break;
                case gPercent: h = (bPercent - rPercent) / d + 2; break;
                case bPercent: h = (rPercent - gPercent) / d + 4; break;
            }
            h /= 6;
        }
        document.getElementById('hslVal').innerText = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    });
}

function copyColor(id) {
    const text = document.getElementById(id).innerText;
    if (window.Utils) {
        window.Utils.copyToClipboard(text, `Copied format: ${text}`);
    } else {
        navigator.clipboard.writeText(text);
        alert(`Copied: ${text}`);
    }
}
