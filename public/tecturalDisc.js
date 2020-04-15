var socket;
var tFont;

function preload() {
  tFont = loadFont("OCRAStd.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  textFont(tFont);
  socket = io.connect('localhost:3000');
  socket.on('mouse', newDrawing);
}

function draw() {
  background(0);
  fill(0);

  let hello = d => console.log(d)
  curs();
}




function curs() {
  stroke(47,230,240);
  push();
  translate(mouseX,mouseY);
  strokeWeight(3);
  point(0, 5);
  point(5, 0);
  point(0, 0);
  pop();
  noStroke();
}


function newDrawing(data, tex) {
  noStroke();
  fill(255, 0, 100);
  console.log(data.talk);

  ellipse(data.x, data.y, 36, 36);

  fill(0);
  text(data.talk, data.x, data.y);

}


function mouseDragged() {

  var tex = "loser";

  var data = {
    x: mouseX,
    y: mouseY,
    talk: tex
  }

  console.log(data.talk);

  socket.emit('mouse', data);
  socket.emit('text', tex);

  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 60, 60);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(51);
}

function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}
