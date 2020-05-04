import _ from 'lodash';
import './style.css';
import p5 from 'p5/lib/p5.min.js';
import io from 'socket.io-client';
import $ from 'jQuery'
import {
  back,
  content
} from './threeCanvases.js';
import {
  discourses,
  discourseUnit,
  discourseSet,
  getBase
} from './content.js';
import switchModeInstructions from './modeSwitch.js'
const path = require('path');
export const socket = io();
// Mode 0 is starting, Mode 1 is geistplane action, Mode 2 is relations
let mode = 0
export let position = 0;

async function postUNIT(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json()
}








window.onload = function() {

document.getElementById('overlay').addEventListener("wheel", event => reposition(event));

  document.getElementById('about-this-website').onclick = () => {
    document.getElementById('about-window-overlay').classList.remove('disabled');
    console.log("pressed it")
    mode = 0
  }
  document.getElementById('about-window-overlay-close').onclick = () => {
    document.getElementById('about-window-overlay').classList.add('disabled');
    console.log("pressed it")
  }

  document.getElementById('rp-b').onclick = () => {
    console.log("RELATIONS")
    document.getElementById('gp-b').classList.remove('current');
    document.getElementById('sp-b').classList.remove('current');
    document.getElementById('rp-b').classList.add('current');
    mode = 2;
    switchModeInstructions(mode)
  }

  document.getElementById('gp-b').onclick = () => {
    document.getElementById('rp-b').classList.remove('current');
    document.getElementById('sp-b').classList.remove('current');
    document.getElementById('gp-b').classList.add('current');
    mode = 1
    switchModeInstructions(mode)
  }

  document.getElementById('sp-b').onclick = () => {
    document.getElementById('rp-b').classList.remove('current');
    document.getElementById('gp-b').classList.remove('current');
    document.getElementById('sp-b').classList.add('current');
    mode = 0
    switchModeInstructions(mode)
  }
  getBase('/database').then(body => console.log(body))
}

export const overlay = () => {
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
      socket.on('unit', p.logUnit)
      p.fill(255)
    }

    p.logUnit = function(data) {
      discourses.addUnit(data.c, data.p, data.t, data.u,data.r)
      discourses.vis()
    }

    p.newDrawing = function(data) {
      p.noStroke();
      p.fill(255, 0, 100);
      p.fill(230, 47, 240);
      p.text(data.talk, data.x, data.y);
    }

    p.mouseDragged = function() {
      if (mode == 0) {
        var tex = "loser";
        var data = {
          x: p.mouseX,
          y: p.mouseY,
          talk: tex
        }
        socket.emit('mouse', data);
        p.noStroke();
        p.fill(47, 230, 240)
        p.ellipse(p.mouseX, p.mouseY, 20, 20);
      }
    }

    p.mouseClicked = function() {
      if (mode == 2) {
        discourses.concern()
      }
    }

    p.mouseMoved = function() {
      p.setPositions()
    }

    p.submitUnit = function() {
      let temp = document.getElementById('tempGeist')
      let tempButton = document.getElementById('tempGeistButton')
      if (temp.value != "") {
        let ttop = temp.offsetTop
        let tleft = temp.offsetLeft
        let tcont = temp.value
        let tDisc = {
          c: tcont,
          p: {
            x: tleft,
            y: ttop - position
          },
          t: 0,
          u: discourses.set.length,
          r: []
        }
        temp.remove()
        tempButton.remove()
        discourses.addUnit(tDisc.c, tDisc.p, tDisc.t, tDisc.u, [])
        socket.emit('unit', tDisc);
        discourses.vis()
      } else {
        temp.placeholder = '!!! empty unit cannot be submitted \r\n \r\n fill the area with discursive content \r\n \r\n ...or press ESCAPE to remove the input area'
      }
    }

    p.escapeUnit = function(){
      let temp = document.getElementById('tempGeist')
      let tempButton = document.getElementById('tempGeistButton')
        let tempEscButton = document.getElementById('escapeGeistButton')
      if (temp != null) {
        temp.remove()
        tempButton.remove()
        tempEscButton.remove()
      }
    }

    p.keyPressed = function() {

      if (p.keyCode === 32) {
        if (mode == 1) {
          if (document.getElementsByClassName('geist').length < 1) {
            let input = p.createElement("textarea").class('geist')
            let inputButton = p.createButton('submit').class('geistButton')
            let escButton = p.createButton('X').class('geistButton')
            inputButton.position(p.mouseX, p.mouseY - 20)
            escButton.position(p.mouseX+380,p.mouseY-20)
            input.position(p.mouseX, p.mouseY)
            input.id('tempGeist')
            input.attribute('placeholder', '. r/ ____ provide for response \r\n. q/ ____ provide for quotation \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n. // ____ provide before citation')
            inputButton.id('tempGeistButton')
            escButton.id('escapeGeistButton')
            inputButton.mousePressed(p.submitUnit)
            escButton.mousePressed(p.escapeUnit)
          }
        }
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
      }
    }
  }, 'overlay')
}

let checkInput = function() {
  let el = document.getElementById("tempGeist")
  if (el != null) {
    let tempText = el.value
    if (tempText.includes("r/")) {
      el.classList.remove('quotation')
      el.classList.add('response');

    } else if (tempText.includes("q/")) {
      el.classList.remove('response');
      el.classList.add('quotation')
    }
  }
}

overlay()

let reposition = function(event){
  content.clear()
  const delta = Math.sign(event.deltaY);
  position = position - (delta*30)
  discourses.vis()
}

$(document).on('keydown', '.geist', function() {
  checkInput()
})
