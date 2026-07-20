const textInput = document.getElementById('textInput');

if (textInput) {
    textInput.addEventListener('input', () => {
        const text = textInput.value;
        const words = text.trim().split(/\s+/).filter(Boolean);
        const characters = text.length;
        const paragraphs = text.split('\n').filter(p => p.trim() !== '').length;
        const readingTime = Math.ceil(words.length / 200);

        document.getElementById('wordCount').innerText = words.length;
        document.getElementById('charCount').innerText = characters;
        document.getElementById('paraCount').innerText = paragraphs;
        document.getElementById('readTime').innerText = words.length > 0 ? readingTime + 'm' : '0m';
    });
}

document.getElementById('clearBtn')?.addEventListener('click', () => {
    textInput.value = '';
    textInput.dispatchEvent(new Event('input'));
    if(window.showToast) window.showToast("Text cleared!");
});

document.getElementById('copyTextBtn')?.addEventListener('click', () => {
    if(textInput.value) {
        if(window.Utils) {
            window.Utils.copyToClipboard(textInput.value, "Text copied successfully!");
        } else {
            navigator.clipboard.writeText(textInput.value);
            alert('Text copied!');
        }
    }
});
