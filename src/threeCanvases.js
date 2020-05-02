import p5 from 'p5/lib/p5.min.js';
import {
  discourses
} from './content.js'

export const content = new p5((j) => {
  let tFont;
  j.preload = function() {
    tFont = j.loadFont("f7f26928c6b1edc770c616475459ecc8.otf");
  }
  j.setup = () => {
    j.createCanvas(j.displayWidth, j.displayHeight)
    j.textFont(tFont)
  }
}, 'content')

export const back = new p5((d) => {
  d.setup = () => {
    d.createCanvas(d.windowWidth, d.windowHeight + 50)
    d.refreshed()
  }

  d.refreshed = function() {
    d.background(0)
    for (let i = 150; i < d.windowWidth - 100; i += 25) {
      d.stroke(205)
      d.strokeWeight(.5);
      d.line(i, 0, i + 25, d.windowHeight + 50)
    }
  }

  d.windowResized = function() {
    d.resizeCanvas(d.windowWidth, d.windowHeight)
    d.refreshed()
  }
}, 'back')


export const overlay = () => {
  new p5((p) => {
    let tFont;

    p.preload = function() {
      tFont = p.loadFont("f7f26928c6b1edc770c616475459ecc8.otf");
    }

    p.setup = function() {
      p.createCanvas(p.displayWidth, p.displayHeight);
      console.log("setting up")
      p.textFont(tFont)
    }

    p.logUnit = function(data) {
      discourses.addUnit(data.c, data.p, data.t, data.u, data.r)
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

    p.keyPressed = function() {

      if (p.keyCode === 32) {
        if (mode == 1) {
          if (document.getElementsByClassName('geist').length < 1) {
            let input = p.createElement("textarea").class('geist')
            let inputButton = p.createButton('submit').class('geistButton')
            inputButton.position(p.mouseX, p.mouseY - 20)
            input.position(p.mouseX, p.mouseY)
            input.id('tempGeist')
            input.attribute('placeholder', '. r/ ____ provide for response \r\n. q/ ____ provide for quotation \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n. // ____ provide before citation')
            inputButton.id('tempGeistButton')
            inputButton.mousePressed(p.submitUnit)
          }
        }
      } else if (p.keyCode == p.ESCAPE) {
        let temp = document.getElementById('tempGeist')
        let tempButton = document.getElementById('tempGeistButton')
        if (temp != null) {
          temp.remove()
          tempButton.remove()
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
