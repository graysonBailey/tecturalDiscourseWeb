import {
  mode,
  socket
} from './index.js'
import {
  overlay
} from './threeCanvases.js'
import {
  discourses
} from './content.js';
export const screenAgent = new screenAgency(overlay)

export class screenAgency {
  constructor(p5) {
    this.p5 = p5
    this.inPanel
    this.inButton
    this.escButton
  }

  submitUnit() {
    if (this.inPanel.value != "") {
      let ttop = this.inPanel.offsetTop
      let tleft = this.inPanel.offsetLeft
      let tcont = this.inPanel.value
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
      this.inPanel.remove()
      tempButton.remove()
      discourses.addUnit(tDisc.c, tDisc.p, tDisc.t, tDisc.u, [])
      socket.emit('unit', tDisc);
      discourses.vis()
    } else {
      temp.placeholder = '!!! empty unit cannot be submitted \r\n \r\n fill the area with discursive content \r\n \r\n ...or press ESCAPE to remove the input area'
    }
  }

  setPositions() {
    document.getElementById("x-coord").innerHTML = this.p5.mouseX
    document.getElementById("y-coord").innerHTML = this.p5.mouseY
  }

  createInput() {
    // link to keyDown SPACE VanillaJS
    // link to mode 1
    if (document.getElementsByClassName('geist').length < 1) {
      this.inPanel = this.p5.createElement("textarea").class('geist')
      this.inButton = this.p5.createButton('submit').class('geistButton')
      this.escButton = this.p5.createButton('X').class('geistButton')
      this.inButton.position(this.p5.mouseX, this.p5.mouseY - 20)
      this.escButton.position(this.p5.mouseX + 350, this.p5.mouseY - 20)
      this.inPanel.position(this.p5.mouseX, this.p5.mouseY)
      this.inPanel.id('tempGeist')
      this.inPanel.attribute('placeholder', '. r/ ____ provide for response \r\n. q/ ____ provide for quotation \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n \r\n. // ____ provide before citation')
      this.inButton.id('tempGeistButton')
      this.inButton.mousePressed(this.submitUnit)
      this.escButton.mousePressed(this.escapeInput)
    }

    console.log(this.inPanel.position)
  }

  escapeInput() {
    this.inPanel.remove()
    this.inButton.remove()
    this.escpButton.remove()
  }

  newDrawing(data) {
    console.log("did it get in?")
    this.p5.noStroke();
    this.p5.fill(255, 0, 100);
    this.p5.fill(230, 47, 240);
    this.p5.text(data.talk, data.x, data.y);
  }



}
