import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Application Clicker";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

// Step 1 - Button
const button = document.createElement("button");
let appCount = 0;
button.textContent = '📄';
button.addEventListener('click', () => {
    appCount++;
});
button.style.padding = '10px 10px';
button.style.fontSize = '28px';
button.style.marginTop = '10px';
console.log(appCount);

app.append(header);
app.append(button);
