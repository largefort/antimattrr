// Game State
let antimatter = 0;
let buildings = [
    {cost: 10, production: 1, count: 0},
    {cost: 100, production: 10, count: 0}
];
let lastUpdateTime = Date.now();

// DOM Elements
const antimatterElement = document.getElementById('antimatter');
const harvestButton = document.getElementById('harvestButton');
const buyButtons = document.querySelectorAll('.buyButton');

// Functions
function updateAntimatterDisplay() {
    antimatterElement.innerText = antimatter;
}

function harvestAntimatter() {
    antimatter++;
    updateAntimatterDisplay();
}

function buyBuilding(index) {
    const building = buildings[index];
    if (antimatter >= building.cost) {
        antimatter -= building.cost;
        building.count++;
        building.cost = Math.round(building.cost * 1.1);  // Increase cost by 10%
        updateAntimatterDisplay();
    }
}

function produceAntimatter() {
    const elapsed = (Date.now() - lastUpdateTime) / 1000; // seconds
    lastUpdateTime = Date.now();
    let production = 0;
    buildings.forEach(building => {
        production += building.production * building.count * elapsed;
    });
    antimatter += production;
    updateAntimatterDisplay();
}

function saveGame() {
    const gameState = {
        antimatter,
        buildings,
        lastUpdateTime
    };
    localStorage.setItem('antimatterTycoonSave', JSON.stringify(gameState));
}

function loadGame() {
    const savedGame = localStorage.getItem('antimatterTycoonSave');
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        antimatter = gameState.antimatter;
        buildings = gameState.buildings;
        lastUpdateTime = gameState.lastUpdateTime;
        produceAntimatter();
        updateAntimatterDisplay();
    }
}

// Event Listeners
harvestButton.addEventListener('click', harvestAntimatter);
buyButtons.forEach((button, index) => {
    button.addEventListener('click', () => buyBuilding(index));
});

// Game Loop
setInterval(() => {
    produceAntimatter();
    saveGame();
}, 10000); // Save and update every 10 seconds

// Initial Load
loadGame();
updateAntimatterDisplay();
