import p5 from 'p5/lib/p5.min.js';
import{discourses} from './content.js'

export const content = new p5((j) => {

  let tFont;

  j.preload = function() {
    tFont = j.loadFont("f7f26928c6b1edc770c616475459ecc8.otf");
  }

  j.setup = () => {
    j.createCanvas(j.displayWidth, j.displayHeight)
    j.textFont(tFont)
  }

  j.refresh = function() {
    j.clear();
    discourses.vis()
  }

  j.mouseWheel = function(event) {
    // j.clear()
    // position -= event.delta / 5
    // let temp = document.getElementsByClassName('pend')
    // while (temp[0]) {
    //   temp[0].parentNode.removeChild(temp[0])
    // }
    // j.refresh()
  }
}, 'content')

export const back = new p5((d) => {
    d.setup = () => {
      d.createCanvas(d.windowWidth, d.windowHeight+50)
      d.refreshed()
    }

    d.refreshed = function() {
      d.background(0)
      for (let i = 150; i < d.windowWidth-100; i += 25) {
        d.stroke(205)
        d.strokeWeight(.5);
        d.line(i, 0, i+25, d.windowHeight+50)
      }
    }

    d.windowResized = function() {
      d.resizeCanvas(d.windowWidth, d.windowHeight)
      d.refreshed()
    }
  }, 'back')
