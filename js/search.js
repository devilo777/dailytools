// Sample dataset based on your tools folder
const toolsRegistry = [
    { name: "PDF to Image", desc: "Extract high-quality JPEG/PNG from PDFs", url: "tools/pdf-to-image.html", tags: ["pdf", "convert", "image"] },
    { name: "Image Compressor", desc: "Reduce photo size without losing quality", url: "tools/image-compressor.html", tags: ["compress", "size", "jpg", "png"] },
    { name: "QR Code Generator", desc: "Create instant downloadable QR codes", url: "tools/qr-generator.html", tags: ["qr", "link", "wifi", "barcode"] },
    { name: "Password Generator", desc: "Generate ultra-secure custom passwords", url: "tools/password-generator.html", tags: ["password", "security", "crypto"] },
    { name: "Word Counter", desc: "Analyze characters, paragraphs, and reading time", url: "tools/word-counter.html", tags: ["text", "count", "words", "essay"] },
    { name: "Color Picker", desc: "Extract HEX, RGB, and HSL codes easily", url: "tools/color-picker.html", tags: ["color", "design", "hex", "rgb"] },
    { name: "Age Calculator", desc: "Find precise timeline metrics for any milestone", url: "tools/age-calculator.html", tags: ["age", "date", "birthday", "time"] },
    { name: "Percentage Calculator", desc: "Handle dynamic percentage splits or margins", url: "tools/percentage-calculator.html", tags: ["math", "percent", "discount", "gst"] },
    { name: "Unit Converter", desc: "Transform lengths, weights, or temperatures", url: "tools/unit-converter.html", tags: ["convert", "metric", "kg", "lbs", "meter"] },
    { name: "Image Resizer", desc: "Scale canvas pixel height/width dimensions", url: "tools/image-resizer.html", tags: ["resize", "scale", "dimensions", "aspect"] }
];

const searchInput = document.getElementById('globalSearch');
const suggestionsBox = document.getElementById('searchSuggestions');

if(searchInput) {
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase().trim();
        if(!value) {
            suggestionsBox.style.display = 'none';
            return;
        }

        const filtered = toolsRegistry.filter(tool => 
            tool.name.toLowerCase().includes(value) || 
            tool.tags.some(tag => tag.includes(value))
        );

        renderSuggestions(filtered);
    });
}

function renderSuggestions(matches) {
    suggestionsBox.innerHTML = '';
    if(matches.length === 0) {
        suggestionsBox.innerHTML = `<div style="padding: 12px; color: var(--text-muted);">No tools found matching that string...</div>`;
        suggestionsBox.style.display = 'block';
        return;
    }

    matches.forEach(match => {
        const div = document.createElement('div');
        div.style.padding = '12px 18px';
        div.style.cursor = 'pointer';
        div.style.borderBottom = '1px solid var(--glass-border)';
        div.className = 'suggestion-item';
        div.innerHTML = `<strong>${match.name}</strong> <span style="font-size:0.8rem; opacity:0.7; display:block;">${match.desc}</span>`;
        
        div.onclick = () => {
            window.location.href = match.url;
        };
        suggestionsBox.appendChild(div);
    });
    
    suggestionsBox.style.display = 'block';
}
