// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const mainWindow = require('electron').remote.getCurrentWindow();
const resetPositionButton = document.getElementById('resetPositionButton');
const positionInfo = document.getElementById('positionInfo');

resetPositionButton.onclick = () => {
  mainWindow.setPosition(0, 0);
  positionInfo.innerHTML = mainWindow.getPosition();
};
