function toggleTheme() {
    const root = document.documentElement;
    const btn = document.querySelector('.theme-toggle');
    const icon = document.getElementById('theme-icon');
    const goingLight = root.getAttribute('data-theme') !== 'light';
    btn.classList.add('spinning');
    setTimeout(() => btn.classList.remove('spinning'), 400);
    if (goingLight) {
        root.setAttribute('data-theme', 'light');
        icon.src = 'https://raw.githubusercontent.com/nako-hikari/assets/main/ui/sun.png';
        localStorage.setItem('nako-theme', 'light');
    } else {
        root.removeAttribute('data-theme');
        icon.src = 'https://raw.githubusercontent.com/nako-hikari/assets/main/ui/moon.png';
        localStorage.setItem('nako-theme', 'dark');
    }
}
(function() {
    if (localStorage.getItem('nako-theme') === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById('theme-icon').src = 'https://raw.githubusercontent.com/nako-hikari/assets/main/ui/sun.png';
    }
})();
function showModal(title, message, options) {
    options = options || {};
    document.getElementById('nakoModalTitle').textContent = title;
    document.getElementById('nakoModalBody').textContent = message;
    const footer = document.getElementById('nakoModalFooter');
    footer.innerHTML = '';
    let inputEl = null;
    if (options.input) {
        inputEl = document.createElement('input');
        inputEl.type = 'text';
        inputEl.value = options.input.value || '';
        inputEl.placeholder = options.input.placeholder || '';
        inputEl.style.cssText = 'width:100%;box-sizing:border-box;margin-top:12px';
        document.getElementById('nakoModalBody').appendChild(inputEl);
    }
    if (options.onConfirm) {
        const cancel = document.createElement('button');
        cancel.className = 'secondary interactive';
        cancel.textContent = options.cancelText || 'Cancel';
        cancel.onclick = closeNakoModal;
        footer.appendChild(cancel);
        const confirmBtn = document.createElement('button');
        confirmBtn.className = options.danger ? 'danger interactive' : 'primary interactive';
        confirmBtn.textContent = options.confirmText || (options.danger ? 'Delete' : 'Confirm');
        confirmBtn.onclick = () => { closeNakoModal(); options.onConfirm(inputEl ? inputEl.value : undefined); };
        footer.appendChild(confirmBtn);
        if (inputEl) {
            inputEl.onkeydown = ev => { if (ev.key === 'Enter') confirmBtn.click(); };
        }
    } else {
        const ok = document.createElement('button');
        ok.className = 'secondary interactive';
        ok.textContent = 'OK';
        ok.onclick = closeNakoModal;
        footer.appendChild(ok);
    }
    document.getElementById('nakoModal').classList.add('open');
    if (inputEl) setTimeout(() => { inputEl.focus(); inputEl.select(); }, 60);
}
function closeNakoModal() {
    document.getElementById('nakoModal').classList.remove('open');
}
document.getElementById('nakoModal').addEventListener('click', e => {
    if (e.target.id === 'nakoModal') closeNakoModal();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNakoModal();
});
window.alert = msg => showModal('Notice', String(msg));

