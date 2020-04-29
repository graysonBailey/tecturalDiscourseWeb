import p5 from 'p5';
export let discourses = [];
export let position = 0;


export class discourseUnit {
  constructor(p5,c, p, t, u) {
    this.p5 = p5
    this.c = c
    this.p = p
    this.t = t
    this.u = u
    this.bound = this.constructBound()
  }

  constructBound(){
    let lines = Math.round(this.c.length/70)
    let tbound = this.p5.createVector(this.p.x-5,this.p.y-5, (lines+1)*18)
    return tbound
  }

  display(){
    this.p5.fill(255)
    this.p5.noStroke()
    this.p5.textSize(16)
    this.p5.text(this.c,this.p.x,this.p.y+position,400,300)
    this.p5.noFill()
    this.p5.stroke(255)
    this.p5.strokeWeight(2)
    this.p5.rect(this.bound.x,this.bound.y+position,400,this.bound.z)
  }


  isInside(){
    return this.p.x> 0 && this.p.x < this.p5.width && this.p.y + position > -30 &&  this.p.y + position < this.p5.height
  }
}

export class discourseSet{
  constructor(p5){
    this.p5 = p5
    this.set = []
  }

  addUnit(c,p,t,u){
    this.set.push(new discourseUnit(this.p5,c,p,t,u));
  }

  vis(){
    for(let each in this.set){
      if(this.set[each].isInside()){

          this.set[each].display()
      }
    }
  }



}

export async function getBase(url) {
  try {
    const response = await fetch(url)
    const body = await response.json()
    loadDiscourseUnitsToArray(body)
    discourses.vis();
  } catch (error) {
    console.log(error)
    console.log("failure at database retrieval - client")
  }

}

function loadDiscourseUnitsToArray(units) {
  console.log("was it after here?")
  discourses = new discourseSet(content)
  for (let each in units) {
    let unit = units[each]
    discourses.addUnit(unit.c, unit.p, unit.t, unit.u)
  }
  console.log(discourses.set)
}


export const content = new p5((j) => {

    console.log(discourses[0])
    let tFont;

    j.preload = function() {
      tFont = j.loadFont("f7f26928c6b1edc770c616475459ecc8.otf");
    }

    j.setup = () => {
      j.createCanvas(j.displayWidth, j.displayHeight)
      j.textFont(tFont)
      //j.refresh()
      console.log("content BEGINS")
    }

    j.refresh = function() {
      j.clear();
      discourses.vis()
    }

    // j.displayDiscourse = function() {
    //   j.noStroke()
    //
    //   j.textSize(16)
    //   for (let each in dU) {
    //     let unit = dU[each]
    //     if (unit.t == 0) {
    //       j.fill(255)
    //     } else if (unit.t == 1) {
    //
    //       j.fill(255, 0, 0)
    //     }
    //     if (unit.p.x > 0 && unit.p.x < j.windowWidth && unit.p.y + position > -30 && unit.p.y + position < j.windowHeight) {
    //       j.text(unit.c, unit.p.x, unit.p.y + position, 400, 1000)
    //     }
    //   }
    // }

    j.keyPressed = function() {
      if (j.keyCode == j.ENTER) {
        console.log("entered")
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


      j.refresh()
    }
  }, 'content')
