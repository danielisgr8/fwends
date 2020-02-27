const canvas = document.querySelector("canvas");
const buttonsEl = document.getElementById("buttons");
const punchEl = document.getElementById("punch");
const noteEl = document.getElementById("note");

const ctx = canvas.getContext("2d");

const getScaler = (boundingW, boundingH, w, h) => {
  const wRatio = boundingW / w;
  const hRatio = boundingH / h;

  return Math.min(wRatio, hRatio);
};

let state;
const updateState = (newState) => {
  state = newState;
  if(state === "punch") {
    punchEl.disabled = true;
    noteEl.disabled = false;
  } else {
    punchEl.disabled = false;
    noteEl.disabled = true;
  }
};
updateState("punch");

punchEl.addEventListener("click", () => updateState("punch"));
noteEl.addEventListener("click", () => updateState("note"));

const doorImg = new Image();
doorImg.addEventListener("load", () => {
  const scaler = getScaler(document.body.clientWidth, document.body.clientHeight - buttonsEl.clientHeight, doorImg.width, doorImg.height);
  const newWidth = doorImg.width * scaler;
  const newHeight = doorImg.height * scaler;

  [canvas, doorImg].forEach((el) => {
    el.width = newWidth;
    el.height = newHeight;
  });

  ctx.drawImage(doorImg, 0, 0, doorImg.width, doorImg.height);
});
doorImg.src = "./door.jpg";

let punchReady = false;
const punchImg = new Image();
punchImg.addEventListener("load", () => {
  punchReady = true;
  punchImg.width = 0.1 * canvas.width; punchImg.height = 0.1 * canvas.width;
});
punchImg.src = "./punch.png";

let noteReady = false;
const noteImg = new Image();
noteImg.addEventListener("load", () => noteReady = true);
noteImg.src = "./note.png";

const addImg = (clickX, clickY) => {
  if((state === "punch" && !punchReady) || (state === "note" && !noteReady)) return;

  let img;
  if(state === "punch") img = punchImg;
  else if(state === "note") img = noteImg;

  const dimension = 0.25 * canvas.width;

  const offsetX = clickX - dimension / 2;
  const offsetY = clickY - dimension / 2;

  ctx.drawImage(img, offsetX, offsetY, dimension, dimension);
}

canvas.addEventListener("touchstart", (e) => {
  const offset = (document.body.clientWidth - canvas.clientWidth) / 2;
  addImg(e.touches[0].clientX - offset, e.touches[0].clientY);

  e.preventDefault();
});

canvas.addEventListener("click", (e) => {
  addImg(e.offsetX, e.offsetY);
});
