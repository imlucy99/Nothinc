let seatbeltInterval = null;

// Function Update Status Seatbelt + Pemicu Suara
window.updateSeatbeltStatus = function(isBuckled) {
    const seatbeltIcon = document.getElementById('icon-seatbelt');
    const audio = document.getElementById('seatbelt-sound');
    if (!seatbeltIcon) return;

    if (isBuckled) {
        // Seatbelt Terpasang (Aman)
        seatbeltIcon.className = 'icon-item active-green';
        seatbeltIcon.innerHTML = '<i class="fa-solid fa-user-shield"></i>';
        
        // Hentikan suara peringatan
        if (seatbeltInterval) {
            clearInterval(seatbeltInterval);
            seatbeltInterval = null;
        }
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    } else {
        // Seatbelt Lepas (Bahaya)
        seatbeltIcon.className = 'icon-item unbuckled';
        seatbeltIcon.innerHTML = '<i class="fa-solid fa-user-slash"></i>';

        // Bunyikan alarm setiap 1.5 detik jika belum bunyi
        if (!seatbeltInterval) {
            seatbeltInterval = setInterval(() => {
                if (audio) {
                    audio.currentTime = 0;
                    audio.play().catch(() => {}); // Catch error jika dipetik oleh kebijakan autoplay browser
                }
            }, 1500);
        }
    }
};

// Function Update Engine Status & Warna Ikon Engine
window.updateEngineStatus = function(healthPercent) {
    const engineBar = document.getElementById('engine-bar');
    const engineIcon = document.getElementById('icon-engine');
    if (!engineBar || !engineIcon) return;

    const maxOffset = 120;
    const offset = maxOffset - (maxOffset * (Math.min(healthPercent, 100) / 100));
    engineBar.style.strokeDashoffset = offset;

    engineIcon.classList.remove('active-green', 'active-yellow', 'active-red');

    // Syarat: Engine <= 50% Kuning, < 25% Merah
    if (healthPercent < 25) {
        engineIcon.classList.add('active-red');
        engineBar.style.stroke = '#ef4444';
    } else if (healthPercent <= 50) {
        engineIcon.classList.add('active-yellow');
        engineBar.style.stroke = '#eab308';
    } else {
        engineIcon.classList.add('active-yellow');
        engineBar.style.stroke = '#eab308';
    }
};

// Function Update Fuel Status & Warna Ikon Fuel
window.updateFuelStatus = function(fuelPercent) {
    const fuelBar = document.getElementById('fuel-bar');
    const fuelIcon = document.getElementById('icon-fuel');
    if (!fuelBar || !fuelIcon) return;

    const maxOffset = 120;
    const offset = maxOffset - (maxOffset * (Math.min(fuelPercent, 100) / 100));
    fuelBar.style.strokeDashoffset = offset;

    fuelIcon.classList.remove('active-green', 'active-yellow', 'active-red');

    // Syarat: Bensin <= 50% Kuning, < 25% Merah
    if (fuelPercent < 25) {
        fuelIcon.classList.add('active-red');
        fuelBar.style.stroke = '#ef4444';
    } else if (fuelPercent <= 50) {
        fuelIcon.classList.add('active-yellow');
        fuelBar.style.stroke = '#eab308';
    } else {
        fuelIcon.classList.add('active-green');
        fuelBar.style.stroke = '#22c55e';
    }
};

// Function Update Speed Value
window.updateSpeed = function(speed) {
    const speedVal = document.getElementById('speed-val');
    const speedBar = document.getElementById('speed-bar');
    if (speedVal) speedVal.innerText = Math.round(speed);
    
    if (speedBar) {
        const maxSpeed = 220;
        const maxOffset = 275;
        const currentSpeed = Math.min(speed, maxSpeed);
        const offset = maxOffset - (maxOffset * (currentSpeed / maxSpeed));
        speedBar.style.strokeDashoffset = offset;
    }
};

// Lock / Unlock Vehicle
window.updateLockStatus = function(state) {
    const el = document.getElementById('icon-lock');
    if (!el) return;

    if (state === true || state === 1) {
        el.className = 'icon-item active-yellow';
    } else {
        el.className = 'icon-item';
    }
};

// Headlight Status
window.updateLightStatus = function(state) {
    const el = document.getElementById('icon-headlight');
    if (!el) return;

    if (state === true || state === 1) {
        el.className = 'icon-item active-blue';
    } else {
        el.className = 'icon-item';
    }
};
