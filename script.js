window.addEventListener('message', function(event) {
    let data = event.data;
    console.log("Data dari FiveM:", JSON.stringify(data)); // Cek di Konsol F8
    ...
window.addEventListener('message', function(event) {
    let data = event.data;

    // Supaya aman jika data dibungkus dalam object 'data' atau 'hud'
    if (data.data) data = data.data;

    // 1. Tampilkan / Sembunyikan HUD
    if (data.show !== undefined || data.display !== undefined || data.type === "hud") {
        let show = data.show ?? data.display;
        if (show !== undefined) {
            document.body.style.display = show ? "block" : "none";
        }
    }

    // 2. Kecepatan (Speed)
    let speed = data.speed ?? data.speedometer ?? data.kmh ?? data.mph;
    if (speed !== undefined) {
        let speedVal = document.getElementById('speed-val');
        if (speedVal) speedVal.innerText = Math.round(Number(speed));
    }

    // Satuan Speed (KM/H atau MPH)
    let unit = data.unit ?? data.speedUnit;
    if (unit !== undefined) {
        let speedUnit = document.getElementById('speed-unit');
        if (speedUnit) speedUnit.innerText = String(unit).toUpperCase();
    }

    // 3. RPM (0.0 - 1.0)
    let rpm = data.rpm ?? data.rpmVal;
    if (rpm !== undefined) {
        let clamped = Math.max(0, Math.min(1, Number(rpm)));
        let rpmVal = document.getElementById('rpm-val');
        let rpmBar = document.getElementById('rpm-bar');
        if (rpmVal) rpmVal.innerText = clamped.toFixed(4);
        if (rpmBar) rpmBar.style.width = (clamped * 100) + '%';
    }

    // 4. Bensin / Fuel (0 - 100)
    let fuel = data.fuel ?? data.fuelLevel;
    if (fuel !== undefined) {
        let fuelNum = Number(fuel);
        if (fuelNum <= 1) fuelNum = fuelNum * 100; // Jika dikirim format 0.0 - 1.0
        fuelNum = Math.max(0, Math.min(100, fuelNum));
        
        let fuelTxt = document.getElementById('fuel');
        let fuelBar = document.getElementById('fuel-bar');
        if (fuelTxt) fuelTxt.innerText = fuelNum.toFixed(1) + '%';
        if (fuelBar) fuelBar.style.width = fuelNum + '%';
    }

    // 5. Kondisi Mesin / Health
    let health = data.health ?? data.engineHealth;
    if (health !== undefined) {
        let hNum = Number(health);
        if (hNum > 100) hNum = hNum / 10; // Jika FiveM mengirim skala 0 - 1000
        else if (hNum <= 1) hNum = hNum * 100;
        hNum = Math.max(0, Math.min(100, hNum));

        let healthTxt = document.getElementById('health');
        let healthBar = document.getElementById('health-bar');
        if (healthTxt) healthTxt.innerText = hNum.toFixed(1) + '%';
        if (healthBar) healthBar.style.width = hNum + '%';
    }

    // 6. Gigi / Gear
    let gear = data.gear;
    if (gear !== undefined) {
        let gearEl = document.getElementById('gear');
        if (gearEl) {
            if (gear === 0 || gear === '0' || gear === 'R') {
                gearEl.innerText = 'R';
            } else {
                gearEl.innerText = String(gear).toUpperCase();
            }
        }
    }

    // 7. Mesin (Engine)
    let engine = data.engine ?? data.engineOn;
    if (engine !== undefined) {
        let txt = document.getElementById('engine');
        let box = document.getElementById('engine-box');
        let isON = (engine === true || engine === 1 || engine === 'ON');
        if (txt) txt.innerText = isON ? 'ON' : 'OFF';
        if (box) box.classList.toggle('active', isON);
    }

    // 8. Sabuk Pengaman (Seatbelt)
    let seatbelt = data.seatbelt ?? data.belt;
    if (seatbelt !== undefined) {
        let txt = document.getElementById('seatbelts');
        let box = document.getElementById('seatbelt-box');
        let icon = document.getElementById('seatbelt-icon');
        let isON = (seatbelt === true || seatbelt === 1);
        if (txt) txt.innerText = isON ? 'ON' : 'OFF';
        if (box) box.classList.toggle('active', isON);
        if (icon) icon.className = isON ? 'fa-solid fa-user-check' : 'fa-solid fa-user-slash';
    }

    // 9. Lampu (Headlights)
    let lights = data.lights ?? data.headlights;
    if (lights !== undefined) {
        let txt = document.getElementById('headlights');
        let box = document.getElementById('headlight-box');
        let icon = document.getElementById('headlight-icon');
        
        if (lights === 1 || lights === 'LOW') {
            if (txt) txt.innerText = 'LOW';
            if (box) box.classList.add('active');
            if (icon) icon.className = 'fa-solid fa-lightbulb';
        } else if (lights === 2 || lights === 'HIGH') {
            if (txt) txt.innerText = 'HIGH';
            if (box) box.classList.add('active');
            if (icon) icon.className = 'fa-solid fa-sun';
        } else {
            if (txt) txt.innerText = 'OFF';
            if (box) box.classList.remove('active');
            if (icon) icon.className = 'fa-solid fa-lightbulb';
        }
    }

    // 10. Odometer
    let odo = data.odometer ?? data.odo;
    if (odo !== undefined) {
        let odoEl = document.getElementById('odometer');
        if (odoEl) odoEl.innerText = Number(odo).toFixed(1) + ' Miles';
    }
});
