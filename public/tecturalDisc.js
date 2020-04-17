var socket;
var tFont;
let curs;
var discourse;
var pointers = [];


window.onload = function() {
  document.getElementById('about-this-website').onclick = () => {
    document.getElementById('about-window-overlay').classList.remove('disabled');
  }
}



function preload() {
  tFont = loadFont("OCRAStd.otf");
  discourse = loadJSON("allgemeine.json");
}


function displayDiscourse() {
  fill(255);
  text(discourse, 100, 100, 400, 1000)
  var units = discourse.units

  for (var each in units) {
    let unit = units[each];
    text(unit.Base, unit.PosX, unit.PosY, 400, 1000)
    console.log(units[each])
  }
}



// for( var element of discourse){
// console.log(element.PosX)
//
// }
function setStage() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textFont(tFont);
  socket = io.connect('localhost:3000');
  socket.on('mouse', newDrawing);
  cursor("swift.png")
  displayDiscourse();
  pointers = [createVector(0, 0), createVector(0, 0)]
}



function setup() {
  setStage();
}

// function draw() {
// }


function setPositions() {
  document.getElementById("x-coord").innerHTML = mouseX
  document.getElementById("y-coord").innerHTML = mouseY
}

function newDrawing(data, tex) {
  noStroke();
  fill(255, 0, 100);
  fill(230, 47, 240);
  text(data.talk, data.x, data.y);
}


function mouseDragged() {

  var tex = "loser";
  var data = {
    x: mouseX,
    y: mouseY,
    talk: tex
  }
  socket.emit('mouse', data);
  socket.emit('text', tex);
  noStroke();
  fill(47, 230, 240)
  ellipse(mouseX, mouseY, 20, 20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  setStage();
}

function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function mouseClicked() {
  if (pointers[0].x + pointers[0].y == 0) {
    pointers[0].x = mouseX
    pointers[0].y = mouseY
    console.log("POINTER ONE" + pointers[0])
  } else {
    pointers[1].x = mouseX
    pointers[1].y = mouseY
    console.log("POINTER TWO" + pointers[1])
    stroke('#ffA908');
    strokeWeight(1);
    line(pointers[0].x, pointers[0].y, pointers[1].x, pointers[1].y);
    pointers[0] = createVector(0, 0);
  }
}

function mouseMoved() {
  setPositions()
}
