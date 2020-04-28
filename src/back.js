import p5 from 'p5';

export default function() {
  new p5((d) => {
    d.setup = () => {
      d.createCanvas(d.windowWidth, d.windowHeight)
      d.refreshed()
    }

    d.refreshed = function() {
      d.background(0)
      for (let i = 150; i < d.windowWidth-100; i += 25) {

        // d.strokeWeight(.2)
        // d.stroke('#7fffd4')
        // d.line(100+10, i+2, d.windowWidth+10 - 100, i+2)
        d.stroke(205)
        d.strokeWeight(.5);
        d.line(i, 0, i+25, d.windowHeight)

        // d.line(0, i+5, d.windowWidth, i+5)
        // d.line(0, (i/2)+5, d.windowWidth, (i/2)+5)
      }
    }
    d.windowResized = function() {
      d.resizeCanvas(d.windowWidth, d.windowHeight)
      d.refreshed()
    }
  }, 'back')
}
