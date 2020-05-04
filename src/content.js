import p5 from 'p5/lib/p5.min.js';
import {
  socket
} from './index.js'
import {
  content
} from './threeCanvases.js'
import {
  position
} from './index.js'
export let discourses = [];



export class discourseUnit {
  constructor(p5, c, p, t, u, r) {
    this.p5 = p5
    this.c = c
    this.p = p
    this.t = this.checkType()
    this.u = u
    this.bound = this.constructBound()
    this.wid = 400
    this.centroid = this.p5.createVector(this.p.x + (this.wid / 2), this.p.y + (this.bound.z / 2))
    this.ref = ""
    this.body = this.splitBody()
    this.new = true;
    this.isHighlighted = false
    this.relatesTo = r
  }

  checkType(){
    if(this.c.charAt(0) == 'r' && this.c.charAt(1) == '/'){
      return 1
    } else if(this.c.charAt(0) == 'q' && this.c.charAt(1) == '/' ){
      return 0
    } else{
      return -1
    }
  }

  splitBody() {
    let parts = this.c.split("//")
    if (parts[1] != null) {
      this.ref = parts[1]
    }
    return parts[0]
  }

  constructBound() {
    let lines = Math.round(this.c.length / 70)
    let tbound = this.p5.createVector(this.p.x - 5, this.p.y - 5, (lines + 1) * 18)
    return tbound
  }

  display() {
    let color
    let bcolor = this.p5.color(0)
    let d = 0;


    if (this.t == 0) {
      d = 2
    } else if (this.t == 1) {
      d = 3
    }
    if (this.new == true) {
      d = 1
    }

    switch (d) {
      case 1:
        color = this.p5.color('#FFCC00')
        bcolor = this.p5.color(0)
        this.new = false;
        break;
      case 2:
        color = this.p5.color(255)
        bcolor = this.p5.color(0)
        break;
      case 3:
        color = this.p5.color(0)
        bcolor = this.p5.color('#FF0033')
        break
      default:
        color = this.p5.color(120, 120, 120)
        bcolor = this.p5.color(0)
    }

    this.displayBound(color, bcolor, 2)
    this.p5.fill(color)
    this.p5.noStroke()
    this.p5.textSize(16)
    this.p5.text(this.body, this.p.x, this.p.y + position, this.wid, this.bound.z)
    this.p5.textSize(14)
    this.p5.text(this.ref, this.p.x, this.p.y + position + this.bound.z, this.wid, 300)
  }

  displayBound(color, bcolor, size) {
    this.p5.stroke(color)
    this.p5.fill(bcolor)
  this.p5.strokeWeight(size)
  this.p5.rect(this.bound.x, this.bound.y + position, this.wid, this.bound.z)
}

concernedHighlight() {
  if (this.isHighlighted == false) {
    this.p5.stroke('#00ffff')
    this.p5.strokeWeight(1)
    this.p5.noFill()
    let cHx = Array(15).fill().map(() => Math.round(Math.random() * this.wid) + this.bound.x - 50)
    let cHy = Array(15).fill().map(() => Math.round(Math.random() * this.bound.z) + this.bound.y + position - 50)
    this.p5.beginShape()
    for (let i = 0; i < cHx.length; i++) {
      this.p5.vertex(cHx[i], cHy[i])
    }
    this.p5.endShape()
  }
  this.isHighlighted = true

}

isInsideScreen() {
  return this.p.x > 0 && this.p.x < this.p5.width && this.p.y + position > -30 && this.p.y + position < this.p5.height
}

isOfConcern() {
  let concern = this.p5.mouseX > this.bound.x && this.p5.mouseY > this.bound.y + position && this.p5.mouseX < this.bound.x + this.wid && this.p5.mouseY < this.bound.y + position + this.bound.z
  if (!concern) {
    this.isHighlighted = false
  }
  return this.p5.mouseX > this.bound.x && this.p5.mouseY > this.bound.y + position && this.p5.mouseX < this.bound.x + this.wid && this.p5.mouseY < this.bound.y + position + this.bound.z
}
}

export class discourseSet {
  constructor(p5,name) {
    this.p5 = p5
    this.set = []
    this.pendingRelation = []
    this.db=name
  }

  name(str){
    this.db = str
  }


  addUnit(c, p, t, u, r) {
    this.set.push(new discourseUnit(this.p5, c, p, t, u, r))
  }

  groupRelations() {
    let theRelated = this.set.filter(item => item.relatesTo.length)
    for (let each in theRelated) {
      let ties = theRelated[each].relatesTo
      let connections = this.set.filter(item => {
        return ties.includes(item.u)
      })
      for (let those in connections) {
        this.p5.noFill()
        this.p5.stroke('#ffA908')
        if (document.getElementById('rp-b').classList.contains('current')) {
          this.p5.strokeWeight(3)
        } else {
          this.p5.strokeWeight(.8)
        }
        this.p5.line(theRelated[each].p.x + 200, theRelated[each].centroid.y + position, connections[those].p.x + 200, connections[those].centroid.y + position)
      }
    }

  }

  vis() {
    this.groupRelations()
    let insiders = this.set.filter(item => item.isInsideScreen())
    for (let each in insiders) {
      insiders[each].display()
    }

  }

  concern() {
    let theConcerned = this.set.filter(item => item.isOfConcern())
    for (let each in theConcerned) {
      theConcerned[each].concernedHighlight()


      if (!this.pendingRelation.length) {
        this.pendingRelation.push(theConcerned[each])
      } else {
        if (this.pendingRelation[0].u != theConcerned[each].u) {
          this.pendingRelation[0].relatesTo.push(theConcerned[each].u)
          let data = {
            u: this.pendingRelation[0].u,
            r: theConcerned[each].u,
            db:discourses.db
          }
          socket.emit('relation', data)
        }
        console.log(this.pendingRelation[0].relatesTo)
        this.vis()
        this.pendingRelation = []

      }

    }
  }
}

export async function getBase(url,name) {
  try {
    const response = await fetch(url)
    const body = await response.json()
    loadDiscourseUnitsToArray(body,name)
    discourses.vis()
  } catch (error) {
    console.log(error)
    console.log("failure at database retrieval - client")
  }

}

function loadDiscourseUnitsToArray(units,name) {
  discourses = new discourseSet(content,name)
  for (let each in units) {
    let unit = units[each]
    discourses.addUnit(unit.c, unit.p, unit.t, unit.u, unit.r)
  }
}
