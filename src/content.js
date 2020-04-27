import p5 from 'p5';
export let discourses = [];
export let position = 0;

export class discourseUnit {
  constructor(c, p, t, u) {
    this.c = c
    this.p = p
    this.t = t
    this.u = u
  }
}



export async function getBase(url) {
  try {
    const response = await fetch(url)
    const body = await response.json()
    loadDiscourseUnitsToArray(body)
  } catch (error) {
    console.log(error)
    console.log("failure at database retrieval - client")
  }
}

function loadDiscourseUnitsToArray(units) {
  for (let each in units) {
    let unit = units[each]
    discourses.push(new discourseUnit(unit.c, unit.p, unit.t, unit.u))
  }
  console.log(discourses)
}


export const content = () => {
  let dU = discourses;
  console.log(discourses[0])
  new p5((j) => {
    let tFont;

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
        if (unit.t == 0) {
          j.fill(255)
        } else if (unit.t == 1) {

          j.fill(255, 0, 0)
        }
        if (unit.p.x > 0 && unit.p.y < j.windowWidth && unit.p.y + position > -30 && unit.p.y + position < j.windowHeight) {
          j.text(unit.c, unit.p.x, unit.p.y + position, 400, 1000)
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
      let temp = document.getElementsByClassName('pend')
      while (temp[0]) {
        temp[0].parentNode.removeChild(temp[0])
      }

      console.log(position)
      j.refresh()
    }
  }, 'content')
}
