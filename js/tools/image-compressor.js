const compressInput = document.getElementById('compressInput');
const compressDropZone = document.getElementById('compressDropZone');
const qualitySlider = document.getElementById('compressQuality');
const qualityVal = document.getElementById('qualityVal');
let sourceImgRaw = new Image();

compressDropZone?.addEventListener('click', () => compressInput.click());

qualitySlider?.addEventListener('input', (e) => {
    qualityVal.innerText = e.target.value + '%';
});

compressInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            sourceImgRaw.src = event.target.result;
            sourceImgRaw.onload = () => {
                document.getElementById('compressControls').style.display = 'block';
                if(window.Utils) {
                    document.getElementById('originalSize').innerText = window.Utils.formatBytes(file.size);
                }
            };
        };
    }
});

document.getElementById('startCompressionBtn')?.addEventListener('click', () => {
    if(!sourceImgRaw.src) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = sourceImgRaw.width;
    canvas.height = sourceImgRaw.height;
    ctx.drawImage(sourceImgRaw, 0, 0, canvas.width, canvas.height);

    const activeQuality = parseFloat(qualitySlider.value) / 100;
    // Compress layout via natively scaling jpeg encoder factor matrix
    const optimizedDataUrl = canvas.toDataURL('image/jpeg', activeQuality);

    // Calculating size delta footprint mock up
    const head = optimizedDataUrl.length - 22;
    const approximateBytes = Math.round(head * 0.75);

    if(window.Utils) {
        document.getElementById('compressedSize').innerText = window.Utils.formatBytes(approximateBytes);
    }
    
    const downloadAction = document.getElementById('downloadCompressedBtn');
    downloadAction.style.display = 'inline-flex';
    downloadAction.onclick = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = optimizedDataUrl;
        downloadLink.download = 'compressed-optimized.jpg';
        downloadLink.click();
        if(window.showToast) window.showToast("File dispatched into your downloads folder!");
    };
});
