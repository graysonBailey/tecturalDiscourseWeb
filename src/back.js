import p5 from 'p5';

export default function() {
  new p5((d) => {
    d.setup = () => {
      d.createCanvas(d.windowWidth, d.windowHeight)
      d.refreshed()
    }

    d.refreshed = function() {
      d.background(0);
      for (let i = 0; i < d.windowHeight; i += 25) {
        d.stroke(255)
        d.strokeWeight(.1)
        d.line(100, i, d.windowWidth - 100, i)
      }
    }
    d.windowResized = function() {
      d.resizeCanvas(d.windowWidth, d.windowHeight);
      d.refreshed()
      console.log("resized!")
    }
  }, 'back')
}
