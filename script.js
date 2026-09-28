// Function untuk update Engine Status & Warna Ikon
window.updateEngineStatus = function(healthPercent) {
    const engineBar = document.getElementById('engine-bar');
    const engineIcon = document.getElementById('icon-engine');
    if (!engineBar || !engineIcon) return;

    // Update progress bar length (0 - 100%)
    const maxOffset = 120;
    const offset = maxOffset - (maxOffset * (healthPercent / 100));
    engineBar.style.strokeDashoffset = offset;

    // Logika Warna Ikon Engine
    engineIcon.classList.remove('active-green', 'active-yellow', 'active-red');
    
    if (healthPercent < 25) {
        engineIcon.classList.add('active-red');     // Merah di bawah 25%
        engineBar.style.stroke = '#ef4444';
    } else if (healthPercent <= 50) {
        engineIcon.classList.add('active-yellow');  // Kuning di bawah/sama dengan 50%
        engineBar.style.stroke = '#eab308';
    } else {
        engineIcon.classList.add('active-green');   // Hijau/Normal di atas 50%
        engineBar.style.stroke = '#84cc16';
    }
};

// Function untuk update Fuel Status & Warna Ikon
window.updateFuelStatus = function(fuelPercent) {
    const fuelBar = document.getElementById('fuel-bar');
    const fuelIcon = document.getElementById('icon-fuel');
    if (!fuelBar || !fuelIcon) return;

    // Update progress bar length
    const maxOffset = 120;
    const offset = maxOffset - (maxOffset * (fuelPercent / 100));
    fuelBar.style.strokeDashoffset = offset;

    // Logika Warna Ikon Fuel
    fuelIcon.classList.remove('active-green', 'active-yellow', 'active-red');

    if (fuelPercent < 25) {
        fuelIcon.classList.add('active-red');     // Merah di bawah 25%
        fuelBar.style.stroke = '#ef4444';
    } else if (fuelPercent <= 50) {
        fuelIcon.classList.add('active-yellow');  // Kuning di bawah/sama dengan 50%
        fuelBar.style.stroke = '#eab308';
    } else {
        fuelIcon.classList.add('active-green');   // Hijau/Normal di atas 50%
        fuelBar.style.stroke = '#84cc16';
    }
};

// Function Update Speed Value
window.updateSpeed = function(speed) {
    const speedVal = document.getElementById('speed-val');
    const speedBar = document.getElementById('speed-bar');
    if (speedVal) speedVal.innerText = Math.round(speed);
    
    if (speedBar) {
        const maxSpeed = 220; // Batas max KM/H
        const maxOffset = 260;
        const currentSpeed = Math.min(speed, maxSpeed);
        const offset = maxOffset - (maxOffset * (currentSpeed / maxSpeed));
        speedBar.style.strokeDashoffset = offset;
    }
};

// Lock/Unlock Vehicle (Sesuai panggilan JGRP)
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