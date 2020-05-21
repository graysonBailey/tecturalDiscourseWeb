import p5 from 'p5/lib/p5.min.js';
import {
  overlay
} from './index.js'
import {
  discourses,
  getBase
} from './content.js';

export class discursiveOverlay {
  constructor(p5) {
    this.p5 = p5
    this.filterKey = "don't"
  }

  giveChoices() {
      for(let each in discourses.nameSpaces){
        let text = discourses.nameSpaces[each]
         let tempBut = this.p5.createButton(text).class('spatialChoice').id(each).value(each)
         console.log("buttoned" + text)
         tempBut.position(210,160+(each*20))
         tempBut.mousePressed(() => {
           document.getElementById("filterKey").textContent = discourses.nameSpaces[tempBut.value()]
           tempBut.remove()
           discourses.vis();
           return
         })
      }
  }


  loadArchitectural() {
    getBase('/architectural', "arch").then(body => console.log(body))
    document.getElementById('rp-b').classList.remove('away')
    document.getElementById('gp-b').classList.remove('away')
    document.getElementById('archChoice').remove()
    document.getElementById('anarchChoice').remove()
    document.getElementById('verbundChoice').remove()
    document.getElementById('discursiveChoice').remove()
    document.getElementById('discourseLoad').classList.add('away')
    document.getElementById('switchLoad').classList.remove('away')
    console.log(discourses.db)
    overlay.clear()
  }

  loadAnarchic() {
    getBase('/anarchic', "an").then(body => console.log(body))
    document.getElementById('rp-b').classList.remove('away')
    document.getElementById('gp-b').classList.remove('away')
    document.getElementById('archChoice').remove()
    document.getElementById('anarchChoice').remove()
    document.getElementById('verbundChoice').remove()
    document.getElementById('discursiveChoice').remove()
    document.getElementById('discourseLoad').classList.add('away')
    document.getElementById('switchLoad').classList.remove('away')
    overlay.clear()
  }

  loadVerbunden() {
    getBase('/verbunden', "ver").then(body => console.log(body))
    document.getElementById('rp-b').classList.remove('away')
    document.getElementById('gp-b').classList.remove('away')
    document.getElementById('archChoice').remove()
    document.getElementById('anarchChoice').remove()
    document.getElementById('verbundChoice').remove()
    document.getElementById('discursiveChoice').remove()
    document.getElementById('discourseLoad').classList.add('away')
    document.getElementById('switchLoad').classList.remove('away')
    overlay.clear()
  }

  loaddiscursive() {
    getBase('/discursive', "med").then(body => console.log(body))
    document.getElementById('rp-b').classList.remove('away')
    document.getElementById('gp-b').classList.remove('away')
    document.getElementById('archChoice').remove()
    document.getElementById('anarchChoice').remove()
    document.getElementById('verbundChoice').remove()
    document.getElementById('discursiveChoice').remove()
    document.getElementById('discourseLoad').classList.add('away')
    document.getElementById('switchLoad').classList.remove('away')
    overlay.clear()
  }
}
