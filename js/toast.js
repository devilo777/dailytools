const toastContainer = document.createElement('div');
toastContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 10000; display: flex; flex-direction: column; gap: 10px;';
document.body.appendChild(toastContainer);

window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'glass-card animate-fade-up';
    
    // Type checking color selection
    const borderLeftColor = type === 'success' ? 'var(--success)' : '#EF4444';
    
    toast.style.cssText = `
        padding: 12px 24px;
        background: var(--glass-bg);
        border-left: 4px solid ${borderLeftColor};
        color: var(--text-main);
        font-weight: 500;
        min-width: 200px;
        box-shadow: var(--shadow);
    `;
    
    toast.innerText = message;
    toastContainer.appendChild(toast);

    // Auto cleanup cycle
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Replace built-in alert overrides smoothly across execution scopes
window.alert = function(msg) { window.showToast(msg, 'success'); };
