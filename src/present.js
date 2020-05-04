import p5 from 'p5/lib/p5.min.js';
import {overlay} from './index.js'
import {
  discourses,
  getBase
} from './content.js';

export class discursiveOverlay {
  constructor(p5) {
    this.p5 = p5
    this.currentDiscourse
  }

  giveChoices(){
    let architecturalButton = this.p5.createButton('(database)_the_architectural.db').class('spatialChoice').id('archChoice')
    let anarchicButton = this.p5.createButton('(database)_the_anarchic.db').class('spatialChoice').id('anarchChoice')
    let verbundenButton = this.p5.createButton('(intertwine)_verbunden.dbs').class('spatialChoice').id('verbundChoice')
    architecturalButton.position(210,160)
    anarchicButton.position(210,180)
    verbundenButton.position(210,200)

    architecturalButton.mousePressed(this.loadArchitectural)
    anarchicButton.mousePressed(this.loadAnarchic)
    verbundenButton.mousePressed(this.loadVerbunden)
  }

  removeChoices(){

  }


  loadArchitectural(){
    getBase('/architectural',"arch").then(body => console.log(body))
    document.getElementById('rp-b').classList.remove('away')
    document.getElementById('gp-b').classList.remove('away')
    document.getElementById('archChoice').remove()
    document.getElementById('anarchChoice').remove()
    document.getElementById('verbundChoice').remove()
    document.getElementById('discourseLoad').classList.add('away')
    document.getElementById('switchLoad').classList.remove('away')
    console.log(discourses.db)
    overlay.clear()
  }

  loadAnarchic(){
    getBase('/anarchic',"an").then(body => console.log(body))
    document.getElementById('rp-b').classList.remove('away')
    document.getElementById('gp-b').classList.remove('away')
    document.getElementById('archChoice').remove()
    document.getElementById('anarchChoice').remove()
    document.getElementById('verbundChoice').remove()
    document.getElementById('discourseLoad').classList.add('away')
    document.getElementById('switchLoad').classList.remove('away')
    overlay.clear()
  }

  loadVerbunden(){
    getBase('/verbunden',"ver").then(body => console.log(body))
    document.getElementById('rp-b').classList.remove('away')
    document.getElementById('gp-b').classList.remove('away')
    document.getElementById('archChoice').remove()
    document.getElementById('anarchChoice').remove()
    document.getElementById('verbundChoice').remove()
    document.getElementById('discourseLoad').classList.add('away')
    document.getElementById('switchLoad').classList.remove('away')
    overlay.clear()
  }
}
