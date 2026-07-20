const Utils = {
    // Format bytes to human readable format (KB, MB)
    formatBytes: function(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

    // Global copy to clipboard micro runner integration
    copyToClipboard: function(text, successMessage = "Copied to clipboard!") {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            if (window.showToast) {
                window.showToast(successMessage, 'success');
            } else {
                alert(successMessage);
            }
        }).catch(() => {
            if (window.showToast) window.showToast("Failed to copy text", 'error');
        });
    }
};
