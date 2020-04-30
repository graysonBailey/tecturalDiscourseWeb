import p5 from 'p5';

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
