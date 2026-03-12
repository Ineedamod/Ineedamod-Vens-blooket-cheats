(async function() {
    if (document.getElementById('ven-hub-root')) return alert('Ven Hub is already active!');

    // Multi-Repo Support for 2025 Updates
    const REPOS = [
        "https://raw.githubusercontent.com",
        "https://raw.githubusercontent.com",
        "https://raw.githubusercontent.com",
        "https://raw.githubusercontent.com"
    ];

    const css = `
        #ven-hub-root { 
            position: fixed; top: 5%; left: 5%; width: 340px; 
            background: #0a0a0a; color: #d4af37; border: 2px solid #d4af37; 
            border-radius: 14px; z-index: 9999999; font-family: 'Inter', 'Segoe UI', sans-serif; 
            box-shadow: 0 0 40px rgba(212, 175, 55, 0.5); display: flex; flex-direction: column;
        }
        #ven-header { 
            background: linear-gradient(90deg, #d4af37, #f7e08a); color: #000; padding: 14px; 
            cursor: move; font-weight: 900; display: flex; justify-content: space-between; 
            align-items: center; border-radius: 12px 12px 0 0;
        }
        .ven-body { padding: 12px; display: flex; flex-direction: column; gap: 10px; max-height: 550px; overflow-y: auto; }
        .ven-section { border-bottom: 1px solid #222; padding-bottom: 10px; }
        .ven-label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; font-weight: bold; }
        .ven-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .ven-btn { 
            background: #151515; color: #d4af37; border: 1px solid #333; 
            padding: 10px; border-radius: 8px; cursor: pointer; transition: 0.3s; 
            font-size: 11px; font-weight: 700; text-align: center;
        }
        .ven-btn:hover { background: #d4af37; color: #000; border-color: #fff; transform: scale(1.03); }
        .ven-btn.danger { color: #ff4444; border-color: #400; }
        .ven-btn.danger:hover { background: #ff4444; color: #fff; }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const gui = document.createElement('div');
    gui.id = 'ven-hub-root';
    gui.innerHTML = `
        <div id="ven-header"><span>VEN MULTI-REPO v3.5</span><span id="ven-close" style="cursor:pointer">×</span></div>
        <div class="ven-body">
            <div class="ven-section">
                <div class="ven-label">Account / Global</div>
                <div class="ven-grid">
                    <button class="ven-btn" data-path="global/addTokens.js">💰 Max XP/Tokens</button>
                    <button class="ven-btn" data-path="global/getEveryBlook.js">🦊 All Blooks</button>
                    <button class="ven-btn" data-path="global/answerCorrect.js">✅ Auto Answer</button>
                    <button class="ven-btn" data-path="global/sellDuplicateBlooks.js">♻️ Sell Dupes</button>
                </div>
            </div>
            <div class="ven-section">
                <div class="ven-label">Seasonal / Special</div>
                <div class="ven-grid">
                    <button class="ven-btn" data-path="seasonal/busyBees.js">🐝 Busy Bees (Honey)</button>
                    <button class="ven-btn" data-path="seasonal/snowballFight.js">❄️ Snowball Fight</button>
                    <button class="ven-btn" data-path="other/customBlooks.js">🎨 Custom Blooks</button>
                </div>
            </div>
            <div class="ven-section">
                <div class="ven-label">Game Modes</div>
                <div class="ven-grid">
                    <button class="ven-btn" data-path="gold/chestEsp.js">✨ Gold ESP</button>
                    <button class="ven-btn" data-path="cafe/infiniteFood.js">☕ Cafe Food</button>
                    <button class="ven-btn" data-path="factory/maxBlooks.js">🏭 Factory Bots</button>
                    <button class="ven-btn" data-path="crypto/passwordESP.js">🔓 Crypto Hack</button>
                    <button class="ven-btn" data-path="tower-defense/setMoney.js">🏹 TD Money</button>
                    <button class="ven-btn" data-path="monster-brawl/maxStats.js">👹 Monster Level</button>
                </div>
            </div>
            <div class="ven-section">
                <div class="ven-label">Destructive</div>
                <div class="ven-grid">
                    <button class="ven-btn danger" data-path="other/floodGame.js">🌊 Game Flooder</button>
                    <button class="ven-btn danger" data-path="other/serverCrasher.js">💥 Server Crasher</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(gui);

    // Smart Loader: Tries multiple repos if one fails
    async function loadScript(path) {
        for (const repo of REPOS) {
            try {
                const res = await fetch(repo + path);
                if (res.ok) {
                    const code = await res.text();
                    new Function(code)();
                    console.log(`Successfully loaded ${path} from ${repo}`);
                    return;
                }
            } catch (e) { continue; }
        }
        alert(`Error: Script "${path}" not found in any updated 2025 repository.`);
    }

    gui.addEventListener('click', (e) => {
        const btn = e.target.closest('.ven-btn');
        if (btn) loadScript(btn.getAttribute('data-path'));
        if (e.target.id === 'ven-close') gui.remove();
    });

    // Draggable Logic
    let active = false, currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;
    const dragStart = (e) => {
        const t = e.type === "touchstart" ? e.touches : e;
        initialX = t.clientX - xOffset; initialY = t.clientY - yOffset;
        if (e.target.closest('#ven-header')) active = true;
    };
    const drag = (e) => {
        if (active) {
            e.preventDefault();
            const t = e.type === "touchmove" ? e.touches : e;
            currentX = t.clientX - initialX; currentY = t.clientY - initialY;
            xOffset = currentX; yOffset = currentY;
            gui.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }
    };
    const dragEnd = () => active = false;

    document.addEventListener("mousedown", dragStart); document.addEventListener("touchstart", dragStart, { passive: false });
    document.addEventListener("mousemove", drag); document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("mouseup", dragEnd); document.addEventListener("touchend", dragEnd);
})();
        
