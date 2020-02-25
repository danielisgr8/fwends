const fgCanvas = document.querySelector("#fg");
const fgCtx = fgCanvas.getContext("2d");

const bgCanvas = document.querySelector("#bg");
const bgCtx = bgCanvas.getContext("2d");

const bobImg = document.querySelector("#bobImg");

const getScaler = (boundingW, boundingH, w, h) => {
  const wRatio = boundingW / w;
  const hRatio = boundingH / h;

  return Math.min(wRatio, hRatio);
};

const artImg = new Image();
artImg.addEventListener("load", () => {
  const scaler = getScaler(document.body.clientWidth, document.body.clientHeight, artImg.width, artImg.height);
  const newWidth = artImg.width * scaler;
  const newHeight = artImg.height * scaler;

  [fgCanvas, bgCanvas].forEach((c) => {
    c.width = newWidth;
    c.height = newHeight;
  });

  const bobHeight = newHeight * 0.4;
  const bobWidth = bobHeight * bobImg.width / bobImg.height;
  
  bobImg.style.height = `${bobHeight}px`;
  bobImg.style.width = `${bobWidth}px`;

  bobImg.style.top = `${newHeight - parseInt(bobImg.style.height, 10)}px`;
  
  bgCtx.drawImage(artImg, 0, 0, artImg.width * scaler, artImg.height * scaler);

  fgCtx.fillStyle = "#8B8A90";
  fgCtx.lineWidth = "50";
  fgCtx.fillRect(0, 0, newWidth, newHeight);
  fgCtx.globalCompositeOperation = "destination-out";
});
artImg.src = "./art.jpg";

let moving = false;

const beginPath = (x, y) => {
  moving = true;

  fgCtx.beginPath();
  fgCtx.moveTo(x, y);
}

const movePath = (x, y) => {
  if(!moving) return;

  fgCtx.lineTo(x, y);
  fgCtx.stroke();
}

const endPath = () => {
  if(!moving) return;

  moving = false;
}

fgCanvas.addEventListener("mousedown", (e) => {
  beginPath(e.offsetX, e.offsetY);
});

fgCanvas.addEventListener("touchstart", (e) => {
  beginPath(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: true });

fgCanvas.addEventListener("mousemove", (e) => {
  movePath(e.offsetX, e.offsetY);
});

fgCanvas.addEventListener("touchmove", (e) => {
  movePath(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: true });

fgCanvas.addEventListener("mouseup", endPath);

fgCanvas.addEventListener("touchend", endPath, { passive: true });
