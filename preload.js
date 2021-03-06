const { ipcRenderer } = require('electron');

const micButtonSelector = (tip) => `[data-tooltip*='${tip}']`;
const mutedUtterance = new SpeechSynthesisUtterance('muted');
const unmutedUtterance = new SpeechSynthesisUtterance('unmuted');


// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('load',() => {
  let mute = true;

  if (document.querySelector(micButtonSelector("Turn off microphone"))) {
    mute = false;
  }
  ipcRenderer.on('toggleMute', (event, arg) => {
    let selector = mute ? "Turn on microphone" : "Turn off microphone"
    window.speechSynthesis.speak(mute ? unmutedUtterance : mutedUtterance)
    mute = !mute
    document.querySelector(micButtonSelector(selector))?.click();
  })
  ipcRenderer.on('endCall', (event, arg) => {
    document.querySelector('[data-tooltip="Leave call"]').click()
  })

  //hide title bar
  setInterval(() => {
    document.querySelector('[aria-label="Show participant options"]').parentElement.style.display = "none"
    document.querySelector('[data-meeting-title]').parentElement.parentElement.style.display = "none"
  },5000)
})