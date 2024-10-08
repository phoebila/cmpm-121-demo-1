import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Application Clicker";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

// Step 9 - Refactoring -----------------------------------
interface Upgrades {
    name: string,
    description: string,
    cost: number,
    rate: number,
}

const availableUpgrades: Upgrades[] = [
        {name: "Premium", description: "LinkedIn Premium! ",cost: 10, rate: 1},
        {name: "Indeed", description: "Indeed Membership!",cost: 10, rate: .1},
        {name: "Handshake", description: "Handshake Plus!", cost: 100, rate: 2},
        {name: "Glassdoor", description: "Glassdoor Unlimited!",cost: 1000, rate: 50},
        // Step 10 - Content Expansion --------------------------
        {name: "Recruiter", description: "Helps you find jobs!",cost: 50, rate: 100},
        {name: "My dad is the CEO", description: "My dad's the CEO, so it wasn't an issue to find a job at the company!",cost: 500000, rate: 0},
]

// mapping to store the cost of each upgrade and the amount of each upgrade purchased
const upgradeCosts = new Map<string, number>();
const upgradeCounts = new Map<string, number>();

availableUpgrades.forEach(upgrade => {
    upgradeCosts.set(upgrade.name, upgrade.cost);
    upgradeCounts.set(upgrade.name, 0);
});

// Step 9.5 - Upgrades Container ------------------------------
const upgradeContainer = document.createElement('div');

// button creation for each upgrade
availableUpgrades.forEach(upgrade => {
    const upgradeButton = document.createElement('button');
    
    const upgradeButtonText = () => {
        const currCost = upgradeCosts.get(upgrade.name)!;
        upgradeButton.textContent = `Buy ${upgrade.name}: ${upgrade.description} (Cost: ${currCost.toFixed(2)} units, +${upgrade.rate} units/sec)`;
    }

    upgradeButtonText();
    upgradeButton.disabled = true;

    // adding listener to each upgrade button
    upgradeButton.addEventListener('click', () => {
        const currCost = upgradeCosts.get(upgrade.name)!;

        if (appCount >= currCost){
            appCount -= currCost;
            appGrowth += upgrade.rate; //increase growth rate

            upgradeCounts.set(upgrade.name, upgradeCounts.get(upgrade.name)! + 1); //increase purchase count

            // increasing price by 15%
            upgradeCosts.set(upgrade.name, currCost * 1.15);
            upgradeButtonText();
            updateAppDisplay();
        }
    });
    upgradeContainer.append(upgradeButton);
});

// Step 1 - Button ------------------------------------
const button = document.createElement("button");
button.textContent = '📄';

// Step 2 - Counter -----------------------------------
const appDisplay = document.createElement('div');
let appCount: number = 0;
appDisplay.textContent = `${appCount} applications have been sent!`;

// listener for when the button is clicked
button.addEventListener('click', () => {
    appCount++;
    updateAppDisplay();
});

// Step 3 - Automatic clicker! ---------------------------------
// const applicationClicker = () => {
//     appCount++;
//     appDisplay.textContent = `${appCount} applications have been sent!`;
// }

// setInterval(applicationClicker, 100);

// Step 4 - Continuous Growth ------------------------------
let timeStamp: number = 0;
let appGrowth: number = 1; //base growth rate

// update counter calc to increase based on time passed!!!
const updateApps = (timestamp: number) => {
    if (!timeStamp) timeStamp = timestamp;
    const delta = timestamp - timeStamp;

    // calc increment based on time
    const increment = (delta / 1000) * appGrowth; // Increment by (delta ms / 1000 ms)
    appCount += increment;

    // Update the button
    updateAppDisplay();

    // Set the timeStamp to the current timestamp
    timeStamp = timestamp;
    
    // Request the next animation frame
    requestAnimationFrame(updateApps);
}
// Start the animation
requestAnimationFrame(updateApps);

// Step 5 - Upgrades PEOPLE! --------------------------
// let appGrowth: number = 0; //no increase

// // creating LinkedIn Premium button
// const premiumLI = document.createElement('button');
// premiumLI.textContent = "Buy LinkedIn Premium (10 applications)";
// premiumLI.disabled = true; //starting disabled
// let premiumLICount: number = 0;
// let premiumLICost: number = 10;

