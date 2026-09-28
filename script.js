window.addEventListener('message', function(event) {
    let data = event.data;

    // 1. Tampilkan atau Sembunyikan Speedometer
    if (data.type === "hud" || data.action === "show") {
        if (data.display !== undefined) {
            document.body.style.display = data.display ? "block" : "none";
        }
    }

    // 2. Kecepatan (Speedometer)
    let speed = data.speedometer ?? data.speed;
    if (speed !== undefined) {
        let speedVal = document.getElementById('speed-val');
        if (speedVal) speedVal.innerText = Math.round(Number(speed));
    }

    // Satuan Speed
    if (data.unit !== undefined) {
        let speedUnit = document.getElementById('speed-unit');
        if (speedUnit) speedUnit.innerText = data.unit;
    }

    // 3. RPM
    let rpm = data.rpmVal ?? data.rpm;
    if (rpm !== undefined) {
        let clamped = Math.max(0, Math.min(1, Number(rpm)));
        let rpmVal = document.getElementById('rpm-val');
        let rpmBar = document.getElementById('rpm-bar');
        if (rpmVal) rpmVal.innerText = clamped.toFixed(4);
        if (rpmBar) rpmBar.style.width = (clamped * 100) + '%';
    }

    // 4. Bensin (Fuel)
    let fuel = data.fuelLevel ?? data.fuel;
    if (fuel !== undefined) {
        let fuelNum = Number(fuel);
        let fuelTxt = document.getElementById('fuel');
        let fuelBar = document.getElementById('fuel-bar');
        if (fuelTxt) fuelTxt.innerText = fuelNum.toFixed(1) + '%';
        if (fuelBar) fuelBar.style.width = fuelNum + '%';
    }

    // 5. Kesehatan Mesin (Engine Health)
    let health = data.engineHealth ?? data.health;
    if (health !== undefined) {
        let hNum = Number(health);
        // Jika server mengirim skala 0 - 1000, ubah ke persentase 0 - 100%
        if (hNum > 100) hNum = hNum / 10;
        hNum = Math.max(0, Math.min(100, hNum));

        let healthTxt = document.getElementById('health');
        let healthBar = document.getElementById('health-bar');
        if (healthTxt) healthTxt.innerText = hNum.toFixed(1) + '%';
        if (healthBar) healthBar.style.width = hNum + '%';
    }

    // 6. Transmisi / Gigi (Gear)
    if (data.gear !== undefined) {
        let gearEl = document.getElementById('gear');
        if (gearEl) {
            if (data.gear === 0 || data.gear === '0') {
                gearEl.innerText = 'R';
            } else {
                gearEl.innerText = String(data.gear).toUpperCase();
            }
        }
    }

    // 7. Status Mesin (Engine)
    let engine = data.engineStatus ?? data.engine;
    if (engine !== undefined) {
        let txt = document.getElementById('engine');
        let box = document.getElementById('engine-box');
        let isON = (engine === true || engine === 1 || engine === 'ON');
        if (txt) txt.innerText = isON ? 'ON' : 'OFF';
        if (box) box.classList.toggle('active', isON);
    }

    // 8. Sabuk Pengaman (Seatbelt)
    let seatbelt = data.seatbeltStatus ?? data.seatbelt;
    if (seatbelt !== undefined) {
        let txt = document.getElementById('seatbelts');
        let box = document.getElementById('seatbelt-box');
        let isON = (seatbelt === true || seatbelt === 1);
        if (txt) txt.innerText = isON ? 'ON' : 'OFF';
        if (box) box.classList.toggle('active', isON);
    }

    // 9. Lampu (Headlights)
    let lights = data.lightStatus ?? data.lights;
    if (lights !== undefined) {
        let txt = document.getElementById('headlights');
        let box = document.getElementById('headlight-box');
        if (lights === 1 || lights === 'LOW') {
            if (txt) txt.innerText = 'LOW';
            if (box) box.classList.add('active');
        } else if (lights === 2 || lights === 'HIGH') {
            if (txt) txt.innerText = 'HIGH';
            if (box) box.classList.add('active');
        } else {
            if (txt) txt.innerText = 'OFF';
            if (box) box.classList.remove('active');
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
    let odo = data.odometerVal ?? data.odometer;
    if (odo !== undefined) {
        let odoEl = document.getElementById('odometer');
        if (odoEl) odoEl.innerText = Number(odo).toFixed(1) + ' Miles';
    }
});
