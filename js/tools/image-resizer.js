const resizeInput = document.getElementById('resizeInput');
const resizeDropZone = document.getElementById('resizeDropZone');
const resizeW = document.getElementById('resizeW');
const resizeH = document.getElementById('resizeH');
const targetKBInput = document.getElementById('targetKB');

// Preview nodes references
const previewContainer = document.getElementById('previewContainer');
const sourceImageDisplay = document.getElementById('sourceImageDisplay');
const originalMetaInfo = document.getElementById('originalMetaInfo');

let originalImgRef = new Image();
let originalAspectRatio = 1;
let selectedFileFormat = "image/jpeg"; // default fallback encoder string

resizeDropZone?.addEventListener('click', () => resizeInput.click());

if(resizeInput) {
    resizeInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(file) {
            selectedFileFormat = file.type || "image/jpeg";
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                originalImgRef.src = event.target.result;
                originalImgRef.onload = () => {
                    // Inject parameters metrics
                    resizeW.value = originalImgRef.width;
                    resizeH.value = originalImgRef.height;
                    originalAspectRatio = originalImgRef.width / originalImgRef.height;
                    
                    // Show preview container and metadata info
                    if(sourceImageDisplay) sourceImageDisplay.src = originalImgRef.src;
                    if(previewContainer) previewContainer.style.display = 'block';
                    if(originalMetaInfo && window.Utils) {
                        originalMetaInfo.innerText = `Dimensions: ${originalImgRef.width}x${originalImgRef.height}px | Original Size: ${window.Utils.formatBytes(file.size)}`;
                    }

                    document.getElementById('resizeControls').style.display = 'block';
                };
            };
        }
    });
}

// Aspect ratio triggers parameters updates safely
resizeW?.addEventListener('input', () => {
    if(document.getElementById('maintainRatio').checked && originalAspectRatio && resizeW.value) {
        resizeH.value = Math.round(parseInt(resizeW.value) / originalAspectRatio) || '';
    }
});

resizeH?.addEventListener('input', () => {
    if(document.getElementById('maintainRatio').checked && originalAspectRatio && resizeH.value) {
        resizeW.value = Math.round(parseInt(resizeH.value) * originalAspectRatio) || '';
    }
});

document.getElementById('downloadResized')?.addEventListener('click', () => {
    if (!originalImgRef.src) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = parseInt(resizeW.value) || originalImgRef.width;
    canvas.height = parseInt(resizeH.value) || originalImgRef.height;
    
    ctx.drawImage(originalImgRef, 0, 0, canvas.width, canvas.height);
    
    let quality = 0.92; 
    let targetKB = parseFloat(targetKBInput?.value);
    let finalDataUrl = canvas.toDataURL(selectedFileFormat, quality);

    // If KB limit is specified, run standard step iteration scale encoder down
    if (!isNaN(targetKB) && targetKB > 0) {
        let maxIterations = 8;
        while (maxIterations > 0) {
            const head = finalDataUrl.length - 22;
            const approxBytes = Math.round(head * 0.75);
            const currentKB = approxBytes / 1024;

            if (currentKB <= targetKB || quality <= 0.1) {
                break;
            }
            quality -= 0.1;
            finalDataUrl = canvas.toDataURL('image/jpeg', quality); // switch to JPEG for variable compression factors
            maxIterations--;
        }
    }
    
    // CRITICAL FIX: Safe download link dispatch to completely bypass browser alert style popup anomalies!
    const link = document.createElement('a');
    link.href = finalDataUrl;
    // Cleans default raw strings parameters array from dynamic asset namespace naming formats 
    link.download = `optimized_dailytool_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if(window.showToast) window.showToast("Processed image downloaded directly!");
});
