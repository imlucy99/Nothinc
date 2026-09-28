window.addEventListener('message', function(event) {
    let data = event.data;

    // 1. Mengatur Visibilitas (Sembunyikan/Tampilkan Speedometer)
    if (data.type === "hud" || data.action === "show") {
        if (data.display !== undefined) {
            document.body.style.display = data.display ? "block" : "none";
        }
    }

    // 2. Kecepatan (Speed) & Satuan
    if (data.speed !== undefined) {
        let speedVal = document.getElementById('speed-val');
        if (speedVal) speedVal.innerText = Math.round(data.speed);
    }
    if (data.unit !== undefined) {
        let speedUnit = document.getElementById('speed-unit');
        if (speedUnit) speedUnit.innerText = data.unit; // KMH / MPH
    }

    // 3. RPM
    if (data.rpm !== undefined) {
        let clamped = Math.max(0, Math.min(1, data.rpm));
        let rpmVal = document.getElementById('rpm-val');
        let rpmBar = document.getElementById('rpm-bar');
        if (rpmVal) rpmVal.innerText = clamped.toFixed(4);
        if (rpmBar) rpmBar.style.width = (clamped * 100) + '%';
    }

    // 4. Bensin (Fuel)
    if (data.fuel !== undefined) {
        let percentage = Number(data.fuel).toFixed(1);
        let fuelTxt = document.getElementById('fuel');
        let fuelBar = document.getElementById('fuel-bar');
        if (fuelTxt) fuelTxt.innerText = percentage + '%';
        if (fuelBar) fuelBar.style.width = percentage + '%';
    }

    // 5. Kesehatan Kendaraan (Engine Health)
    if (data.health !== undefined) {
        // Skala FiveM biasanya 0 - 1000, ubah ke persentase jika perlu
        let healthPct = data.health > 1 ? (data.health / 10).toFixed(1) : (data.health * 100).toFixed(1);
        healthPct = Math.max(0, Math.min(100, healthPct));
        let healthTxt = document.getElementById('health');
        let healthBar = document.getElementById('health-bar');
        if (healthTxt) healthTxt.innerText = healthPct + '%';
        if (healthBar) healthBar.style.width = healthPct + '%';
    }

    // 6. Transmisi / Gigi (Gear)
    if (data.gear !== undefined) {
        let gearEl = document.getElementById('gear');
        if (gearEl) {
            if (data.gear === 0) {
                gearEl.innerText = 'R';
            } else {
                gearEl.innerText = data.gear;
            }
        }
    }

    // 7. Status Mesin (Engine)
    if (data.engine !== undefined) {
        let txt = document.getElementById('engine');
        let box = document.getElementById('engine-box');
        if (txt) txt.innerText = data.engine ? 'ON' : 'OFF';
        if (box) box.classList.toggle('active', !!data.engine);
    }

    // 8. Sabuk Pengaman (Seatbelt)
    if (data.seatbelt !== undefined) {
        let txt = document.getElementById('seatbelts');
        let box = document.getElementById('seatbelt-box');
        let icon = document.getElementById('seatbelt-icon');
        if (txt) txt.innerText = data.seatbelt ? 'ON' : 'OFF';
        if (box) box.classList.toggle('active', !!data.seatbelt);
        if (icon) icon.className = data.seatbelt ? 'fa-solid fa-user-check' : 'fa-solid fa-user-slash';
    }

    // 9. Lampu (Headlights)
    if (data.lights !== undefined) {
        let txt = document.getElementById('headlights');
        let box = document.getElementById('headlight-box');
        let icon = document.getElementById('headlight-icon');
        if (data.lights === 1) { // Low beam
            if (txt) txt.innerText = 'LOW';
            if (box) box.classList.add('active');
            if (icon) icon.className = 'fa-solid fa-lightbulb';
        } else if (data.lights === 2) { // High beam
            if (txt) txt.innerText = 'HIGH';
            if (box) box.classList.add('active');
            if (icon) icon.className = 'fa-solid fa-sun';
        } else { // Off
            if (txt) txt.innerText = 'OFF';
            if (box) box.classList.remove('active');
            if (icon) icon.className = 'fa-solid fa-lightbulb';
        }
    }

    // 10. Lampu Sein (Indicators)
    if (data.indicatorLeft !== undefined) {
        let el = document.getElementById('ind-left');
        if (el) el.classList.toggle('active', !!data.indicatorLeft);
    }
    if (data.indicatorRight !== undefined) {
        let el = document.getElementById('ind-right');
        if (el) el.classList.toggle('active', !!data.indicatorRight);
    }

    // 11. Odometer
    if (data.odometer !== undefined) {
        let odo = document.getElementById('odometer');
        if (odo) odo.innerText = Number(data.odometer).toFixed(1) + ' KM';
    }
});
