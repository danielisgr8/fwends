const roleEl = document.getElementById("role");
const truthLieHolder = document.getElementById("truthLieHolder");
const truthEl = document.getElementById("truth");
const lieEl = document.getElementById("lie");
const eventTextEl = document.getElementById("event");
const nextEl = document.getElementById("next");
const playAgainEl = document.getElementById("playAgain");

const role = Math.random() > 0.5 ? "liberal" : "facist";
let choice;

const names = ["Daniel", "Lucas", "Isaac", "Jake", "Josh", "Austin", "Rachel", "Hannah", "Sydney", "Annalise", "Cat"];
let currentNames = names.slice();
let currentEvent = null;

const randInt = (min, max) => Math.floor((max - min) * Math.random()) + min;

const getName = () => {
  const index = randInt(0, currentNames.length);

  const name = currentNames[index];
  currentNames.splice(index, 1);
  if(currentNames.length === 0) currentNames = names;

  return name;
}

const nextEvent = () => {
  if(!currentEvent) {
    const possibleEvents = Math.random() > 0.15 ? events[role][choice] : events.either;
    currentEvent = possibleEvents[randInt(0, possibleEvents.length)];
  } else {
    currentEvent = currentEvent.nextEvents[randInt(0, currentEvent.nextEvents.length)];
  }

  eventTextEl.textContent = currentEvent.getString(getName);
  const nextDisplay = currentEvent.nextEvents ? "inline-block" : "none";
  const playAgainDisplay = currentEvent.nextEvents ? "none" : "inline-block";
  nextEl.style.display = nextDisplay;
  playAgainEl.style.display = playAgainDisplay;
}

const makeChoice = (playerChoice) => {
  choice = playerChoice;
  truthLieHolder.style.display = "none";
  nextEvent();
};

roleEl.textContent = `You are a ${role}.`;

truthEl.onclick = () => makeChoice("truth");
lieEl.onclick = () => makeChoice("lie");

nextEl.onclick = nextEvent;
playAgainEl.onclick = () => location.reload();
