let pdfDocInstance = null;
const pdfFileInput = document.getElementById('pdfFile');
const pdfDropZone = document.getElementById('pdfDropZone');
const renderContainer = document.getElementById('pdfPreviewContainer');

pdfDropZone?.addEventListener('click', () => pdfFileInput.click());

pdfFileInput?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
        if(window.showToast) window.showToast("Please upload a valid PDF file!", "error");
        return;
    }

    renderContainer.innerHTML = '<p class="text-muted">Parsing PDF structures, please wait...</p>';

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = async function() {
        const typedarray = new Uint8Array(this.result);
        
        try {
            // Configure pdfjs worker explicitly
            const loadingTask = pdfjsLib.getDocument(typedarray);
            pdfDocInstance = await loadingTask.promise;
            renderContainer.innerHTML = ''; // clear loading state
            
            // Loop through all pages and generate preview cards with trigger buttons
            for (let pageNum = 1; pageNum <= pdfDocInstance.numPages; pageNum++) {
                createPageCard(pageNum);
            }
            if(window.showToast) window.showToast(`Loaded ${pdfDocInstance.numPages} pages successfully!`);
        } catch (error) {
            renderContainer.innerHTML = '<p style="color:#EF4444;">Failed to decode PDF structural units.</p>';
        }
    };
});

async function createPageCard(pageNum) {
    const card = document.createElement('div');
    card.className = 'glass-card text-center';
    card.style.padding = '15px';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'center';
    card.style.gap = '10px';

    const canvas = document.createElement('canvas');
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';
    canvas.style.borderRadius = '8px';
    
    card.innerHTML = `<h5>Page ${pageNum}</h5>`;
    card.insertBefore(canvas, card.firstChild);

    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'btn';
    downloadBtn.style.width = '100%';
    downloadBtn.style.justifyContent = 'center';
    downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
    card.appendChild(downloadBtn);
    renderContainer.appendChild(card);

    // Context execution flow to render PDF onto active canvas context
    const page = await pdfDocInstance.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = { canvasContext: context, viewport: viewport };
    await page.render(renderContext).promise;

    downloadBtn.addEventListener('click', () => {
        const imageURI = canvas.toDataURL('image/jpeg', 0.9);
        const link = document.createElement('a');
        link.href = imageURI;
        link.download = `pdf_page_${pageNum}.jpg`;
        link.click();
    });
}
