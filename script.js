let elements = {};
let speedMode = 1;
let indicators = 0;

function setEngine(state) {
    if (elements.engine) elements.engine.innerText = state ? 'ON' : 'OFF';
    if (elements.engineBox) {
        elements.engineBox.classList.toggle('active', !!state);
    }
}

function setSpeed(speed) {
    let convertedSpeed = 0;
    let unitLabel = 'KMH';

    switch(speedMode) {
        case 1:
            convertedSpeed = Math.round(speed * 2.236936);
            unitLabel = 'MPH';
            break;
        case 2:
            convertedSpeed = Math.round(speed * 1.943844);
            unitLabel = 'KNOTS';
            break;
        default:
            convertedSpeed = Math.round(speed * 3.6);
            unitLabel = 'KMH';
            break;
    }

    if (elements.speedVal) elements.speedVal.innerText = convertedSpeed;
    if (elements.speedUnit) elements.speedUnit.innerText = unitLabel;
}

function setRPM(rpm) {
    let clamped = Math.max(0, Math.min(1, rpm));
    if (elements.rpmVal) elements.rpmVal.innerText = clamped.toFixed(4);
    if (elements.rpmBar) elements.rpmBar.style.width = `${clamped * 100}%`;
}

function setFuel(fuel) {
    let clamped = Math.max(0, Math.min(1, fuel));
    let percentage = (clamped * 100).toFixed(1);
    if (elements.fuel) elements.fuel.innerText = `${percentage}%`;
    if (elements.fuelBar) elements.fuelBar.style.width = `${percentage}%`;
}

function setHealth(health) {
    let clamped = Math.max(0, Math.min(1, health));
    let percentage = (clamped * 100).toFixed(1);
    if (elements.health) elements.health.innerText = `${percentage}%`;
    if (elements.healthBar) elements.healthBar.style.width = `${percentage}%`;
}

function setGear(gear) {
    if (!elements.gear) return;
    if (gear === 0 || gear === '0') {
        elements.gear.innerText = 'N';
    } else {
        elements.gear.innerText = String(gear).toUpperCase();
    }
}

function setHeadlights(state) {
    if (!elements.headlights || !elements.headlightBox || !elements.headlightIcon) return;

    if (state === 1) {
        elements.headlights.innerText = 'LOW';
        elements.headlightBox.classList.add('active');
        elements.headlightIcon.className = 'fa-solid fa-lightbulb';
    } else if (state === 2) {
        elements.headlights.innerText = 'HIGH';
        elements.headlightBox.classList.add('active');
        elements.headlightIcon.className = 'fa-solid fa-sun';
    } else {
        elements.headlights.innerText = 'OFF';
        elements.headlightBox.classList.remove('active');
        elements.headlightIcon.className = 'fa-solid fa-lightbulb';
    }
}

function setLeftIndicator(state) {
    indicators = (indicators & 0b10) | (state ? 0b01 : 0b00);
    if (elements.indLeft) {
        elements.indLeft.classList.toggle('active', !!state);
    }
}

function setRightIndicator(state) {
    indicators = (indicators & 0b01) | (state ? 0b10 : 0b00);
    if (elements.indRight) {
        elements.indRight.classList.toggle('active', !!state);
    }
}

function setSeatbelts(state) {
    if (!elements.seatbelts || !elements.seatbeltBox || !elements.seatbeltIcon) return;

    if (state) {
        elements.seatbelts.innerText = 'ON';
        elements.seatbeltBox.classList.add('active');
        elements.seatbeltIcon.className = 'fa-solid fa-user-check';
    } else {
        elements.seatbelts.innerText = 'OFF';
        elements.seatbeltBox.classList.remove('active');
        elements.seatbeltIcon.className = 'fa-solid fa-user-slash';
    }
}

function setSpeedMode(mode) {
    speedMode = mode;
}

function setOdometer(distance) {
    if (elements.odometer) {
        elements.odometer.innerText = `${distance.toFixed(1)} Miles`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    elements = {
        engine: document.getElementById('engine'),
        engineBox: document.getElementById('engine-box'),
        speedVal: document.getElementById('speed-val'),
        speedUnit: document.getElementById('speed-unit'),
        rpmVal: document.getElementById('rpm-val'),
        rpmBar: document.getElementById('rpm-bar'),
        fuel: document.getElementById('fuel'),
        fuelBar: document.getElementById('fuel-bar'),
        health: document.getElementById('health'),
        healthBar: document.getElementById('health-bar'),
        gear: document.getElementById('gear'),
        headlights: document.getElementById('headlights'),
        headlightBox: document.getElementById('headlight-box'),
        headlightIcon: document.getElementById('headlight-icon'),
        indLeft: document.getElementById('ind-left'),
        indRight: document.getElementById('ind-right'),
        seatbelts: document.getElementById('seatbelts'),
        seatbeltBox: document.getElementById('seatbelt-box'),
        seatbeltIcon: document.getElementById('seatbelt-icon'),
        odometer: document.getElementById('odometer')
    };
});
