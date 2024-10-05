import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Application Clicker";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

// Step 1 - Button
const button = document.createElement("button");
button.textContent = '📄';

// Step 2 - Counter
const appDisplay = document.createElement('div');
let appCount: number = 0;
appDisplay.textContent = `${appCount} applications have been sent!`;

// listener for when the button is clicked
button.addEventListener('click', () => {
    appCount++;
    appDisplay.textContent = `${appCount} applications have been sent!`;
});

// Step 3 - Automatic clicker!
const applicationClicker = () => {
    appCount++;
    appDisplay.textContent = `${appCount} applications have been sent!`;
}

setInterval(applicationClicker, 100);

// styling the button
button.style.padding = '10px 10px';
button.style.fontSize = '28px';
button.style.marginTop = '10px';
console.log(appCount);

app.append(header);
app.append(button);
app.append(appDisplay);
