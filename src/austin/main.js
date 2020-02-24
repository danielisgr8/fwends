let box = document.getElementsByClassName("movingBox")[0];
const body = document.getElementById("body");

let moving = false, offsetX = 0, offsetY = 0;

const initBox = (pageX, pageY) => {
  moving = true;
  offsetX = pageX;
  offsetY = pageY;
  box.style.left = 0;
  box.style.top = 0;
}

const moveBox = (pageX, pageY) => {

  box.style.left = `${pageX - offsetX}px`;
  box.style.top = `${pageY - offsetY}px`;
}

const endBox = () => {
  console.log("end");
  moving = false;

  const newBox = box.cloneNode();
  newBox.style.left = 0;
  newBox.style.top = 0;

  const props = ["onmousedown", "onmouseup"];
  props.forEach((prop) => {
    newBox[prop] = box[prop];
    box[prop] = null;
  });

  const events = ["touchstart", "touchend"];
  const fns = [ontouchstart, endBox];
  events.forEach((event, i) => {
    box.removeEventListener(event, fns[i]);
    newBox.addEventListener(event, fns[i], { passive: true });
  });

  newBox.zIndex = "2";
  box.zIndex = "1";

  box = newBox;

  body.appendChild(newBox);
}

const ontouchstart = (e) => {
  console.log("touch");
  initBox(e.touches[0].clientX, e.touches[0].clientY);
}

box.addEventListener("touchstart", ontouchstart, { passive: true });

box.onmousedown = (e) => {
  initBox(e.pageX, e.pageY);
}

const ontouchmove = (e) => {
  if(!moving) return;

  moveBox(e.touches[0].clientX, e.touches[0].clientY);
}

body.addEventListener("touchmove", ontouchmove, { passive: true });

body.onmousemove = (e) => {
  if(!moving) return;

  moveBox(e.pageX, e.pageY);
}

box.addEventListener("touchend", endBox, { passive: true });

box.onmouseup = endBox;
