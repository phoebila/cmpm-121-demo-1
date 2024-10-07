import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Application Clicker";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

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

// update counter calc to increase based on time passed!!!
const updateApps = (timestamp: number) => {
    if (!timeStamp) timeStamp = timestamp;
    const delta = timestamp - timeStamp;

    // calc increment based on time
    const increment = (delta / 1000); // Increment by (delta ms / 1000 ms)
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
let appGrowth: number = 0; //no increase

// creating LinkedIn Premium button
const premiumLI = document.createElement('button');
premiumLI.textContent = "Buy LinkedIn Premium (10 applications)";
premiumLI.disabled = true; //starting disabled
let premiumLICount: number = 0;

// button listener for premium
premiumLI.addEventListener('click', () => {
    if (appCount >= 10){
        appCount-= 10;
        appGrowth += 1;
        premiumLICount++;
        updateAppDisplay();
    }
})

// Step 6 - Multiple Upgrades/Status --------------------------
// indeed upgrade
const indeed = document.createElement('button');
indeed.textContent = "Buy Indeed (10 applications)";
indeed.disabled = true;
let indeedCount: number = 0;

indeed.addEventListener('click', () => {
    if (appCount >= 10){
        appCount -= 10;
        appGrowth += .1; //increase .1 units per sec
        indeedCount++;
        updateAppDisplay();
    }
})

// handshake upgrade
const handshake = document.createElement('button');
handshake.textContent = "Buy Handshake (100 applications)";
handshake.disabled = true;
let handshakeCount: number = 0;

handshake.addEventListener('click', () => {
    if (appCount >= 100){
        appCount -= 100;
        appGrowth += 2; //increase 2 units per sec
        handshakeCount++;
        updateAppDisplay();
    }
})

// glassdoor upgrade
const glassdoor = document.createElement('button');
glassdoor.textContent = "Buy Glassdoor (1000 applications)";
glassdoor.disabled = true;
let glassdoorCount: number = 0;

glassdoor.addEventListener('click', () => {
    if (appCount >= 1000){
        appCount -= 1000;
        appGrowth += 50; //increase 50 units per sec
        glassdoorCount++;
        updateAppDisplay();
    }
})

// Status Display
const statusDisplay = document.createElement('div');
const growthRateDisplay = document.createElement('div');
const upgradeCountDisplay = document.createElement('div');

statusDisplay.append(growthRateDisplay);
statusDisplay.append(upgradeCountDisplay);

// updating apps display and enabling/disabling upgrade buttons
const updateAppDisplay = () => {
    appDisplay.textContent = `${Math.floor(appCount)} applications have been sent!`;
    premiumLI.disabled = appCount < 10;
    indeed.disabled = appCount < 10;
    handshake.disabled = appCount < 100;
    glassdoor.disabled = appCount < 1000;

    // Update the growth rate display
    growthRateDisplay.textContent = `Current growth rate: ${appGrowth.toFixed(1)} applications/sec`;

    // Update the count of items purchased
    upgradeCountDisplay.innerHTML = `
        Upgrades Purchased: <br>
        LinkedIn Premium: ${premiumLICount} <br>
        Indeed: ${indeedCount} <br>
        Handshake: ${handshakeCount} <br>
        Glassdoor: ${glassdoorCount}
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
styleButton(premiumLI);
styleButton(indeed);
styleButton(handshake);
styleButton(glassdoor);

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
app.append(premiumLI);
app.append(indeed);
app.append(handshake);
app.append(glassdoor);
app.append(statusDisplay);