// // button listener for premium
// premiumLI.addEventListener('click', () => {
//     if (appCount >= 10){
//         appCount-= 10;
//         appGrowth += 1;
//         premiumLICount++;
//         premiumLICost *= 1.15; //increase cost by 15%
//         updateAppDisplay();
//     }
// })

// Step 6 - Multiple Upgrades/Status --------------------------
// indeed upgrade
// const indeed = document.createElement('button');
// indeed.textContent = "Buy Indeed (10 applications)";
// indeed.disabled = true;
// let indeedCount: number = 0;
// let indeedCost: number = 10;

// indeed.addEventListener('click', () => {
//     if (appCount >= 10){
//         appCount -= 10;
//         appGrowth += .1; //increase .1 units per sec
//         indeedCount++;
//         indeedCost *= 1.15; //increase cost by 15%
//         updateAppDisplay();
//     }
// })

// // handshake upgrade
// const handshake = document.createElement('button');
// handshake.textContent = "Buy Handshake (100 applications)";
// handshake.disabled = true;
// let handshakeCount: number = 0;
// let handshakeCost: number = 100;

// handshake.addEventListener('click', () => {
//     if (appCount >= 100){
//         appCount -= 100;
//         appGrowth += 2; //increase 2 units per sec
//         handshakeCount++;
//         handshakeCost *= 1.15; //increase cost by 15%
//         updateAppDisplay();
//     }
// })

// // glassdoor upgrade
// const glassdoor = document.createElement('button');
// glassdoor.textContent = "Buy Glassdoor (1000 applications)";
// glassdoor.disabled = true;
// let glassdoorCount: number = 0;
// let glassdoorCost: number = 1000;

// glassdoor.addEventListener('click', () => {
//     if (appCount >= 1000){
//         appCount -= 1000;
//         appGrowth += 50; //increase 50 units per sec
//         glassdoorCount++;
//         glassdoorCost *= 1.15; //increase cost by 15%
//         updateAppDisplay();
//     }
// })

// Status Display
const statusDisplay = document.createElement('div');
const growthRateDisplay = document.createElement('div');
const upgradeCountDisplay = document.createElement('div');

statusDisplay.append(growthRateDisplay);
statusDisplay.append(upgradeCountDisplay);

// updating apps display and enabling/disabling upgrade buttons
const updateAppDisplay = () => {
    appDisplay.textContent = `${Math.floor(appCount)} applications have been sent!`;

    // Step 7 - Price Increases --------------------------
    // Enable/disable upgrades based on the current count
    availableUpgrades.forEach(upgrade => {
        const currentCost = upgradeCosts.get(upgrade.name)!;
        const upgradeButton = upgradeContainer.querySelector(`button:nth-child(${availableUpgrades.indexOf(upgrade) + 1})`) as HTMLButtonElement;
        upgradeButton.disabled = appCount < currentCost;
  });

  // Update the growth rate display
  growthRateDisplay.textContent = `Current growth rate: ${appCount.toFixed(1)} applications/sec`;

  // Update the count of upgrades purchased
  upgradeCountDisplay.innerHTML = `
      Upgrades Purchased: <br>
      ${availableUpgrades.map(upgrade => `Upgrade ${upgrade.name}: ${upgradeCounts.get(upgrade.name)}`).join('<br>')}
  `;
}

// STYLING  ---------------------------------
// making the button style into a function
const styleButton = (button: HTMLButtonElement) => {
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';
    button.style.marginTop = '20px';
}

// Style the premium button
// Style all upgrade buttons in the container
upgradeContainer.childNodes.forEach(button => styleButton(button as HTMLButtonElement));


// styling the button
button.style.padding = '10px 10px';
button.style.fontSize = '28px';
button.style.marginTop = '10px';

// status display
statusDisplay.style.marginTop = '20px';
statusDisplay.style.fontSize = '18px';

app.append(header);
app.append(button);
app.append(appDisplay);
app.append(upgradeContainer);
app.append(statusDisplay);
