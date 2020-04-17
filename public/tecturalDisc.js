var socket;
var tFont;
let curs;
var discourse;


window.onload = function() {
  document.getElementById('about-this-website').onclick = () => {
    document.getElementById('about-window-overlay').classList.remove('disabled');
  }



}



function preload() {
  tFont = loadFont("OCRAStd.otf");
  discourse = loadJSON("allgemeine.json");

}


function displayDiscourse(){
  fill(255);
  text(discourse,100,100,400,1000)
  var units =discourse.units

for(var each in units){

  let unit = units[each];

  text(unit.Base,unit.PosX,unit.PosY,400,1000)
console.log(units[each])
}


}



// for( var element of discourse){
// console.log(element.PosX)
//
// }
function setStage(){

  createCanvas(windowWidth, windowHeight);
  background(0);
  textFont(tFont);
  socket = io.connect('localhost:3000');
  socket.on('mouse', newDrawing);

noCursor();
  //cursor("swift.png");
  displayDiscourse();
}



function setup() {
setStage();
}

function draw() {
//background(0,5);

}


function setPositions() {
  document.getElementById("x-coord").innerHTML = mouseX
  document.getElementById("y-coord").innerHTML = mouseY
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
  background(0);
}

function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }




}

function mouseMoved() {
  setPositions()
}
