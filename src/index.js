import _ from 'lodash';
import './style.css';
import p5 from 'p5/lib/p5.min.js';
import io from 'socket.io-client';
import $ from 'jQuery'
import dUnit from './dUnit.js';
import {
  overlay,
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
  // SOCKET STUFF TEMP//
  socket.on('mouse', overlay.newDrawing())
  socket.on('unit', overlay.logUnit())
    /////////////////
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
