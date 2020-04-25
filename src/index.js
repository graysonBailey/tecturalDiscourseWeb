import _ from 'lodash';
import './style.css';
import p5 from 'p5';
import io from 'socket.io-client';
import dUnit from './dUnit.js';
import back from './back.js';
import {content, discourseUnit, discourses, position} from './content.js';
const path = require('path');
const socket = io('http://localhost:3000');


async function postDATA(url, data){
  const response = await fetch(url, {
    method:'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json()
}
let fargon ={x:"hardbodies", m:"oh those movie boys"}
postDATA('/api', fargon)
  .then((fargon) =>{
    console.log(fargon)
  });



async function getDATA(url){
  try{
    const myReq = new Request(url,{method:'GET'})
    const response = await fetch(myReq);
    const body = await response.json();
    console.log(await body);
    return body;
  } catch(error) {
    console.log(error);
    console.log("failure at howdy - client");

  }
}

async function getBase(url){
  try{
    const response = await fetch(url);
    const body = await response.json();
    return body
  } catch(error) {
    console.log(error);
    console.log("failure at database retrieval - client");

  }
}

getDATA('/howdy').then(body => console.log("base"+ body))
getBase('/database').then(body => console.log(body))




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


back()


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

    if(p.keyCode === 32){
      console.log("spaced")
      if(document.getElementsByClassName('geist').length < 1){
        let input = p.createElement("textarea").class('geist')
        input.position(p.mouseX,p.mouseY)
        console.log(input.position())
        input.id('tempGeist')
      }
    }else if(p.keyCode == p.ESCAPE){
      let temp = document.getElementById('tempGeist')
      if( temp != null){temp.remove()}
    } else if(p.keyCode == p.ENTER){
      let temp = document.getElementById('tempGeist')
      if( temp != null){
        let ttop = temp.offsetTop
        let tleft = temp.offsetLeft
        let tcont = temp.value
        let tempDisc = new discourseUnit(tcont, {x:tleft,y:ttop+position}, 0);
        discourses.push(tempDisc)
        socket.emit('unit', tempDisc);
        temp.remove();
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




content(discourses)
