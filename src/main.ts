import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameConfig = {
    name: "Application Clicker",
    upgrades: [
        {name: "Premium", description: "LinkedIn Premium!", cost: 10, rate: 1},
        {name: "Indeed", description: "Indeed Membership!", cost: 10, rate: 0.1},
        {name: "Handshake", description: "Handshake Plus!", cost: 100, rate: 2},
        {name: "Glassdoor", description: "Glassdoor Unlimited!", cost: 1000, rate: 50},
        {name: "Recruiter", description: "Helps you find jobs!", cost: 50, rate: 100},
        {name: "My dad is the CEO", description: "Easy job entry!", cost: 500000, rate: 0}
    ],
    style: {
        button: { padding: '10px 20px', fontSize: '16px', marginTop: '20px' },
        mainButton: { padding: '10px 10px', fontSize: '28px', marginTop: '10px' },
        statusDisplay: { marginTop: '20px', fontSize: '18px' }
    }
};

// Set title and header text from config
document.title = gameConfig.name;
const header = document.createElement("h1");
header.innerHTML = gameConfig.name;

// Utility function for styling elements
const styleElement = (element: HTMLElement, style: {[key: string]: string}) => {
    Object.assign(element.style, style);
};

// State management
interface Upgrade {
    name: string,
    description: string,
    cost: number,
    rate: number,
}

const upgradeCosts = new Map<string, number>();
const upgradeCounts = new Map<string, number>();

gameConfig.upgrades.forEach(upgrade => {
    upgradeCosts.set(upgrade.name, upgrade.cost);
    upgradeCounts.set(upgrade.name, 0);
});

// Create upgrade buttons from config data
const upgradeContainer = document.createElement('div');
gameConfig.upgrades.forEach(upgrade => {
    const upgradeButton = document.createElement('button');
    const updateButtonText = () => {
        const currCost = upgradeCosts.get(upgrade.name)!;
        upgradeButton.textContent = `Buy ${upgrade.name}: ${upgrade.description} (Cost: ${currCost.toFixed(2)} units, +${upgrade.rate} units/sec)`;
    };

    updateButtonText();
    upgradeButton.disabled = true;
    upgradeButton.addEventListener('click', () => purchaseUpgrade(upgrade, upgradeButton, updateButtonText));
    styleElement(upgradeButton, gameConfig.style.button);
    upgradeContainer.append(upgradeButton);
});

// Button for sending applications
const button = document.createElement("button");
button.textContent = '📄';
styleElement(button, gameConfig.style.mainButton);

// Display for sent applications
const appDisplay = document.createElement('div');
let appCount: number = 0;
appDisplay.textContent = `${appCount} applications have been sent!`;

// Growth over time
let timeStamp: number = 0;
let appGrowth: number = 1;

// Animation loop for continuous growth
const updateApps = (timestamp: number) => {
    if (!timeStamp) timeStamp = timestamp;
    const delta = timestamp - timeStamp;
    appCount += (delta / 1000) * appGrowth;
    updateAppDisplay();
    timeStamp = timestamp;
    requestAnimationFrame(updateApps);
};

// Purchase upgrade function
const purchaseUpgrade = (upgrade: Upgrade, button: HTMLButtonElement, updateText: Function) => {
    const currCost = upgradeCosts.get(upgrade.name)!;
    if (appCount >= currCost) {
        appCount -= currCost;
        appGrowth += upgrade.rate;
        upgradeCounts.set(upgrade.name, upgradeCounts.get(upgrade.name)! + 1);
        upgradeCosts.set(upgrade.name, currCost * 1.15);
        updateText();
        updateAppDisplay();
    }
};

// Display sections for app count and upgrades
const statusDisplay = document.createElement('div');
const growthRateDisplay = document.createElement('div');
const upgradeCountDisplay = document.createElement('div');
statusDisplay.append(growthRateDisplay, upgradeCountDisplay);
styleElement(statusDisplay, gameConfig.style.statusDisplay);

const updateAppDisplay = () => {
    appDisplay.textContent = `${Math.floor(appCount)} applications have been sent!`;
    gameConfig.upgrades.forEach(upgrade => {
        const currentCost = upgradeCosts.get(upgrade.name)!;
        const upgradeButton = upgradeContainer.querySelector(`button:nth-child(${gameConfig.upgrades.indexOf(upgrade) + 1})`) as HTMLButtonElement;
        upgradeButton.disabled = appCount < currentCost;
    });
    growthRateDisplay.textContent = `Current growth rate: ${appGrowth.toFixed(1)} applications/sec`;
    upgradeCountDisplay.innerHTML = `
        Upgrades Purchased: <br>
        ${gameConfig.upgrades.map(upgrade => `Upgrade ${upgrade.name}: ${upgradeCounts.get(upgrade.name)}`).join('<br>')}
    `;
};

// Event listeners and initialization
button.addEventListener('click', () => {
    appCount++;
    updateAppDisplay();
});

requestAnimationFrame(updateApps);
app.append(header, button, appDisplay, upgradeContainer, statusDisplay);
