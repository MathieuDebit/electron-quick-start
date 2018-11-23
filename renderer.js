// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const mainWindow = require('electron').remote.getCurrentWindow();
const screen = require('electron').screen;

const screensContainer = document.getElementById('screensContainer');
const resetPositionButton = document.getElementById('resetPositionButton');
const positionInfo = document.getElementById('positionInfo');
const positionX = document.getElementById('positionX');
const positionY = document.getElementById('positionY');

screen.getAllDisplays().map(display => {
  console.log(display);
  const elem = document.createElement('div');
  elem.innerHTML = JSON.stringify(display.bounds);
  screensContainer.appendChild(elem);
});

resetPositionButton.onclick = () => {
  mainWindow.setPosition(Number(positionX.value), Number(positionY.value));
  positionInfo.innerHTML = mainWindow.getPosition();
};
