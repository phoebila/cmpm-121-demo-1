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

// button listener for premium
premiumLI.addEventListener('click', () => {
    if (appCount >= 10){
        appCount-= 10;
        appGrowth += 1;
        updateAppDisplay();
    }
})

// updating the applications display
const updateAppDisplay = () => {
    appDisplay.textContent = `${Math.floor(appCount)} applications have been sent!`;
    premiumLI.disabled = appCount < 10;
}


// STYLING  ---------------------------------
// Style the premium button
premiumLI.style.padding = '10px 20px';
premiumLI.style.fontSize = '16px';
premiumLI.style.marginTop = '20px';

// styling the button
button.style.padding = '10px 10px';
button.style.fontSize = '28px';
button.style.marginTop = '10px';
console.log(appCount);

app.append(header);
app.append(button);
app.append(appDisplay);
app.append(premiumLI);
