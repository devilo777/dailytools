const qrPayloadInput = document.getElementById('qrTextPayload');
const targetQrCanvasNode = document.getElementById('qrOutputGraphic');
let qrcodeInstanceReference = null;

document.getElementById('generateQrBtn')?.addEventListener('click', () => {
    const targetPayload = qrPayloadInput.value.trim();
    if(!targetPayload) {
        if(window.showToast) window.showToast("Please feed some target data context first!", "error");
        return;
    }

    targetQrCanvasNode.innerHTML = ''; // reset output node layers
    
    qrcodeInstanceReference = new QRCode(targetQrCanvasNode, {
        text: targetPayload,
        width: 256,
        height: 256,
        colorDark : "#0F172A", // Slate dark matching the theme palette matrix
        colorLight : "#FFFFFF",
        correctLevel : QRCode.CorrectLevel.H
    });

    // Timeout layout buffer sequence ensuring image engine converts successfully 
    setTimeout(() => {
        const processedImgTag = targetQrCanvasNode.querySelector('img');
        const triggerSaveAction = document.getElementById('downloadQrBtn');
        
        if (processedImgTag) {
            triggerSaveAction.style.display = 'inline-flex';
            triggerSaveAction.onclick = () => {
                const linkElement = document.createElement('a');
                linkElement.href = processedImgTag.src;
                linkElement.download = 'custom-qrcode.png';
                linkElement.click();
            };
            if(window.showToast) window.showToast("QR layout payload matrices generated safely!");
        }
    }, 200);
});
