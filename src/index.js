import _ from 'lodash';
import './style.css';
import p5 from 'p5';
import io from 'socket.io-client';
import dUnit from './dUnit.js';
import back from './back.js';
import content from './content.js';
let path = require('path');

const socket = io('http://localhost:3000');

back()
content()

new p5((p) => {
  let tFont;
  let curs;
  let pointers = [p.createVector(0, 0), p.createVector(0, 0)]
  let cnv;

  p.preload = function() {
    tFont = p.loadFont("f7f26928c6b1edc770c616475459ecc8.otf");
  }

  p.setup = function() {

    cnv = p.createCanvas(p.displayWidth, p.displayHeight);
    console.log("setting up")
    p.textFont(tFont)
    p.cursor("228ed835800150758bdcfe3a458531a8.png")
    socket.on('mouse', p.newDrawing)
    p.fill(255)
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




  p.mouseClicked = function() {
    if (pointers[0].x + pointers[0].y == 0) {
      pointers[0].x = p.mouseX
      pointers[0].y = p.mouseY
      // console.log("POINTER ONE" + pointers[0])
    } else {
      pointers[1].x = p.mouseX
      pointers[1].y = p.mouseY
      // console.log("POINTER TWO" + pointers[1])
      p.stroke('#ffA908');
      p.strokeWeight(1);
      p.line(pointers[0].x, pointers[0].y, pointers[1].x, pointers[1].y);
      pointers[0] = p.createVector(0, 0);
    }
  }

  p.mouseMoved = function() {
    p.setPositions()
  }



  p.keyPressed = function() {
    if(p.keyCode == p.ESCAPE){
      let temp = document.getElementById('tempGeist')
      if( temp != null){temp.remove()}
    }
  }

  p.setPositions = function() {
    document.getElementById("x-coord").innerHTML = p.mouseX
    document.getElementById("y-coord").innerHTML = p.mouseY
  }

  p.mousePressed = function() {
    if (p.mouseX > 0 && p.mouseX < 100 && p.mouseY > 0 && p.mouseY < 100) {
      let fs = p.fullscreen();
      p.fullscreen(!fs);
    } else if(document.getElementsByClassName('geist').length < 1){
      let input = p.createElement("textarea").class('geist')
        input.position(p.mouseX,p.mouseY)
        input.id('tempGeist')
    }
  }
}, 'overlay')



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
