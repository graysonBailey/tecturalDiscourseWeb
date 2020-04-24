import p5 from 'p5';
import discourseJSON from './allgemeine2.json';

export let discourses = [];
export let position = 0;

export class discourseUnit {
  constructor(_content, pos, type) {
    this._content = _content
    this.pos = pos
    this.type = type
  }
}

loadDiscourseUnitsToArray();


function loadDiscourseUnitsToArray() {

  let units = discourseJSON.units
  for (let each in units) {
    let unit = units[each]
    discourses.push(new discourseUnit(unit.c, unit.p, unit.t))
  }

}

export const content = (disc) => {
  let dU = disc
  new p5((j) => {
    let tFont;

    let discourse

    j.preload = function() {
      tFont = j.loadFont("f7f26928c6b1edc770c616475459ecc8.otf");
    }

    j.setup = () => {
      j.createCanvas(j.displayWidth, j.displayHeight)
      j.textFont(tFont)
      j.refresh()
    }

    j.refresh = function() {
      j.displayDiscourse()
    }

    j.displayDiscourse = function() {
      j.noStroke()

      j.textSize(16)
      for (let each in dU) {
        let unit = dU[each]
        if (unit.type == 0) {
          j.fill(255)
        } else if (unit.type == 1) {

          j.fill(255, 0, 0)
        }
        if (unit.pos.x > 0 && unit.pos.y < j.windowWidth && unit.pos.y + position > -30 && unit.pos.y + position < j.windowHeight) {
          j.text(unit._content, unit.pos.x, unit.pos.y + position, 400, 1000)
        }
      }
    }

    j.keyPressed = function() {
      if (j.keyCode == j.ENTER) {
        console.log("entered")
        j.clear()
        j.refresh()
      }
    }
    j.mouseWheel = function(event) {
      j.clear()
      position -= event.delta / 5
      j.refresh()
    }
  }, 'content')
}
