import p5 from 'p5';
import discourseJSON from './allgemeine.json';

export default function() {
new p5((j) => {
    let tFont;
    let position = 0
    let discourse

  j.preload = function() {
    tFont = j.loadFont("f7f26928c6b1edc770c616475459ecc8.otf");
    discourse = discourseJSON
  }

  j.setup= () =>{
    j.createCanvas(j.displayWidth,j.displayHeight)
    j.textFont(tFont)
    j.refresh()
  }

  j.refresh = function(){
    j.displayDiscourse()
  }

  j.displayDiscourse = function() {
    j.noStroke()
    j.fill(255)
    j.textSize(16)
    let units = discourse.units
    for (let each in units) {
      let unit = units[each]
      if(unit.PosX > 0 && unit.PosX < j.windowWidth && unit.PosY+position > -30 && unit.PosY+position < j.windowHeight) {
        j.text(unit.Base, unit.PosX, unit.PosY+position, 400, 1000)
      }
    }
  }

  j.mouseWheel = function(event){
    j.clear()
    position-= event.delta/5
    j.refresh()
  }
}, 'content')
}
