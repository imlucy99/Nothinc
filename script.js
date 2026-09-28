// Function Update Status Mesin (Engine)
window.updateEngineStatus = function(healthPercent) {
    const engineBar = document.getElementById('engine-bar');
    const engineIcon = document.getElementById('icon-engine');
    if (!engineBar || !engineIcon) return;

    // Update arc progress bar
    const maxOffset = 125;
    const offset = maxOffset - (maxOffset * (Math.min(healthPercent, 100) / 100));
    engineBar.style.strokeDashoffset = offset;

    // Reset Class Warna
    engineIcon.classList.remove('active-green', 'active-yellow', 'active-red');

    // Logika syarat warna:
    // < 25% = Merah | <= 50% = Kuning | > 50% = Kuning/Normal
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

// Function Update Status Bensin (Fuel)
window.updateFuelStatus = function(fuelPercent) {
    const fuelBar = document.getElementById('fuel-bar');
    const fuelIcon = document.getElementById('icon-fuel');
    if (!fuelBar || !fuelIcon) return;

    const maxOffset = 125;
    const offset = maxOffset - (maxOffset * (Math.min(fuelPercent, 100) / 100));
    fuelBar.style.strokeDashoffset = offset;

    fuelIcon.classList.remove('active-green', 'active-yellow', 'active-red');

    // Logika syarat warna bensin:
    // < 25% = Merah | <= 50% = Kuning | > 50% = Hijau
    if (fuelPercent < 25) {
        fuelIcon.classList.add('active-red');
        fuelBar.style.stroke = '#ef4444';
    } else if (fuelPercent <= 50) {
        fuelIcon.classList.add('active-yellow');
        fuelBar.style.stroke = '#eab308';
    } else {
        fuelIcon.classList.add('active-green');
        fuelBar.style.stroke = '#84cc16';
    }
};

// Function Update Kecepatan
window.updateSpeed = function(speed) {
    const speedVal = document.getElementById('speed-val');
    const speedBar = document.getElementById('speed-bar');
    if (speedVal) speedVal.innerText = Math.round(speed);
    
    if (speedBar) {
        const maxSpeed = 220; // Batas KM/H
        const maxOffset = 285;
        const currentSpeed = Math.min(speed, maxSpeed);
        const offset = maxOffset - (maxOffset * (currentSpeed / maxSpeed));
        speedBar.style.strokeDashoffset = offset;
    }
};

// Lock / Unlock Kendaraan
window.updateLockStatus = function(state) {
    const el = document.getElementById('icon-lock');
    if (!el) return;

    if (state === true || state === 1) {
        el.className = 'icon-item active-yellow';
    } else {
        el.className = 'icon-item';
    }
};

// Status Lampu Depan
window.updateLightStatus = function(state) {
    const el = document.getElementById('icon-headlight');
    if (!el) return;

    if (state === true || state === 1) {
        el.className = 'icon-item active-blue';
    } else {
        el.className = 'icon-item';
    }
};
