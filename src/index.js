import _ from 'lodash';
import './style.css';
import p5 from 'p5';
import io from 'socket.io-client';
let path = require('path');

const socket = io('http://localhost:3000');





// new p5();




//const containerElement = document.getElementById('p5-container');

const sketch = (p) => {
  let x = 100;
  let y = 100;
  let can;


  let tFont;
  let curs;
  let discourse;
  let pointers = [];
  let position = 0
  let cnv;



  p.preload = function() {
    tFont = p.loadFont("f7f26928c6b1edc770c616475459ecc8.otf");
   // discourse = p.loadJSON("assets/allgemeine.json");
  }



  p.setup = function() {
    cnv = p.createCanvas(p.windowWidth, p.windowHeight)

    console.log("setting up")
    //p.textFont(tFont)

    socket.on('mouse', p.newDrawing)
    p.refresh()
    p.fill(255)
    p.text("HERE IS A TEST",100,100)


  }

  p.refresh = function() {
    p.background(0);


    p.cursor("228ed835800150758bdcfe3a458531a8.png");
    //p.displayDiscourse();
    //pointers = [p.createVector(0, 0), p.createVector(0, 0)]

    p.translate(0,position);
  }

  p.draw = function(){


  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    //p.background(0);
    p.refresh();
    console.log("resized!")
  }


  p.newDrawing = function(data, tex) {
    p.noStroke();
    p.fill(255, 0, 100);
    p.fill(230, 47, 240);
    p.text(data.talk, data.x, data.y);
  }


  p.mouseDragged = function() {

    var tex = "loser";
    var data = {
      x: p.mouseX,
      y: p.mouseY,
      talk: tex
    }
    socket.emit('mouse', data);
    socket.emit('text', tex);
    p.noStroke();
    p.fill(47, 230, 240)
    p.ellipse(p.mouseX, p.mouseY, 20, 20);
  }




  // p.setup = function() {
  //   can = p.createCanvas(800, 400);
  //     p.background(0);
  //   can.mousePressed(p.drawEllipse);
  // };
  //
  // p.draw = function() {
  //   p.fill(255);
  //
  //
  //
  //
  // };
  //
  // p.drawEllipse = function(){
  //
  //   p.ellipse(p.mouseX,p.mouseY,100,100);
  //   console.log("worked")
  //
  //
  // }


};

let baseSketch = new p5(sketch);










window.onload = function() {
  document.getElementById('about-this-website').onclick = () => {
    document.getElementById('about-window-overlay').classList.remove('disabled');
    console.log("pressed it")
  }
  document.getElementById('about-window-overlay-close').onclick = () => {
    document.getElementById('about-window-overlay').classList.add('disabled');
    console.log("pressed it")
  }
}




//
// function preload() {
//   tFont = loadFont("assets/OCRAStd.otf");
//   discourse = loadJSON("allgemeine.json");
// }





function displayDiscourse() {

for(let i = 0; i <windowHeight; i+=50){
stroke(255)
strokeWeight(.1)

line(100,i,windowWidth-100,i)

}


  noStroke();
  fill(255);
  let units = discourse.units
  for (let each in units) {
    let unit = units[each];
    if(unit.PosX > 0 && unit.PosX < windowWidth && unit.PosY+position > -30 && unit.PosY+position < windowHeight) {
    text(unit.Base, unit.PosX, unit.PosY+position, 400, 1000)
  }

    //console.log(units[each])
  }
}




// function refresh() {
//   background(31);
//
//
//   cursor("assets/swift.png");
//   displayDiscourse();
//   pointers = [createVector(0, 0), createVector(0, 0)]
//
//   translate(0,position);
// }



// function setup() {
//   cnv = createCanvas(windowWidth, windowHeight)
//   centerCanvas(cnv)
//   textFont(tFont)
//   socket = io.connect('localhost:8080')
//   socket.on('mouse', newDrawing)
//   refresh()
//
// }

function centerCanvas(can) {
  var x = 0;
  var y = 0;
  can.position(x, y);
  //can.style('z-index','-1')
}


function draw(){
}


function setPositions() {
  document.getElementById("x-coord").innerHTML = mouseX
  document.getElementById("y-coord").innerHTML = mouseY
}

// function newDrawing(data, tex) {
//   noStroke();
//   fill(255, 0, 100);
//   fill(230, 47, 240);
//   text(data.talk, data.x, data.y);
// }


// function mouseDragged() {
//
//   var tex = "loser";
//   var data = {
//     x: mouseX,
//     y: mouseY,
//     talk: tex
//   }
//   socket.emit('mouse', data);
//   socket.emit('text', tex);
//   noStroke();
//   fill(47, 230, 240)
//   ellipse(mouseX, mouseY, 20, 20);
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   background(0);
//   refresh();
// }

function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  } else if(document.getElementsByClassName('geist').length < 1){
    let input = createElement('textarea').class('geist');
      input.position(mouseX,mouseY)
      input.id('tempGeist')
  }
}

function mouseClicked() {
  if (pointers[0].x + pointers[0].y == 0) {
    pointers[0].x = mouseX
    pointers[0].y = mouseY
    // console.log("POINTER ONE" + pointers[0])
  } else {
    pointers[1].x = mouseX
    pointers[1].y = mouseY
    // console.log("POINTER TWO" + pointers[1])
    stroke('#ffA908');
    strokeWeight(1);
    line(pointers[0].x, pointers[0].y, pointers[1].x, pointers[1].y);
    pointers[0] = createVector(0, 0);
  }
}

function mouseMoved() {
  setPositions()
}

function mouseWheel(event){
position-= event.delta/2;
refresh();
}

function keyPressed(){

  if(keyCode == ESCAPE){
    let temp = document.getElementById('tempGeist')
    if( temp != null){
        temp.remove()
    }
  }
}
