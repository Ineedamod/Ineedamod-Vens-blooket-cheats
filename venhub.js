javascript:(function() {
    if (document.getElementById('ven-hub-root')) return alert('Ven Hub is already active!');
    const style = document.createElement('style');
    style.innerHTML = `
        #ven-hub-root { position: fixed; top: 10%; left: 10%; width: 300px; background: #111; color: #d4af37; border: 2px solid #d4af37; border-radius: 8px; z-index: 999999; font-family: 'Montserrat', sans-serif; box-shadow: 0 0 20px rgba(212, 175, 55, 0.3); user-select: none; }
        #ven-header { background: #d4af37; color: #000; padding: 10px; cursor: move; font-weight: bold; display: flex; justify-content: space-between; border-radius: 5px 5px 0 0; }
        .ven-tab { padding: 15px; display: flex; flex-direction: column; gap: 8px; }
        .ven-btn { background: #222; color: #d4af37; border: 1px solid #d4af37; padding: 8px; border-radius: 4px; cursor: pointer; transition: 0.3s; font-weight: 600; text-align: left; }
        .ven-btn:hover { background: #d4af37; color: #000; transform: scale(1.02); }
        .ven-label { font-size: 10px; color: #888; text-transform: uppercase; margin-top: 5px; }
    `;
    document.head.appendChild(style);

    const gui = document.createElement('div');
    gui.id = 'ven-hub-root';
    gui.innerHTML = `
        <div id="ven-header"><span>VEN HUB v2026</span><span id="ven-close" style="cursor:pointer">×</span></div>
        <div class="ven-tab">
            <div class="ven-label">Global Actions</div>
            <button class="ven-btn" onclick="vH('global/addTokens.js')">💰 Add Max Tokens & XP</button>
            <button class="ven-btn" onclick="vH('global/getEveryBlook.js')">🦊 Unlock All Blooks</button>
            <div class="ven-label">Game Modules</div>
            <button class="ven-btn" onclick="vH('gold/chestEsp.js')">✨ Gold Quest: Chest ESP</button>
            <button class="ven-btn" onclick="vH('cafe/infiniteFood.js')">☕ Cafe: Unlimited Food</button>
            <button class="ven-btn" onclick="vH('factory/maxBlooks.js')">🏭 Factory: Max Blooks</button>
        </div>
    `;
    document.body.appendChild(gui);

    window.vH = function(path) {
        const repo = "https://raw.githubusercontent.com";
        fetch(repo + path).then(r => r.text()).then(t => eval(t)).catch(() => alert('Script Blocked!'));
    };

    /* Draggable Logic */
    let drag = false, x, y;
    const h = document.getElementById('ven-header');
    h.onmousedown = e => { drag = true; x = e.clientX - gui.offsetLeft; y = e.clientY - gui.offsetTop; };
    document.onmousemove = e => { if (drag) { gui.style.left = (e.clientX - x) + 'px'; gui.style.top = (e.clientY - y) + 'px'; } };
    document.onmouseup = () => drag = false;
    document.getElementById('ven-close').onclick = () => gui.remove();
})();
